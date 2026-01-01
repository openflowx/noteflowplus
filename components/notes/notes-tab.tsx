import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { NoteList } from "./note-list"
import { NotesEditorPanel } from "./note-editor-panel"
import { Note } from "@/types/notes"


interface Props {
    notes: Note[]
    activeNote: Note | null
    onSelect: (id: string) => void
    onCreate: () => void
}


export function NotesTabs({ notes, activeNote, onSelect, onCreate }: Props) {
    return (
        <Tabs defaultValue="list" className="flex-1">
            <TabsList>
                <TabsTrigger value="list">My Notes</TabsTrigger>
                <TabsTrigger value="edit" onClick={onCreate}>
                    {activeNote ? "Edit" : "Create"}
                </TabsTrigger>
            </TabsList>


            <TabsContent value="list" className="mt-8">
                <NoteList notes={notes} onSelect={onSelect} />
            </TabsContent>


            <TabsContent value="edit" className="mt-8">
                <NotesEditorPanel note={activeNote} />
            </TabsContent>
        </Tabs>
    )
}