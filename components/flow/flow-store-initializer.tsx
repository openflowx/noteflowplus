"use client";

import { useRef } from "react";
import { useFlowStore } from "@/store/use-flow-store";

export function FlowStoreInitializer({ initialFlowId }: { initialFlowId: string | null }) {
    const setFlowId = useFlowStore((state) => state.setFlowId);
    const setHydrated = useFlowStore((state) => state.setHydrated);
    const initialized = useRef(false);

    if (!initialized.current) {
        setFlowId(initialFlowId);
        setHydrated(true);
        initialized.current = true;
    }

    return null;
}
