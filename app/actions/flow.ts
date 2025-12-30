"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { flows, tags, flowTags } from "@/db/schema";
import { flowSchema, type FlowInsertValues } from "@/schemas/flow";
import { revalidatePath } from "next/cache";
import { Flow } from "@/types/flow";
import { eq } from "drizzle-orm";

export const createFlowAction = async (values: FlowInsertValues) => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    const parsed = flowSchema.safeParse(values);
    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0]?.message || "Validation failed"
        };
    }

    const { title, description, tags: tagNames } = parsed.data;

    await db.transaction(async (tx) => {
        // Insert flow
        const [flow] = await tx
            .insert(flows)
            .values({
                userId,
                title,
                description,
            })
            .returning({ id: flows.id });

        // Insert tags if not exists
        const insertedTags = await Promise.all(
            tagNames.map(async (name) => {
                const [existing] = await tx
                    .select()
                    .from(tags)
                    .where(eq(tags.name, name));

                if (existing) return existing;

                const [created] = await tx
                    .insert(tags)
                    .values({ name })
                    .returning();

                return created;
            })
        );

        // Insert into flow_tags
        await tx.insert(flowTags).values(
            insertedTags.map((tag) => ({
                flowId: flow.id,
                tagId: tag.id,
            }))
        );
    });

    revalidatePath("/flows");

    return { success: true };
};


export const getFlowsAction = async (): Promise<Flow[]> => {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    const userFlows = await db.query.flows.findMany({
        where: eq(flows.userId, userId),
        with: {
            flowTags: {
                with: {
                    tag: true,
                },
            },
        },
    });

    // Transform to match Flow type
    return userFlows.map(flow => ({
        ...flow,
        tags: flow.flowTags.map(ft => ft.tag.name),
    })) as Flow[];
};

