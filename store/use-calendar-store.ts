import { create } from 'zustand';
import type { SelectedEvent } from '@/types/calendar';

interface CalendarStore {
    selectedEvent: SelectedEvent | null;
    isInspectorOpen: boolean;
    view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

    // Actions
    setSelectedEvent: (event: SelectedEvent | null) => void;
    setIsInspectorOpen: (isOpen: boolean) => void;
    setView: (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => void;
    closeInspector: () => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
    selectedEvent: null,
    isInspectorOpen: false,
    view: 'dayGridMonth',

    setSelectedEvent: (event) => set({ selectedEvent: event, isInspectorOpen: !!event }),
    setIsInspectorOpen: (isOpen) => set({ isInspectorOpen: isOpen }),
    setView: (view) => set({ view }),
    closeInspector: () => set({ isInspectorOpen: false, selectedEvent: null }),
}));
