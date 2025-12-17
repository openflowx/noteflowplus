import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function RecentFlows() {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Flows</h2>
                <Button variant="link" className="text-sm">View all</Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card
                        key={i}
                        className="cursor-pointer border-none transition hover:shadow-md"
                    >
                        <div className="aspect-4/3 rounded-xl bg-gray-200 p-4 flex items-end">
                            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">
                                Biology
                            </span>
                        </div>
                        <div className="p-3">
                            <h3 className="text-sm font-semibold">Flow {i}</h3>
                            <p className="mt-1 text-xs text-gray-500">10 notes • 2h ago</p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}
