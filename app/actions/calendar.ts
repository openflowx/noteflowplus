"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { events, flows } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, inArray, and } from "drizzle-orm";
import { eventSchema } from "@/schemas/event";
import type {
    DbEvent,
    CalendarEvent,
    EventActionData,
    EventActionResponse
} from "@/types/calendar";



// Map UI/Form values to database structure
const mapToDbEvent = (values: EventActionData): Omit<DbEvent, "id" | "createdAt" | "updatedAt"> => {

    const isAllDay = values.isAllDay ?? values.allDay ?? false;
    const color = values.color ?? values.backgroundColor ?? null;

    return {
        flowId: values.flowId,
        title: values.title,
        startDatetime: values.start instanceof Date ? values.start : new Date(values.start),
        endDatetime: values.end instanceof Date ? values.end : new Date(values.end),
        description: values.description ?? null,
        color: color,
        status: values.status ?? "todo",
        isAllDay: isAllDay ? 1 : 0,
    };
};


// Map database event to FullCalendar-compatible UI structure
const mapToUiEvent = (event: DbEvent): CalendarEvent => ({
    id: event.id,
    title: event.title,
    start: event.startDatetime,
    end: event.endDatetime,
    allDay: event.isAllDay === 1, // Convert integer to boolean for UI
    backgroundColor: event.color ?? undefined,
    extendedProps: {
        description: event.description ?? undefined,
        flowId: event.flowId,
        status: event.status,
    },
});

// Verify that a flow belongs to the authenticated user
const verifyFlowOwnership = async (flowId: string, userId: string): Promise<boolean> => {
    const flow = await db.query.flows.findFirst({
        where: and(eq(flows.id, flowId), eq(flows.userId, userId)),
    });
    return !!flow;
};

// Verify that an event belongs to a flow owned by the authenticated user
const verifyEventOwnership = async (eventId: string, userId: string): Promise<boolean> => {
    const existingEvent = await db
        .select({ id: events.id })
        .from(events)
        .innerJoin(flows, eq(events.flowId, flows.id))
        .where(and(eq(events.id, eventId), eq(flows.userId, userId)))
        .limit(1);

    return existingEvent.length > 0;
};

// Create a new calendar event
export const createEventAction = async (
    values: EventActionData
): Promise<EventActionResponse> => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    // Validate input data
    const validationResult = eventSchema.safeParse({
        flowId: values.flowId,
        title: values.title,
        startDatetime: values.start,
        endDatetime: values.end,
        description: values.description,
        color: values.color ?? values.backgroundColor,
        status: values.status,
        isAllDay: values.isAllDay ?? values.allDay,
    });

    if (!validationResult.success) {
        return {
            success: false,
            message: validationResult.error.issues[0]?.message ?? "Validation failed",
        };
    }

    const data = mapToDbEvent(values);

    // Verify user has access to the flow
    const hasAccess = await verifyFlowOwnership(data.flowId, userId);
    if (!hasAccess) {
        return { success: false, message: "Unauthorized: Flow access denied" };
    }

    try {
        const [inserted] = await db
            .insert(events)
            .values({ ...data, updatedAt: new Date() })
            .returning();

        if (!inserted) {
            return { success: false, message: "Failed to create event" };
        }

        revalidatePath("/calendar");
        return {
            success: true,
            event: mapToUiEvent(inserted as DbEvent),
        };
    } catch (err) {
        console.error("Failed to create event:", err);
        return { success: false, message: "Failed to create event" };
    }
};

// Update an existing calendar event
export const updateEventAction = async (
    id: string,
    values: EventActionData
): Promise<EventActionResponse> => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    // Verify user owns this event
    const hasAccess = await verifyEventOwnership(id, userId);
    if (!hasAccess) {
        return { success: false, message: "Unauthorized or event not found" };
    }

    const data = mapToDbEvent(values);

    try {
        const [updated] = await db
            .update(events)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(events.id, id))
            .returning();

        if (!updated) {
            return { success: false, message: "Failed to update event" };
        }

        revalidatePath("/calendar");
        return {
            success: true,
            event: mapToUiEvent(updated as DbEvent),
        };
    } catch (err) {
        console.error("Failed to update event:", err);
        return { success: false, message: "Failed to update event" };
    }
};

// Delete a calendar event
export const deleteEventAction = async (id: string): Promise<EventActionResponse> => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    // Verify user owns this event
    const hasAccess = await verifyEventOwnership(id, userId);
    if (!hasAccess) {
        return { success: false, message: "Unauthorized or event not found" };
    }

    try {
        await db.delete(events).where(eq(events.id, id));
        revalidatePath("/calendar");
        return { success: true };
    } catch (err) {
        console.error("Failed to delete event:", err);
        return { success: false, message: "Failed to delete event" };
    }
};

// Get all calendar events for the authenticated user
export const getEventsAction = async (): Promise<CalendarEvent[]> => {
    const { userId } = await auth();
    if (!userId) return [];

    try {
        // Get all flows belonging to the user
        const userFlows = await db.query.flows.findMany({
            where: eq(flows.userId, userId),
            columns: { id: true },
        });

        const flowIds = userFlows.map(f => f.id);
        if (!flowIds.length) return [];

        // Get all events for user's flows
        const allEvents = await db.query.events.findMany({
            where: inArray(events.flowId, flowIds),
            orderBy: (events, { asc }) => [asc(events.startDatetime)],
        });

        return allEvents.map(event => mapToUiEvent(event as DbEvent));
    } catch (err) {
        console.error("Failed to fetch events:", err);
        return [];
    }
};
