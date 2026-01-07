import { create } from "zustand";

interface FlowState {
    selectedFlowId: string | null;
    isHydrated: boolean;
    setFlowId: (id: string | null) => void;
    setHydrated: (val: boolean) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
    selectedFlowId: null,
    isHydrated: false,
    setFlowId: (id: string | null) => set({ selectedFlowId: id }),
    setHydrated: (val: boolean) => set({ isHydrated: val }),
}));
