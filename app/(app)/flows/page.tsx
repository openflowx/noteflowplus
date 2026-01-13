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
        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:h-[calc(100vh-6rem)]">
            <div className="lg:col-span-8 flex flex-col h-full space-y-8 overflow-y-auto pr-2 no-scrollbar">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Flows Management</h1>
                    <p className="text-gray-500">Create and organize your knowledge flows.</p>
                </div>

                <CreateFlowForm onSubmit={createFlow} />

                <div className="space-y-4 pt-4 pb-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Your Flows</h2>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{flows.length} Flows</span>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col gap-3">
                            {[1, 2, 3].map(i => <FlowSkeleton key={i} />)}
                        </div>
                    ) : error ? (
                        <div className="p-6 bg-red-50 rounded-lg text-red-600">{error}</div>
                    ) : flows.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">No flows yet. Create your first one above!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
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

            <div className="hidden lg:col-span-4 lg:block h-full sticky top-6">
                <FlowHero />
            </div>
        </div>
    );
}
