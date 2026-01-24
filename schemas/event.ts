import { z } from "zod";

export const eventSchema = z.object({
    id: z.uuid().optional(),
    flowId: z.uuid({ message: "Flow is required" }),
    title: z.string().min(1, "Title is required"),
    startDatetime: z.date(),
    endDatetime: z.date(),
    description: z.string().optional(),
    content: z.string().optional(),
    color: z.string().optional(),
    status: z.enum(["todo", "in-progress", "completed"]).default("todo"),
    isAllDay: z.boolean().default(false),
});

export type EventInsertValues = z.infer<typeof eventSchema>;
