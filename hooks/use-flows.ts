"use client";

import { useState, useCallback } from "react";
import { createFlowAction, getFlowsAction } from "@/app/actions/flow";
import { Flow } from "@/types/flow";
import { FlowInsertValues } from "@/schemas/flow";

export function useFlows() {
    const [flows, setFlows] = useState<Flow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFlows = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getFlowsAction();
            setFlows(data);
        } catch (err: any) {
            setError(err.message || "Failed to load flows");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createFlow = useCallback(
        async (values: FlowInsertValues) => {
            setIsSubmitting(true);
            setError(null);

            // Optimistic UI
            const tempFlow: Flow = {
                id: crypto.randomUUID(),
                title: values.title,
                description: values.description,
                tags: values.tags,
                userId: "",
            };
            setFlows(prev => [tempFlow, ...prev]);

            const result = await createFlowAction(values);

            if (!result.success) {
                // rollback
                setFlows(prev => prev.filter(f => f.id !== tempFlow.id));
                //setError(result.message || "Failed to create flow");
            } else {
                await fetchFlows(); // sync with server
            }

            setIsSubmitting(false);
            return result;
        },
        [fetchFlows]
    );

    return { flows, fetchFlows, createFlow, isLoading, isSubmitting, error };
}
