"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { userSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUserPreferences() {
    const { userId } = await auth();
    if (!userId) return null;

    try {
        const settings = await db.query.userSettings.findFirst({
            where: eq(userSettings.userId, userId),
        });
        return settings || null;
    } catch (error) {
        console.error("Failed to fetch user preferences:", error);
        return null;
    }
}

export async function updateSelectedFlow(flowId: string | null) {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "Unauthorized" };

    try {
        await db
            .insert(userSettings)
            .values({
                userId,
                lastSelectedFlowId: flowId,
                updatedAt: new Date(),
            })
            .onConflictDoUpdate({
                target: userSettings.userId,
                set: {
                    lastSelectedFlowId: flowId,
                    updatedAt: new Date(),
                },
            });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update user preferences:", error);
        return { success: false, message: "Failed to update preferences" };
    }
}
