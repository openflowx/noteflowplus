import { useState } from "react"
import { Note } from "../types/notes"


const MOCK_NOTES: Note[] = [
    {
        id: "1",
        title: "Project Ideas",
        content: "Note creation",
        tags: ["Ideas", "Work"],
        updatedAt: new Date(),
    },
]


export function useNotes() {
    const [notes, setNotes] = useState<Note[]>(MOCK_NOTES)
    const [activeNote, setActiveNote] = useState<Note | null>(null)


    const createNew = () => setActiveNote(null)


    const selectNote = (id: string) => {
        const note = notes.find(n => n.id === id)
        if (note) setActiveNote(note)
    }


    return {
        notes,
        activeNote,
        createNew,
        selectNote,
    }
}