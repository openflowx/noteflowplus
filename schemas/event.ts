import { z } from "zod";

export const eventSchema = z.object({
    id: z.uuid().optional(),
    flowId: z.uuid({ message: "Flow is required" }),
    title: z.string().min(1, { message: "Title is required" }).max(200, { message: "Title is too long" }),
    startDatetime: z.union([
        z.date(),
        z.string().refine((val) => !Number.isNaN(Date.parse(val)), { message: "Invalid date format" })
    ]).transform((val) => typeof val === "string" ? new Date(val) : val),
    endDatetime: z.union([
        z.date(),
        z.string().refine((val) => !Number.isNaN(Date.parse(val)), { message: "Invalid date format" })
    ]).transform((val) => typeof val === "string" ? new Date(val) : val),
    description: z.string().max(1000).optional(),
    status: z.enum(["todo", "in-progress", "completed"]).default("todo"),
    isAllDay: z.boolean().default(false),
}).refine(
    (data) => data.endDatetime > data.startDatetime,
    {
        message: "End time must be after start time",
        path: ["endDatetime"],
    }
);

export type EventInsertValues = z.infer<typeof eventSchema>;
