import { Badge } from "@/components/ui/badge";
import { Flow } from "@/types/flow";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface FlowCardProps {
    flow: Flow;
    selected?: boolean;
    onClick?: () => void;
}

export function FlowCard({ flow, selected = false, onClick }: Readonly<FlowCardProps>) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-5 transition-all duration-300 shadow-lg shadow-primary/5 md:rounded-[1.8rem] md:p-6 text-start",
                selected
                    ? "scale-[1.01] border-primary bg-white shadow-sm shadow-primary/10"
                    : "border-transparent bg-white/60 backdrop-blur-md hover:border-primary/20 hover:bg-white hover:shadow-lg hover:shadow-primary/5 md:hover:scale-[1.01]"
            )}
        >
            {/* Active Indicator */}
            {selected && (
                <div className="absolute right-0 top-0 p-3">
                    <div className="rounded-full bg-primary p-1 shadow-lg shadow-primary/20">
                        <Zap className="h-3 w-3 fill-primary-foreground text-primary-foreground" />
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3 md:gap-4">
                <div className="space-y-1">
                    <h3 className={cn(
                        "text-lg font-bold tracking-tight transition-colors md:text-xl",
                        selected ? "text-primary" : "text-slate-900 md:group-hover:text-primary"
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
                                    selected ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-600 md:group-hover:bg-primary/5 md:group-hover:text-primary"
                                )}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </button>
    );
}
