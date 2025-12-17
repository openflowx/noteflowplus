import { Note } from "@/types/notes"
import { NoteCard } from "./note-card"


interface Props {
    notes: Note[]
    onSelect: (id: string) => void
}


export function NoteList({ notes, onSelect }: Props) {
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