import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { NoteList } from "./note-list"
import { NotesEditorPanel } from "./note-editor-panel"
import { Note } from "@/types/notes"
import { Loader2 } from "lucide-react"

interface NotesTabProps {
    notes: Note[]
    activeNote: Note | null
    onSelect: (id: string) => void
    onUpdate: (updates: Partial<Note>) => void
    isSaving: boolean
    isLoading: boolean
}

export function NotesTabs({ notes, activeNote, onSelect, onUpdate, isSaving, isLoading }: Readonly<NotesTabProps>) {
    return (
        <Tabs value={activeNote ? "edit" : "list"} onValueChange={() => { }} className="flex h-full flex-col">
            <div className="mb-6 flex flex-col items-center justify-between gap-4 md:mb-8 md:flex-row md:gap-0">
                <TabsList className="inline-flex rounded-2xl border border-slate-100 bg-slate-50 p-1.5 shadow-sm">
                    <TabsTrigger
                        value="list"
                        onClick={() => onSelect("")}
                        className="rounded-xl px-4 py-2 text-xs font-bold transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md md:px-6 md:py-2.5 md:text-sm"
                    >
                        All Notes
                    </TabsTrigger>
                    {activeNote && (
                        <TabsTrigger
                            value="edit"
                            className="rounded-xl px-4 py-2 text-xs font-bold transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md md:px-6 md:py-2.5 md:text-sm"
                        >
                            Editor
                        </TabsTrigger>
                    )}
                </TabsList>

                <div className="flex items-center gap-4">
                    {isSaving && (
                        <div className="flex animate-pulse items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/70">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                            Auto-saving
                        </div>
                    )}
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary/70 md:h-5 md:w-5" />}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <TabsContent value="list" className="mt-0 h-full outline-none focus-visible:ring-0">
                    {notes.length === 0 && !isLoading ? (
                        <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-100 bg-slate-50/50 py-16 text-slate-400 md:rounded-[2.5rem] md:py-24">
                            <div className="mb-4 rounded-2xl bg-white p-3 shadow-sm md:p-4">
                                <Loader2 className="h-6 w-6 text-slate-200 md:h-8 md:w-8" />
                            </div>
                            <p className="px-4 text-center text-base font-medium md:text-lg">No notes found for this flow.</p>
                            <p className="px-4 text-center text-xs md:text-sm">Create your first note to begin your journey.</p>
                        </div>
                    ) : (
                        <NoteList notes={notes} onSelect={onSelect} />
                    )}
                </TabsContent>

                <TabsContent value="edit" className="mt-0 h-full outline-none focus-visible:ring-0">
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