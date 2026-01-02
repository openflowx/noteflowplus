import { Input } from "@/components/ui/input"
import NoteEditor from "@/components/notes/note-editor"
import { Note } from "@/types/notes"
import { Loader2 } from "lucide-react"

interface Props {
    note: Note | null
    isSaving?: boolean
    onUpdate: (updates: Partial<Note>) => void
}

export function NotesEditorPanel({ note, isSaving, onUpdate }: Props) {
    if (!note) return (
        <div className="flex items-center justify-center h-100 border-2 border-dashed rounded-xl text-muted-foreground">
            Select a note or create a new one
        </div>
    )

    return (
        <div className="space-y-4 relative">
            {isSaving && (
                <div className="absolute top-2 right-2 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-md z-10">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Saving...
                </div>
            )}

            <Input
                placeholder="Note title"
                value={note.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className="text-lg font-semibold border-none px-0 focus-visible:ring-0"
            />

            <NoteEditor
                key={note.id}
                content={note.content ?? ""}
                onChange={(content) => onUpdate({ content })}
            />
        </div>
    )
}