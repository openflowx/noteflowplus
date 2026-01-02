import { useState, useEffect, useCallback, useRef } from "react"
import { Note } from "../types/notes"
import { getNotesByFlowAction, saveNoteAction, deleteNoteAction } from "@/app/actions/note"
import { toast } from "sonner"

export function useNotes(flowId: string | null) {
    const [notes, setNotes] = useState<Note[]>([])
    const [activeNote, setActiveNote] = useState<Note | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

    const fetchNotes = useCallback(async () => {
        if (!flowId) {
            setNotes([])
            return
        }
        setIsLoading(true)
        const data = await getNotesByFlowAction(flowId)
        setNotes(data as Note[])
        setIsLoading(false)
    }, [flowId])

    useEffect(() => {
        fetchNotes()
    }, [fetchNotes])

    const createNote = async () => {
        if (!flowId) return

        const newNoteData = {
            flowId,
            title: "Untitled Note",
            content: "",
        }

        const result = await saveNoteAction(newNoteData)
        if (result.success && result.data) {
            const newNote = result.data as Note
            setNotes(prev => [newNote, ...prev])
            setActiveNote(newNote)
            toast.success("Note created")
        } else {
            toast.error(result.message || "Failed to create note")
        }
    }

    const deleteNote = async (id: string) => {
        const result = await deleteNoteAction(id)
        if (result.success) {
            setNotes(prev => prev.filter(n => n.id !== id))
            if (activeNote?.id === id) setActiveNote(null)
            toast.success("Note deleted")
        } else {
            toast.error(result.message || "Failed to delete note")
        }
    }

    const updateActiveNoteLocally = (updates: Partial<Note>) => {
        if (!activeNote) return

        const updatedNote = { ...activeNote, ...updates }
        setActiveNote(updatedNote)

        // Update in list too
        setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n))

        // Trigger Auto-save
        if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current)

        autoSaveTimerRef.current = setTimeout(async () => {
            setIsSaving(true)
            const result = await saveNoteAction({
                id: updatedNote.id,
                flowId: updatedNote.flowId,
                title: updatedNote.title,
                content: updatedNote.content || "",
            })
            if (!result.success) {
                toast.error("Failed to auto-save note")
            }
            setIsSaving(false)
        }, 1500) // 1.5s debounce
    }

    const selectNote = (id: string) => {
        const note = notes.find(n => n.id === id)
        setActiveNote(note || null)
    }

    return {
        notes,
        activeNote,
        isLoading,
        isSaving,
        createNote,
        deleteNote,
        selectNote,
        updateActiveNoteLocally,
        setActiveNote,
    }
}