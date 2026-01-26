import { Note } from "@/types/notes"
import { NoteCard } from "./note-card"


interface NoteListProps {
    notes: Note[]
    onSelect: (id: string) => void
}


export function NoteList({ notes, onSelect }: Readonly<NoteListProps>) {
    return (
        <div className="space-y-3">
            {notes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onClick={() => onSelect(note.id)}
                />
            ))}
        </div>
    )
}