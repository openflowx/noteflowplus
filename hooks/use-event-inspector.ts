"use client";

import { useEffect, useRef, useState, useTransition, useMemo } from 'react';
import { toast } from 'sonner';
import { useFlowStore } from '@/store/use-flow-store';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import { createEventAction, updateEventAction, deleteEventAction } from '@/app/actions/calendar';


export function useEventInspectorLogic(selectedEvent: any, flows: any[], closeInspector: () => void) {
    const { selectedFlowId: globalFlowId } = useFlowStore();
    const isLargeScreen = useIsLargeScreen();
    const [isPending, startTransition] = useTransition();

    // Form management via refs for performance (minimizing re-renders)
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [selectedFlowId, setSelectedFlowId] = useState<string>('');

    const isNew = selectedEvent?.id === 'new';
    const currentFlow = useMemo(() => flows.find(f => f.id === selectedFlowId), [flows, selectedFlowId]);

    // Synchronize local state with the selected event or active global context
    useEffect(() => {
        if (selectedEvent) {
            setSelectedFlowId(selectedEvent.flowId || globalFlowId || flows[0]?.id || '');
        }
    }, [selectedEvent, globalFlowId, flows]);

    // UX: Provide instant focus for the title field when creating a new event on desktop
    useEffect(() => {
        if (selectedEvent && isNew && isLargeScreen) {
            const timer = setTimeout(() => titleInputRef.current?.focus(), 400);
            return () => clearTimeout(timer);
        }
    }, [selectedEvent, isNew, isLargeScreen]);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Save/Create logic
    const handleSave = async () => {
        if (!selectedEvent) return;

        const title = titleInputRef.current?.value || 'Untitled Event';
        const description = descriptionRef.current?.value || '';

        if (!selectedFlowId) {
            toast.error("Please select a flow for this event");
            return;
        }

        const eventData = {
            ...selectedEvent,
            title,
            description,
            flowId: selectedFlowId,
        };

        startTransition(async () => {
            try {
                const res = isNew
                    ? await createEventAction(eventData)
                    : await updateEventAction(selectedEvent.id, eventData);

                if (res.success) {
                    toast.success(isNew ? "Event created" : "Event updated");
                    closeInspector();
                } else {
                    toast.error(res.message || "Failed to save event");
                }
            } catch (err) {
                console.error("Save Error:", err);
                toast.error("An error occurred while saving the event");
            }
        });
    };


    // Deletion logic with user confirmation
    const handleDelete = async () => {
        if (!selectedEvent) return;

        startTransition(async () => {
            try {
                const res = await deleteEventAction(selectedEvent.id);
                if (res.success) {
                    toast.success("Event deleted");
                    closeInspector();
                } else {
                    toast.error("Failed to delete event");
                }
            } catch (err) {
                console.error("Delete Error:", err);
                toast.error("An error occurred while deleting the event");
            } finally {
                setIsDeleteDialogOpen(false);
            }
        });
    };

    return {
        isNew,
        isPending,
        selectedFlowId,
        setSelectedFlowId,
        titleInputRef,
        descriptionRef,
        handleSave,
        handleDelete,
        currentFlow,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen
    };
}
