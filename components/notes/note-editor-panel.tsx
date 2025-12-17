import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import NoteEditor from "@/components/notes/note-editor"
import { Note } from "@/types/notes"


interface Props {
    note: Note | null
}


export function NotesEditorPanel({ note }: Props) {
    return (
        <div className="space-y-4">
            <Input
                placeholder="Note title"
                defaultValue={note?.title}
                className="text-lg font-semibold"
            />


            <NoteEditor content={note?.content ?? ""} />


            <div className="flex justify-end">
                <Button>Save</Button>
            </div>
        </div>
    )
}