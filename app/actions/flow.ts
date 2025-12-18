"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { flows } from "@/db/schema";
import { flowSchema, FlowFormValues } from "@/schemas/flow";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { Flow } from "@/types/flow";

export async function createFlowAction(values: FlowFormValues) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validatedFields = flowSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid fields");
    }

    const { title, description, tags } = validatedFields.data;

    // Transform comma string to array
    const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);

    await db.insert(flows).values({
        userId,
        title,
        description,
        tags: tagsArray,
    });

    revalidatePath("/flows");
}

export async function getFlowsAction() {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    const userFlows = await db.select().from(flows).where(eq(flows.userId, userId));
    return userFlows as Flow[];
}
