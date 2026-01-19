import { create } from 'zustand';

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description?: string;
    content?: string;
    flowId: string;
    color?: string;
    status: 'todo' | 'in-progress' | 'completed';
    isAllDay: boolean;
}

interface CalendarStore {
    selectedEvent: CalendarEvent | null;
    isInspectorOpen: boolean;
    view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

    // Actions
    setSelectedEvent: (event: CalendarEvent | null) => void;
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
