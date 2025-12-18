"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { CreateFlowForm } from "@/components/flow/flow-form";
import { FlowCard } from "@/components/flow/flow-card";
import { FlowHero } from "@/components/flow/flow-hero";
import { Flow } from "@/types/flow";
import { FlowInsertValues } from "@/schemas/flow";
import { createFlowAction, getFlowsAction } from "@/app/actions/flow";


export default function FlowsPage() {
    const { isLoaded, isSignedIn } = useUser();
    const { redirectToSignIn } = useClerk();
    const [flows, setFlows] = useState<Flow[]>([]);
    const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);

    const fetchFlows = async () => {
        const data = await getFlowsAction();
        setFlows(data);
    };

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            redirectToSignIn();
        }
        if (isSignedIn) {
            fetchFlows();
        }
    }, [isLoaded, isSignedIn, redirectToSignIn]);

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                <div className="animate-pulse text-indigo-600 font-semibold">Loading your flows...</div>
            </div>
        );
    }

    const handleCreateFlow = async (values: FlowInsertValues) => {
        try {
            await createFlowAction(values);
            await fetchFlows();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:h-[calc(100vh-6rem)]">
            {/* Left Side: Create & List */}
            <div className="lg:col-span-8 flex flex-col h-full space-y-8 overflow-y-auto pr-2 no-scrollbar">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Flows Management</h1>
                    <p className="text-gray-500">Create and organize your knowledge flows.</p>
                </div>

                <CreateFlowForm onSubmit={handleCreateFlow} />

                <div className="space-y-4 pt-4 pb-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Your Flows</h2>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{flows.length} Flows</span>
                    </div>

                    {flows.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">No flows yet. Create your first one above!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {flows.map((flow) => (
                                <FlowCard
                                    key={flow.id}
                                    flow={flow}
                                    selected={flow.id === selectedFlowId}
                                    onClick={() => setSelectedFlowId(flow.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Hero/Info */}
            <div className="hidden lg:col-span-4 lg:block h-full sticky top-6">
                <FlowHero />
            </div>
        </div>
    );
}
