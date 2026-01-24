"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { events, flows } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, inArray, and } from "drizzle-orm";


// Helper: Map UI values to DB structure
const mapToDbEvent = (values: any) => {
    const isAllDay = values.isAllDay ?? values.allDay ?? false;

    return {
        flowId: values.flowId,
        title: values.title,
        startDatetime: values.start ? new Date(values.start) : new Date(),
        endDatetime: values.end ? new Date(values.end) : new Date(),
        description: values.description ?? null,
        content: values.content ?? null,
        color: values.color ?? values.backgroundColor ?? null,
        status: values.status ?? "todo",
        isAllDay: isAllDay ? 1 : 0,
        updatedAt: new Date(),
    };
};


// Helper: Check if a flow belongs to the user
const verifyFlowOwnership = async (flowId: string, userId: string) => {
    const flow = await db.query.flows.findFirst({
        where: and(eq(flows.id, flowId), eq(flows.userId, userId)),
    });
    return !!flow;
};

// Helper: Check if an event belongs to a flow owned by the user
const verifyEventOwnership = async (eventId: string, userId: string) => {
    const existingEvent = await db
        .select({ id: events.id })
        .from(events)
        .innerJoin(flows, eq(events.flowId, flows.id))
        .where(and(eq(events.id, eventId), eq(flows.userId, userId)))
        .limit(1);

    return existingEvent.length > 0;
};

// Create Event
export const createEventAction = async (values: any) => {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "Unauthorized" };

    const data = mapToDbEvent(values);

    if (!data.flowId) return { success: false, message: "Flow ID is required" };

    const hasAccess = await verifyFlowOwnership(data.flowId, userId);
    if (!hasAccess) return { success: false, message: "Unauthorized: Flow access denied" };

    try {
        await db.insert(events).values(data);
        revalidatePath("/calendar");
        return { success: true };
    } catch (err) {
        console.error("Failed to create event:", err);
        return { success: false, message: "Failed to create event" };
    }
};

// Update Event
export const updateEventAction = async (id: string, values: any) => {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "Unauthorized" };

    const hasAccess = await verifyEventOwnership(id, userId);
    if (!hasAccess) return { success: false, message: "Unauthorized or event not found" };

    const data = mapToDbEvent(values);

    try {
        await db.update(events).set(data).where(eq(events.id, id));
        revalidatePath("/calendar");
        return { success: true };
    } catch (err) {
        console.error("Failed to update event:", err);
        return { success: false, message: "Failed to update event" };
    }
};

// Delete Event
export const deleteEventAction = async (id: string) => {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "Unauthorized" };

    const hasAccess = await verifyEventOwnership(id, userId);
    if (!hasAccess) return { success: false, message: "Unauthorized or event not found" };

    try {
        await db.delete(events).where(eq(events.id, id));
        revalidatePath("/calendar");
        return { success: true };
    } catch (err) {
        console.error("Failed to delete event:", err);
        return { success: false, message: "Failed to delete event" };
    }
};

// Get Events
export const getEventsAction = async () => {
    const { userId } = await auth();
    if (!userId) return [];

    try {
        const userFlows = await db.query.flows.findMany({
            where: eq(flows.userId, userId),
            columns: { id: true },
        });

        const flowIds = userFlows.map(f => f.id);
        if (!flowIds.length) return [];

        const allEvents = await db.query.events.findMany({
            where: inArray(events.flowId, flowIds),
            orderBy: (events, { asc }) => [asc(events.startDatetime)],
        });

        return allEvents.map(event => ({
            id: event.id,
            title: event.title,
            start: event.startDatetime,
            end: event.endDatetime,
            allDay: event.isAllDay === 1,
            backgroundColor: event.color,
            extendedProps: {
                description: event.description,
                content: event.content,
                flowId: event.flowId,
                status: event.status,
            },
        }));
    } catch (err) {
        console.error("Failed to fetch events:", err);
        return [];
    }
};
