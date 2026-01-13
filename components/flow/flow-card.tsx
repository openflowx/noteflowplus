import { Badge } from "@/components/ui/badge";
import { Flow } from "@/types/flow";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

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
                "group relative cursor-pointer rounded-[1.8rem] p-6 transition-all duration-300 border-2 overflow-hidden shadow-lg shadow-sky-50",
                selected
                    ? "bg-white border-sky-500 shadow-sm shadow-sky-100 scale-[1.01]"
                    : "bg-white/60 backdrop-blur-md border-transparent hover:border-sky-200 hover:bg-white hover:shadow-lg hover:shadow-sky-100/50 "
            )}
        >
            {/* Active Indicator */}
            {selected && (
                <div className="absolute top-0 right-0 p-3">
                    <div className="bg-sky-500 rounded-full p-1 shadow-lg shadow-sky-200">
                        <Zap className="h-3 w-3 text-white fill-white" />
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4">
                <div className="space-y-1">
                    <h3 className={cn(
                        "text-xl font-bold tracking-tight transition-colors",
                        selected ? "text-sky-600" : "text-slate-900 group-hover:text-sky-600"
                    )}>
                        {flow.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <span>Created</span>
                        <div className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>{flow.createdAt?.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                </div>

                {flow.description && (
                    <p className={cn(
                        "text-sm leading-relaxed line-clamp-2",
                        selected ? "text-slate-600" : "text-slate-500"
                    )}>
                        {flow.description}
                    </p>
                )}

                {flow.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {flow.tags.map(tag => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className={cn(
                                    "px-3 py-0.5 rounded-full text-[10px] font-bold uppercase border-none",
                                    selected ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-600"
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
