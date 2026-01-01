import { Note } from "@/types/notes"
import { Card } from "@/components/ui/card"
import { StickyNote } from "lucide-react"

interface Props {
  note: Note
  onClick: () => void
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
})

export function NoteCard({ note, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      className="
        cursor-pointer rounded-2xl p-5 transition
        border
      "
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <StickyNote className="h-5 w-5 " />
          <h3 className="font-semibold text-slate-800 line-clamp-1">
            {note.title}
          </h3>
        </div>

        <span className="text-xs text-slate-500">
          {dateFormatter.format(note.updatedAt)}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-600 line-clamp-3">
        {note.content.trim() || "Add more context to this note."}
      </p>
    </Card>
  )
}
