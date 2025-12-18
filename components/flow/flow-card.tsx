import { Badge } from "@/components/ui/badge";
import { Flow } from "@/types/flow";
import { cn } from "@/lib/utils";

interface FlowCardProps {
    flow: Flow;
    selected?: boolean;
    onClick?: () => void;
}

export function FlowCard({ flow, selected = false, onClick }: FlowCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "cursor-pointer rounded-3xl p-5 transition-all duration-200",
                "shadow-sm hover:shadow-md",
                selected
                    ? "bg-sky-500 text-white shadow-lg"
                    : "bg-white text-gray-900"
            )}
        >
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold tracking-tight">
                        {flow.title}
                    </h3>

                    <span
                        className={cn(
                            "text-xs font-medium uppercase tracking-wider",
                            selected ? "text-white/80" : "text-gray-400"
                        )}
                    >
                        {flow.createdAt.toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>

                {flow.description && (
                    <p
                        className={cn(
                            "text-sm line-clamp-2",
                            selected ? "text-white/90" : "text-gray-600"
                        )}
                    >
                        {flow.description}
                    </p>
                )}

                {flow.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {flow.tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className={cn(
                                    "border-transparent font-normal",
                                    selected
                                        ? "bg-white/20 text-white"
                                        : "bg-gray-100 text-gray-700"
                                )}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
