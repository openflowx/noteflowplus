import { Note } from "@/types/notes"
import { Card } from "@/components/ui/card"


interface Props {
    note: Note
    onClick: () => void
}


export function NoteCard({ note, onClick }: Props) {
    return (
        <Card
            onClick={onClick}
            className="cursor-pointer w-full hover:bg-muted transition p-4"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold">{note.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                        {note.content}
                    </p>
                </div>
                <span className="text-xs text-muted-foreground">
                    {note.updatedAt.toLocaleDateString()}
                </span>
            </div>
        </Card>
    )
}