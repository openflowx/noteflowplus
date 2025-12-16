import { Badge } from "@/components/ui/badge";
import { Flow } from "@/types/flow";
import { cn } from "@/lib/utils";

interface FlowCardProps {
    flow: Flow;
    onClick?: () => void;
}

const colorStyles = {
    lime: "bg-lime-100 border-lime-200 hover:bg-lime-200 text-lime-900",
    orange: "bg-orange-100 border-orange-200 hover:bg-orange-200 text-orange-900",
    blue: "bg-blue-100 border-blue-200 hover:bg-blue-200 text-blue-900",
};

export function FlowCard({ flow, onClick }: FlowCardProps) {
    return (
        <div
            className={cn(
                "group cursor-pointer rounded-2xl p-5 transition-all duration-200 hover:shadow-md",
                colorStyles[flow.color]
            )}
            onClick={onClick}
        >
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold tracking-tight">{flow.name}</h3>
                    <span className="text-xs font-medium uppercase tracking-wider opacity-60">
                        {flow.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                </div>

                {flow.description && (
                    <p className="text-sm font-medium opacity-80 line-clamp-2">
                        {flow.description}
                    </p>
                )}

                {flow.tags && flow.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                        {flow.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white/40 hover:bg-white/60 text-black border-transparent font-normal">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
