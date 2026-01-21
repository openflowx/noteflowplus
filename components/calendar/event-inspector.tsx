"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useCalendarStore } from '@/store/use-calendar-store';
import { Button } from '@/components/ui/button';
import { X, Calendar as CalendarIcon, Clock, AlignLeft, CheckCircle2, MoreVertical, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import { CALENDAR_LAYOUT } from '@/lib/constants';

export function EventInspector() {
    const { selectedEvent, isInspectorOpen, closeInspector } = useCalendarStore();
    const isLargeScreen = useIsLargeScreen();

    if (!selectedEvent) return null;

    const isNew = selectedEvent.id === 'new';

    const InspectorContent = (
        <div className="flex flex-col h-full bg-card">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={closeInspector}>
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
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    <Button variant="default" size="sm" className="rounded-full px-4 text-xs font-bold">
                        {isNew ? 'Create' : 'Save'}
                    </Button>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {/* Title Section */}
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Event Title"
                        defaultValue={selectedEvent.title}
                        className="w-full text-2xl md:text-3xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30 focus:ring-0"
                        autoFocus={isNew}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer px-2 py-0.5 text-[10px]">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            {selectedEvent.status || 'Todo'}
                        </Badge>
                        <Badge variant="outline" className="text-muted-foreground border-border px-2 py-0.5 text-[10px]">
                            Project Alpha
                        </Badge>
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
                        placeholder="Add details for this event..."
                        defaultValue={selectedEvent.description}
                        className="w-full min-h-32 bg-transparent border-none outline-none resize-none text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:ring-0"
                    />
                </div>

                {/* Rich Logic Placeholder */}
                {!isNew && (
                    <div className="p-4 rounded-[2rem] bg-accent/10 border border-dashed border-border/60 text-center space-y-3 group hover:border-primary/30 transition-colors">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Event Context</div>
                        <p className="text-xs text-muted-foreground leading-relaxed px-4">Create rich notes or link specific knowledge flows to this event.</p>
                        <Button variant="outline" size="sm" className="w-full rounded-2xl bg-white text-[10px] font-bold shadow-sm">
                            Open Full Editor
                        </Button>
                    </div>
                )}
            </div>

            {/* Sticky Footer */}
            <div className="p-4 bg-accent/5 border-t border-border mt-auto">
                <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                    <span>Created: {format(selectedEvent.start, 'MMM d, yyyy')}</span>
                    <span className="flex items-center gap-1">
                        Status: <span className="text-primary italic">Live</span>
                    </span>
                </div>
            </div>
        </div>
    );

    if (!isLargeScreen) {
        return (
            <Sheet open={isInspectorOpen} onOpenChange={(open) => !open && closeInspector()}>
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
                    className="fixed top-[4.5rem] right-4 bottom-4 bg-card border border-border rounded-[2.5rem] shadow-2xl z-50 overflow-hidden flex flex-col"
                    style={{
                        height: 'calc(100vh - 5.5rem)',
                        width: `${CALENDAR_LAYOUT.INSPECTOR_WIDTH}px`
                    }}
                >
                    {InspectorContent}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
