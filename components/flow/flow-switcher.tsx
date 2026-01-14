"use client";

import { useEffect, useState } from "react";
import { Files, ChevronDown, Check } from "lucide-react";
import { useFlowStore } from "@/store/use-flow-store";
import { getFlowsAction } from "@/app/actions/flow";
import { updateSelectedFlow } from "@/app/actions/preferences";
import { Flow } from "@/types/flow";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";


export function FlowSwitcher() {
    const { selectedFlowId, setFlowId } = useFlowStore();
    const [flows, setFlows] = useState<Flow[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadFlows() {
            try {
                const data = await getFlowsAction();
                setFlows(data);
            } catch (err) {
                console.error("Failed to load flows", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadFlows();
    }, []);

    const handleSelect = async (id: string | null) => {
        setFlowId(id);
        try {
            const res = await updateSelectedFlow(id);
            if (!res.success) {
                toast.error("Failed to save flow preference");
            } else {
                const flowName = flows.find(f => f.id === id)?.title || "None";
                toast.success(`Context switched to: ${flowName}`, {
                    duration: 2000
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const activeFlow = flows.find(f => f.id === selectedFlowId);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="w-full justify-between bg-slate-50/50 hover:bg-slate-100 border border-slate-200/60 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 truncate">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-sm">
                                    <Files className="size-4 text-slate-600" />
                                </div>
                                <div className="flex flex-col items-start gap-0.5 truncate text-left">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                        Active Flow
                                    </span>
                                    <span className="text-sm font-semibold truncate text-slate-900">
                                        {activeFlow?.title || "None selected"}
                                    </span>
                                </div>
                            </div>
                            <ChevronDown className="size-4 text-slate-400" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl p-2"
                        align="start"
                        side="bottom"
                        sideOffset={8}
                    >
                        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-slate-500">
                            Switch Context
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem
                            className="rounded-lg px-2 py-2 cursor-pointer transition-colors"
                            onClick={() => handleSelect(null)}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className="size-2 rounded-full bg-slate-200" />
                                <span className="flex-1 text-sm">None (Global View)</span>
                                {!selectedFlowId && <Check className="size-4 text-primary" />}
                            </div>
                        </DropdownMenuItem>
                        {flows.map((flow) => (
                            <DropdownMenuItem
                                key={flow.id}
                                className="rounded-lg px-2 py-2 cursor-pointer transition-colors"
                                onClick={() => handleSelect(flow.id)}
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <div className="size-2 rounded-full bg-primary" />
                                    <span className="flex-1 text-sm truncate">{flow.title}</span>
                                    {selectedFlowId === flow.id && (
                                        <Check className="size-4 text-primary" />
                                    )}
                                </div>
                            </DropdownMenuItem>
                        ))}
                        {flows.length === 0 && !isLoading && (
                            <div className="px-2 py-4 text-center text-xs text-slate-400">
                                No flows created yet
                            </div>
                        )}
                        {isLoading && (
                            <div className="px-2 py-4 text-center text-xs text-slate-400 animate-pulse">
                                Loading flows...
                            </div>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
