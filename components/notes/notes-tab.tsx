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
        <Tabs value={activeNote ? "edit" : "list"} onValueChange={() => { }} className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <TabsList className="bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-sm inline-flex">
                    <TabsTrigger
                        value="list"
                        onClick={() => onSelect("")}
                        className="rounded-xl px-6 py-2.5 text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-sky-600 data-[state=active]:shadow-md transition-all"
                    >
                        All Notes
                    </TabsTrigger>
                    {activeNote && (
                        <TabsTrigger
                            value="edit"
                            className="rounded-xl px-6 py-2.5 text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-sky-600 data-[state=active]:shadow-md transition-all"
                        >
                            Editor
                        </TabsTrigger>
                    )}
                </TabsList>

                <div className="flex items-center gap-4">
                    {isSaving && (
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sky-400 animate-pulse">
                            <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            Auto-saving
                        </div>
                    )}
                    {isLoading && <Loader2 className="h-5 w-5 animate-spin text-sky-400" />}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <TabsContent value="list" className="mt-0 outline-none h-full focus-visible:ring-0">
                    {notes.length === 0 && !isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                            <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                                <Loader2 className="h-8 w-8 text-slate-200" />
                            </div>
                            <p className="font-medium text-lg">No notes found for this flow.</p>
                            <p className="text-sm">Create your first note to begin your journey.</p>
                        </div>
                    ) : (
                        <NoteList notes={notes} onSelect={onSelect} />
                    )}
                </TabsContent>

                <TabsContent value="edit" className="mt-0 outline-none h-full focus-visible:ring-0">
                    <NotesEditorPanel
                        note={activeNote}
                        onUpdate={onUpdate}
                        isSaving={isSaving}
                    />
                </TabsContent>
            </div>
        </Tabs>
    )
}