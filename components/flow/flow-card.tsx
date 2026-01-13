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
                "group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-5 transition-all duration-300 shadow-lg shadow-sky-50 md:rounded-[1.8rem] md:p-6",
                selected
                    ? "scale-[1.01] border-sky-500 bg-white shadow-sm shadow-sky-100"
                    : "border-transparent bg-white/60 backdrop-blur-md hover:border-sky-200 hover:bg-white hover:shadow-lg hover:shadow-sky-100/50 md:hover:scale-[1.01]"
            )}
        >
            {/* Active Indicator */}
            {selected && (
                <div className="absolute right-0 top-0 p-3">
                    <div className="rounded-full bg-sky-500 p-1 shadow-lg shadow-sky-200">
                        <Zap className="h-3 w-3 fill-white text-white" />
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3 md:gap-4">
                <div className="space-y-1">
                    <h3 className={cn(
                        "text-lg font-bold tracking-tight transition-colors md:text-xl",
                        selected ? "text-sky-600" : "text-slate-900 md:group-hover:text-sky-600"
                    )}>
                        {flow.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400 md:text-[10px]">
                        <span>Created</span>
                        <div className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>{flow.createdAt?.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                </div>

                {flow.description && (
                    <p className={cn(
                        "line-clamp-2 text-xs leading-relaxed md:text-sm",
                        selected ? "text-slate-600" : "text-slate-500"
                    )}>
                        {flow.description}
                    </p>
                )}

                {flow.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {flow.tags.map(tag => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className={cn(
                                    "rounded-full border-none px-2.5 py-0.5 text-[9px] font-bold uppercase md:px-3 md:text-[10px]",
                                    selected ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600 md:group-hover:bg-sky-50 md:group-hover:text-sky-600"
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
