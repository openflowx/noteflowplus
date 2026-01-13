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
      className="cursor-pointer overflow-hidden rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-sky-200 hover:shadow-md md:rounded-2xl md:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
          <StickyNote className="h-4 w-4 shrink-0 text-sky-400 md:h-5 md:w-5" />
          <h3 className="truncate text-sm font-bold text-slate-800 md:text-base">
            {note.title}
          </h3>
        </div>

        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:text-xs">
          {dateFormatter.format(note.updatedAt)}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-500 md:text-sm">
        {note.content?.trim() || "Add more context to this note."}
      </p>
    </Card>
  )
}
