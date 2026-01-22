"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { events, flows } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";

export const createEventAction = async (values: any) => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const data = {
            ...values,
            startDatetime: values.start ? new Date(values.start) : null,
            endDatetime: values.end ? new Date(values.end) : null,
            isAllDay: values.allDay ? 1 : 0,
            status: values.status || "todo",
        };

        // If extendedProps were passed, flatten them
        if (values.extendedProps) {
            Object.assign(data, values.extendedProps);
            delete data.extendedProps;
        }

        // Clean up UI-specific fields
        delete data.start;
        delete data.end;
        delete data.allDay;
        delete data.id; // Ensure we don't try to insert 'new' or existing ID

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
        const updateData: any = { ...values, updatedAt: new Date() };

        if (values.start) {
            updateData.startDatetime = new Date(values.start);
            delete updateData.start;
        }
        if (values.end) {
            updateData.endDatetime = new Date(values.end);
            delete updateData.end;
        }
        if (values.allDay !== undefined) {
            updateData.isAllDay = values.allDay ? 1 : 0;
            delete updateData.allDay;
        }

        // Flatten extendedProps if present
        if (values.extendedProps) {
            Object.assign(updateData, values.extendedProps);
            delete updateData.extendedProps;
        }

        // Ensure we don't update ID
        delete updateData.id;

        await db.update(events)
            .set(updateData)
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
