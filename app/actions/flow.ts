"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { flows } from "@/db/schema";
import { flowSchema, type FlowInsertValues } from "@/schemas/flow";
import { revalidatePath } from "next/cache";
import { Flow } from "@/types/flow";
import { eq } from "drizzle-orm";

export const createFlowAction = async (values: unknown) => {
    const { userId } = await auth();

    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    const parsed = flowSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed",
        };
    }

    const data: FlowInsertValues = parsed.data;

    await db.insert(flows).values({
        userId,
        ...data,
    });

    revalidatePath("/flows");

    return { success: true, message: "Flow created successfully" };
};

export const getFlowsAction = async (): Promise<Flow[]> => {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    const userFlows = await db
        .select()
        .from(flows)
        .where(eq(flows.userId, userId));

    return userFlows as Flow[];
}
