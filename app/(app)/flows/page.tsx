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
            <div className="absolute top-[-10%] left-[-10%] w-[60%] lg:w-[40%] h-[40%] bg-sky-200/30 blur-[80px] lg:blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-[10%] right-[-5%] w-[50%] lg:w-[30%] h-[30%] bg-blue-200/20 blur-[70px] lg:blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-12 xl:col-span-8 flex flex-col h-full space-y-8 lg:space-y-10">
                    <div className="space-y-3">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">
                            Dashboard
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
                            Knowledge <span className="text-sky-500">Flows</span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed">
                            Design and organize your intellectual workstreams with precision and ease.
                        </p>
                    </div>

                    <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-1 border border-white/60 shadow-2xl shadow-sky-200/20">
                        <CreateFlowForm onSubmit={createFlow} />
                    </div>

                    <div className="space-y-6 pt-4 pb-12 px-1 sm:px-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Flows</h2>
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-600 bg-sky-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-sky-100">
                                {flows.length} <span className="text-slate-400 font-normal">Active</span>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-4">
                                {[1, 2].map(i => <FlowSkeleton key={i} />)}
                            </div>
                        ) : error ? (
                            <div className="p-4 sm:p-6 bg-red-50/50 backdrop-blur-md rounded-2xl sm:rounded-3xl text-red-600 border border-red-100 text-sm">{error}</div>
                        ) : flows.length === 0 ? (
                            <div className="text-center py-12 sm:py-20 bg-white/40 backdrop-blur-md rounded-[2.5rem] sm:rounded-[3rem] border-2 border-dashed border-slate-200 px-4">
                                <div className="bg-white w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                                    <Zap className="text-sky-400 h-6 sm:h-8 w-6 sm:w-8" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">No Flows Found</h3>
                                <p className="text-sm sm:text-base text-slate-500 max-w-xs mx-auto leading-relaxed">Start your journey by creating your first knowledge flow above.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:gap-6">
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

                <div className="hidden xl:col-span-4 xl:block h-full">
                    <div className="sticky top-10">
                        <FlowHero />
                    </div>
                </div>
            </div>
        </div>
    );
}
