"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { notes } from "@/db/schema";
import { noteSchema, type NoteFormValues } from "@/schemas/note";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const saveNoteAction = async (values: NoteFormValues) => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    const parsed = noteSchema.safeParse(values);
    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0]?.message || "Validation failed"
        };
    }

    const { id, flowId, title, content } = parsed.data;

    try {
        if (id) {
            // Update existing note
            const [updatedNote] = await db
                .update(notes)
                .set({
                    title,
                    content,
                    updatedAt: new Date(),
                })
                .where(eq(notes.id, id))
                .returning();

            if (!updatedNote) {
                return { success: false, message: "Note not found" };
            }
            return { success: true, data: updatedNote };
        } else {
            // Create new note
            const [newNote] = await db
                .insert(notes)
                .values({
                    flowId,
                    title,
                    content: content || "",
                })
                .returning();

            revalidatePath(`/notes`);
            return { success: true, data: newNote };
        }
    } catch (err) {
        console.error("Failed to save note:", err);
        return { success: false, message: "Failed to save note" };
    }
};

export const getNotesByFlowAction = async (flowId: string) => {
    const { userId } = await auth();
    if (!userId) {
        return [];
    }

    try {
        const flowNotes = await db.query.notes.findMany({
            where: eq(notes.flowId, flowId),
            orderBy: (notes, { desc }) => [desc(notes.updatedAt)],
        });
        return flowNotes;
    } catch (err) {
        console.error("Failed to fetch notes:", err);
        return [];
    }
};

export const deleteNoteAction = async (id: string) => {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        await db.delete(notes).where(eq(notes.id, id));
        revalidatePath("/notes");
        return { success: true };
    } catch (err) {
        console.error("Failed to delete note:", err);
        return { success: false, message: "Failed to delete note" };
    }
};
