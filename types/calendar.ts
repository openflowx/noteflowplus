import { z } from "zod";
import { eventSchema } from "@/schemas/event";

// Event as stored in the database
export interface DbEvent {
    id: string;
    flowId: string;
    title: string;
    startDatetime: Date;
    endDatetime: Date;
    description: string | null;
    content: string | null;
    color: string | null;
    status: "todo" | "in-progress" | "completed";
    isAllDay: number; // 0 = false, 1 = true 
    createdAt: Date;
    updatedAt: Date;
}

// FORM & VALIDATION TYPES
// Used for form submissions and API inputs
export type EventFormValues = z.infer<typeof eventSchema>;

// Partial event form values for updates
export type EventUpdateValues = Partial<EventFormValues> & {
    id: string;
};

// UI TYPES 
// Event as displayed in FullCalendar
// Matches FullCalendar's event object structure
export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean; // boolean for UI, not integer
    backgroundColor?: string;
    extendedProps: {
        description?: string;
        content?: string;
        flowId: string;
        status: "todo" | "in-progress" | "completed";
    };
}

// New event being created (temporary ID)
export interface NewCalendarEvent {
    id: "new";
    title: string;
    start: Date;
    end: Date;
    flowId: string;
    status: "todo" | "in-progress" | "completed";
    isAllDay: boolean;
    description?: string;
    content?: string;
    color?: string;
}

// Selected event in the inspector (can be new or existing)
export type SelectedEvent = CalendarEvent | NewCalendarEvent;

// TYPE GUARDS
// Check if an event is a new event being created
export function isNewEvent(event: SelectedEvent): event is NewCalendarEvent {
    return event.id === "new";
}


// Check if an event is an existing calendar event
export function isExistingEvent(event: SelectedEvent): event is CalendarEvent {
    return event.id !== "new";
}

// UTILITY TYPES
// Event data for creating or updating via server actions
export interface EventActionData {
    flowId: string;
    title: string;
    start: Date | string;
    end: Date | string;
    description?: string;
    content?: string;
    color?: string;
    backgroundColor?: string; // Alias for color 
    status?: "todo" | "in-progress" | "completed";
    isAllDay?: boolean;
    allDay?: boolean; // Alias for isAllDay 
}


// Server action response type
export interface EventActionResponse {
    success: boolean;
    message?: string;
    event?: CalendarEvent;
}
