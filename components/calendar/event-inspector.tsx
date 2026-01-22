"use client";

import { useEffect, useRef, useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendarStore } from '@/store/use-calendar-store';
import { Button } from '@/components/ui/button';
import { X, Calendar as CalendarIcon, Clock, AlignLeft, CheckCircle2, MoreVertical, Trash2, ChevronDown, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import { CALENDAR_LAYOUT } from '@/lib/constants';
import { createEventAction, updateEventAction, deleteEventAction } from '@/app/actions/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useFlowStore } from '@/store/use-flow-store';
import { toast } from 'sonner';

interface EventInspectorProps {
    flows?: any[];
}

export function EventInspector({ flows = [] }: Readonly<EventInspectorProps>) {
    const { selectedEvent, isInspectorOpen, closeInspector } = useCalendarStore();
    const { selectedFlowId: globalFlowId } = useFlowStore();
    const isLargeScreen = useIsLargeScreen();
    const [isPending, startTransition] = useTransition();

    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [selectedFlowId, setSelectedFlowId] = useState<string>('');

    const isNew = selectedEvent?.id === 'new';

    // Sync local state when event changes
    useEffect(() => {
        if (selectedEvent) {
            setSelectedFlowId(selectedEvent.flowId || globalFlowId || flows[0]?.id || '');
        }
    }, [selectedEvent, globalFlowId, flows]);

    // Delay focus to prevent layout snapping during the sidebar animation
    useEffect(() => {
        if (isInspectorOpen && isNew && isLargeScreen) {
            const timer = setTimeout(() => {
                titleInputRef.current?.focus();
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isInspectorOpen, isNew, isLargeScreen]);

    if (!selectedEvent) return null;

    const currentFlow = flows.find(f => f.id === selectedFlowId);

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
                let res;
                if (isNew) {
                    res = await createEventAction(eventData);
                } else {
                    res = await updateEventAction(selectedEvent.id, eventData);
                }

                if (res.success) {
                    toast.success(isNew ? "Event created" : "Event updated");
                    closeInspector();
                } else {
                    toast.error(res.message || "Failed to save event");
                }
            } catch (err) {
                toast.error("An error occurred");
            }
        });
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this event?")) {
            startTransition(async () => {
                const res = await deleteEventAction(selectedEvent.id);
                if (res.success) {
                    toast.success("Event deleted");
                    closeInspector();
                } else {
                    toast.error("Failed to delete event");
                }
            });
        }
    };

    const InspectorContent = (
        <div className="flex flex-col h-full bg-card">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={closeInspector} disabled={isPending}>
                        <X className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            {isNew ? 'Create Event' : 'Event Details'}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {!isNew && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={handleDelete}
                                disabled={isPending}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled={isPending}>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    <Button
                        variant="default"
                        size="sm"
                        className="rounded-full px-4 text-xs font-bold"
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                        {isNew ? 'Create' : 'Save'}
                    </Button>
                </div>
            </div>

            {/* Content Container */}
            <div key={selectedEvent.id} className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {/* Title Section */}
                <div className="space-y-4">
                    <input
                        ref={titleInputRef}
                        type="text"
                        placeholder="Event Title"
                        defaultValue={selectedEvent.title}
                        disabled={isPending}
                        className="w-full text-2xl md:text-3xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30 focus:ring-0 disabled:opacity-50"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer px-2 py-0.5 text-[10px]">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            {selectedEvent.status || 'Todo'}
                        </Badge>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild disabled={isPending}>
                                <Badge variant="outline" className="text-muted-foreground border-border px-2 py-0.5 text-[10px] cursor-pointer hover:bg-accent/50 transition-colors gap-1">
                                    {currentFlow?.title || 'Select Flow'}
                                    <ChevronDown className="h-2 w-2" />
                                </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[200px]">
                                {flows.length === 0 ? (
                                    <DropdownMenuItem disabled>No flows found</DropdownMenuItem>
                                ) : (
                                    flows.map((flow) => (
                                        <DropdownMenuItem
                                            key={flow.id}
                                            onClick={() => setSelectedFlowId(flow.id)}
                                            className="flex flex-col items-start gap-1 cursor-pointer"
                                        >
                                            <span className="font-medium text-xs">{flow.title}</span>
                                            {flow.tags && flow.tags.length > 0 && (
                                                <div className="flex gap-1">
                                                    {flow.tags.slice(0, 2).map((tag: string) => (
                                                        <span key={tag} className="text-[8px] text-muted-foreground">#{tag}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </DropdownMenuItem>
                                    ))
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Time & Date Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-muted-foreground p-3 rounded-2xl bg-accent/20 border border-border/50">
                        <div className="p-2 rounded-xl bg-white shadow-sm ring-1 ring-border/10">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold tracking-tight text-muted-foreground/60">Date</span>
                            <span className="text-xs font-bold text-slate-900 leading-tight">
                                {format(selectedEvent.start, 'MMM d, yyyy')}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground p-3 rounded-2xl bg-accent/20 border border-border/50">
                        <div className="p-2 rounded-xl bg-white shadow-sm ring-1 ring-border/10">
                            <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold tracking-tight text-muted-foreground/60">Time</span>
                            <span className="text-xs font-bold text-slate-900 leading-tight">
                                {selectedEvent.isAllDay
                                    ? 'All Day'
                                    : `${format(selectedEvent.start, 'h:mm a')} - ${format(selectedEvent.end, 'h:mm a')}`
                                }
                            </span>
                        </div>
                    </div>
                </div>

                <Separator className="opacity-50" />

                {/* Description Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <AlignLeft className="h-3 w-3" />
                        Description
                    </div>
                    <textarea
                        ref={descriptionRef}
                        placeholder="Add details for this event..."
                        defaultValue={selectedEvent.description}
                        disabled={isPending}
                        className="w-full min-h-32 bg-transparent border-none outline-none resize-none text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:ring-0 disabled:opacity-50"
                    />
                </div>

                {/* Rich Logic Placeholder */}
                {!isNew && (
                    <div className="p-4 rounded-[2rem] bg-accent/10 border border-dashed border-border/60 text-center space-y-3 group hover:border-primary/30 transition-colors">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Event Context</div>
                        <p className="text-xs text-muted-foreground leading-relaxed px-4">Create rich notes or link specific knowledge flows to this event.</p>
                        <Button variant="outline" size="sm" className="w-full rounded-2xl bg-white text-[10px] font-bold shadow-sm" disabled={isPending}>
                            Open Full Editor
                        </Button>
                    </div>
                )}
            </div>

            {/* Sticky Footer */}
            {!isNew && (
                <div className="p-6 bg-accent/5 border-t border-border mt-auto">
                    <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                        <span>Updated: {format(selectedEvent.start, 'MMM d, yyyy')}</span>
                        <span className="flex items-center gap-1">
                            Status: <span className="text-primary italic">{selectedEvent.status}</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );

    if (!isLargeScreen) {
        return (
            <Sheet open={isInspectorOpen} onOpenChange={(open) => !open && !isPending && closeInspector()}>
                <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-[2.5rem] overflow-hidden border-t-0 bg-transparent ring-0 outline-none">
                    <div className="relative h-full w-full">
                        {/* Drawer handle decoration */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-muted rounded-full z-50 overflow-hidden" />
                        {InspectorContent}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <AnimatePresence>
            {isInspectorOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-6 right-6 bottom-6 bg-card border border-border rounded-[2.5rem] shadow-xl z-50 overflow-hidden flex flex-col"
                    style={{
                        width: `${CALENDAR_LAYOUT.INSPECTOR_WIDTH}px`
                    }}
                >
                    {InspectorContent}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
