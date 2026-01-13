"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FlowCard } from "@/components/flow/flow-card";
import { FlowHero } from "@/components/flow/flow-hero";
import { CreateFlowForm } from "@/components/flow/flow-form";
import { FlowSkeleton } from "@/components/flow/flow-skeleton";
import { useFlows } from "@/hooks/use-flows";
import { useFlowStore } from "@/store/use-flow-store";
import { updateSelectedFlow } from "@/app/actions/preferences";
import { Zap } from "lucide-react";
import { toast } from "sonner";

export default function FlowsPage() {
    const { isLoaded } = useUser();

    const { flows, fetchFlows, createFlow, isLoading, error } = useFlows();
    const { selectedFlowId, setFlowId } = useFlowStore();

    const handleSelectFlow = async (id: string) => {
        setFlowId(id);
        try {
            await updateSelectedFlow(id);
            const flowName = flows.find(f => f.id === id)?.title || "Flow";
            toast.success(`Active context: ${flowName}`);
        } catch (err) {
            console.error("Failed to sync flow choice", err);
        }
    };

    useEffect(() => {
        if (!isLoaded) return;
        fetchFlows();
    }, [isLoaded, fetchFlows]);



    return (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-x-hidden">
            {/* Background Decorations */}
            <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[60%] animate-pulse rounded-full bg-sky-200/30 blur-[80px] -z-10 md:blur-[120px] lg:w-[40%]" />
            <div className="absolute bottom-[10%] right-[-5%] h-[30%] w-[50%] rounded-full bg-blue-200/20 blur-[70px] -z-10 md:blur-[100px] lg:w-[30%]" />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:px-6 md:py-12 lg:grid-cols-12 lg:gap-12 lg:px-10">
                <div className="flex h-full flex-col space-y-8 lg:col-span-12 xl:col-span-8 xl:space-y-10">
                    <div className="space-y-3">
                        <div className="mb-1 inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-600 md:mb-2 md:text-xs">
                            Dashboard
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                            Knowledge <span className="text-sky-500">Flows</span>
                        </h1>
                        <p className="max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
                            Design and organize your intellectual workstreams with precision and ease.
                        </p>
                    </div>

                    <div className="rounded-[2rem] border border-white/60 bg-white/40 p-1 shadow-2xl shadow-sky-200/20 backdrop-blur-xl md:rounded-[2.5rem]">
                        <CreateFlowForm onSubmit={createFlow} />
                    </div>

                    <div className="space-y-6 px-1 py-4 pb-12 md:px-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Your Flows</h2>
                            <div className="flex items-center gap-2 rounded-2xl border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600 md:px-4 md:py-2 md:text-sm">
                                {flows.length} <span className="font-normal text-slate-400">Active</span>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-4">
                                {[1, 2].map(i => <FlowSkeleton key={i} />)}
                            </div>
                        ) : error ? (
                            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4 text-sm text-red-600 backdrop-blur-md md:rounded-3xl md:p-6">{error}</div>
                        ) : flows.length === 0 ? (
                            <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/40 px-4 py-12 text-center backdrop-blur-md md:rounded-[3rem] md:py-20">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm md:h-16 md:w-16 md:rounded-2xl">
                                    <Zap className="h-6 w-6 text-sky-400 md:h-8 md:w-8" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">No Flows Found</h3>
                                <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-500 md:text-base">Start your journey by creating your first knowledge flow above.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:gap-6">
                                {flows.map(flow => (
                                    <FlowCard
                                        key={flow.id}
                                        flow={flow}
                                        selected={flow.id === selectedFlowId}
                                        onClick={() => handleSelectFlow(flow.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden xl:col-span-4 xl:block">
                    <div className="sticky top-10">
                        <FlowHero />
                    </div>
                </div>
            </div>
        </div>
    );
}
