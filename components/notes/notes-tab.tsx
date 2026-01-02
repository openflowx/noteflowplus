import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { NoteList } from "./note-list"
import { NotesEditorPanel } from "./note-editor-panel"
import { Note } from "@/types/notes"
import { Loader2 } from "lucide-react"

interface Props {
    notes: Note[]
    activeNote: Note | null
    onSelect: (id: string) => void
    onUpdate: (updates: Partial<Note>) => void
    isSaving: boolean
    isLoading: boolean
}

export function NotesTabs({ notes, activeNote, onSelect, onUpdate, isSaving, isLoading }: Props) {
    return (
        <Tabs value={activeNote ? "edit" : "list"} onValueChange={() => { }} className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-slate-100 p-1">
                    <TabsTrigger value="list" onClick={() => onSelect("")}>All Notes</TabsTrigger>
                    {activeNote && (
                        <TabsTrigger value="edit">Editor</TabsTrigger>
                    )}
                </TabsList>

                {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            </div>

            <TabsContent value="list" className="mt-0 outline-none">
                {notes.length === 0 && !isLoading ? (
                    <div className="text-center py-12 text-muted-foreground bg-slate-50 rounded-2xl border border-dotted">
                        No notes found for this flow.
                    </div>
                ) : (
                    <NoteList notes={notes} onSelect={onSelect} />
                )}
            </TabsContent>

            <TabsContent value="edit" className="mt-0 outline-none">
                <NotesEditorPanel
                    note={activeNote}
                    onUpdate={onUpdate}
                    isSaving={isSaving}
                />
            </TabsContent>
        </Tabs>
    )
}