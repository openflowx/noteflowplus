"use client";

import { useState } from "react";
import { CreateFlowForm } from "@/components/flow/flow-form";
import { FlowCard } from "@/components/flow/flow-card";
import { FlowHero } from "@/components/flow/flow-hero";
import { Flow } from "@/types/flow";

const MOCK_FLOWS: Flow[] = [
    {
        id: '1',
        name: 'Morning Routine',
        description: 'Daily habits and tasks to kickstart the day with positive energy.',
        tags: ['Routine', 'Health'],
        createdAt: new Date()
    },
    {
        id: '2',
        name: 'Design System',
        description: 'Component library and style guide for the new project.',
        tags: ['Work', 'Design'],
        createdAt: new Date()
    },
    {
        id: '3',
        name: 'Weekly Goals',
        description: 'Top priorities to focus on this week.',
        tags: ['Planning'],
        createdAt: new Date()
    },
];

export default function FlowsPage() {
    const [flows, setFlows] = useState<Flow[]>(MOCK_FLOWS);
    const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);


    const handleCreateFlow = (newFlowData: Omit<Flow, "id" | "createdAt">) => {
        const newFlow: Flow = {
            ...newFlowData,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
        };
        // Add new flow to the top of the list
        setFlows([newFlow, ...flows]);
    };

    return (

        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:h-[calc(100vh-6rem)]">

            {/* Left Side: Create & List */}
            <div className="lg:col-span-8 flex flex-col h-full space-y-8 overflow-y-auto pr-2 no-scrollbar">

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Flows Management</h1>
                    <p className="text-gray-500">Manage your flows here.</p>
                </div>

                <CreateFlowForm onSubmit={handleCreateFlow} />

                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Your Flows</h2>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{flows.length} Flows</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {flows.map((flow) => (
                            <FlowCard key={flow.id} flow={flow} selected={flow.id === selectedFlowId}
                                onClick={() => setSelectedFlowId(flow.id)} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Hero/Info */}
            <div className="hidden lg:col-span-4 lg:block h-full sticky top-6">
                <FlowHero />
            </div>

        </div>

    );
}
