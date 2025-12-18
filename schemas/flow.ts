import { z } from "zod";

export const flowSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    tags: z
        .string()
        .transform((val) =>
            val.split(",").map(t => t.trim()).filter(Boolean)
        )
        .refine(
            (tags) => tags.length >= 1 && tags.length <= 3,
            { message: "Between 1 and 3 tags required" }
        ),
});

export type FlowFormValues = z.input<typeof flowSchema>;
export type FlowInsertValues = z.output<typeof flowSchema>;
