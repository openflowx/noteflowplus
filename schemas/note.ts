import { z } from "zod";

export const noteSchema = z.object({
    id: z.uuid().optional(),
    flowId: z.uuid("Flow ID is required"),
    title: z.string().min(1, "Title is required").default("Untitled Note"),
    content: z.string().optional(),
});

export type NoteFormValues = z.infer<typeof noteSchema>;
