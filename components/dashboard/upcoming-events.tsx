import { Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

export function UpcomingEvents() {
    return (
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {["Calculus Exam", "Study Group", "Project Due", "Physics Quiz"].map(
                    (title, i) => (
                        <Card
                            key={i}
                            className="flex items-center gap-4 border-none p-4"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{title}</p>
                                <p className="text-xs text-gray-500">Soon™</p>
                            </div>
                        </Card>
                    )
                )}
            </div>
        </section>
    )
}
