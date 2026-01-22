"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { events, flows } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";

/**
 * Maps incoming UI event data to database structure
 */
const mapToDbEvent = (values: any) => {
    // Determine which field contains 'all day' status (UI uses isAllDay, FC uses allDay)
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

export const createEventAction = async (values: any) => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const data = mapToDbEvent(values);

        if (!data.flowId) {
            return { success: false, message: "Flow ID is required" };
        }

        await db.insert(events).values(data);
    } catch (err) {
        console.error("Failed to create event:", err);
        return { success: false, message: "Failed to create event" };
    }

    revalidatePath("/calendar");
    return { success: true };
};

export const updateEventAction = async (id: string, values: any) => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        // Prepare data for update - only include valid columns
        const data = mapToDbEvent(values);

        await db.update(events)
            .set(data)
            .where(eq(events.id, id));
    } catch (err) {
        console.error("Failed to update event:", err);
        return { success: false, message: "Failed to update event" };
    }

    revalidatePath("/calendar");
    return { success: true };
};

export const deleteEventAction = async (id: string) => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        await db.delete(events).where(eq(events.id, id));
    } catch (err) {
        console.error("Failed to delete event:", err);
        return { success: false, message: "Failed to delete event" };
    }

    revalidatePath("/calendar");
    return { success: true };
};

export const getEventsAction = async () => {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    try {
        const userFlows = await db.query.flows.findMany({
            where: eq(flows.userId, userId),
            columns: { id: true }
        });

        const flowIds = userFlows.map(f => f.id);

        if (flowIds.length === 0) return [];

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
            }
        }));
    } catch (err) {
        console.error("Failed to fetch events:", err);
        return [];
    }
};
