import { Input } from "@/components/ui/input"
import NoteEditor from "@/components/notes/note-editor"
import { Note } from "@/types/notes"
import { Loader2 } from "lucide-react"

interface NoteEditorPanelProps {
    note: Note | null
    isSaving?: boolean
    onUpdate: (updates: Partial<Note>) => void
}

export function NotesEditorPanel({ note, isSaving, onUpdate }: Readonly<NoteEditorPanelProps>) {
    
    if (!note) return (
        <div className="flex items-center justify-center h-100 border-2 border-dashed rounded-xl text-muted-foreground">
            Select a note or create a new one
        </div>
    )

    return (
        <div className="relative space-y-4">
            {isSaving && (
                <div className="absolute right-0 top-0 z-10 flex items-center gap-2 rounded-lg bg-white/80 px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary/70 backdrop-blur-sm">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Saving...
                </div>
            )}

            <Input
                placeholder="Note Title"
                value={note.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className="h-auto border-none px-0 text-xl font-bold tracking-tight text-slate-900 focus-visible:ring-0 md:text-2xl"
            />

            <div className="prose prose-slate max-w-none">
                <NoteEditor
                    key={note.id}
                    content={note.content ?? ""}
                    onChange={(content) => onUpdate({ content })}
                />
            </div>
        </div>
    )
}