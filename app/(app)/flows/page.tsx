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
import {  Zap } from "lucide-react";
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
        <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/30 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-200/20 blur-[100px] rounded-full -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-12 xl:col-span-8 flex flex-col h-full space-y-10">
                    <div className="space-y-3">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-600 text-xs font-bold uppercase tracking-wider mb-2">
                            Dashboard
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
                            Knowledge <span className="text-sky-500">Flows</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl">
                            Design and organize your intellectual workstreams with precision and ease.
                        </p>
                    </div>

                    <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-1 border border-white/60 shadow-2xl shadow-sky-200/20">
                        <CreateFlowForm onSubmit={createFlow} />
                    </div>

                    <div className="space-y-6 pt-4 pb-12">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-2xl font-bold text-slate-900">Your Flows</h2>
                            <div className="flex items-center gap-2 text-sm font-semibold text-sky-600 bg-sky-50 px-4 py-2 rounded-2xl border border-sky-100">
                                {flows.length} <span className="text-slate-400 font-normal">Active</span>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1  gap-4">
                                {[1, 2].map(i => <FlowSkeleton key={i} />)}
                            </div>
                        ) : error ? (
                            <div className="p-6 bg-red-50/50 backdrop-blur-md rounded-3xl text-red-600 border border-red-100">{error}</div>
                        ) : flows.length === 0 ? (
                            <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[3rem] border-2 border-dashed border-slate-200">
                                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                                    <Zap className="text-sky-400 h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No Flows Found</h3>
                                <p className="text-slate-500 max-w-xs mx-auto">Start your journey by creating your first knowledge flow above.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 mx-6">
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
