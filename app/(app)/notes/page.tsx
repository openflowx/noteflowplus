"use client"

import { NotesTabs } from "@/components/notes/notes-tab"
import { useNotes } from "@/hooks/use-notes"




export default function NotesPage() {
    const { notes, activeNote, selectNote, createNew } = useNotes()


    return (
        <div className="container h-full space-y-8">
            <header>
                <h1 className="text-2xl font-bold">Notes</h1>
                <p className="text-muted-foreground">Capture your thoughts.</p>
            </header>
            <NotesTabs
                notes={notes}
                activeNote={activeNote}
                onSelect={selectNote}
                onCreate={createNew}
            />
        </div>
    )
}