import { z } from "zod";

export const flowSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    tags: z
        .string()
        .min(1, "At least one tag is required")
        .refine(
            (val) => {
                const tags = val.split(",").map((t) => t.trim()).filter(Boolean);
                return tags.length > 0 && tags.length <= 3;
            },
            { message: "Between 1 and 3 tags required, separated by commas" }
        ),
});

export type FlowFormValues = z.infer<typeof flowSchema>;
