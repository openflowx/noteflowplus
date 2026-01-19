"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useCalendarStore } from '@/store/use-calendar-store';
import { Button } from '@/components/ui/button';
import { X, Calendar as CalendarIcon, Clock, AlignLeft, CheckCircle2, MoreVertical, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function EventInspector() {
    const { selectedEvent, isInspectorOpen, closeInspector } = useCalendarStore();

    if (!selectedEvent) return null;

    const isNew = selectedEvent.id === 'new';

    return (
        <AnimatePresence>
            {isInspectorOpen && (
                <>
                    {/* Overlay for mobile/blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeInspector}
                        className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-40 lg:hidden"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full lg:w-112.5 bg-card border-l border-border shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-bottom border-border">
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={closeInspector}>
                                    <X className="h-4 w-4" />
                                </Button>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
                                <Button variant="default" size="sm" className="rounded-full px-4">
                                    {isNew ? 'Create' : 'Save'}
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                            {/* Title Section */}
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Event Title"
                                    defaultValue={selectedEvent.title}
                                    className="w-full text-3xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30 focus:ring-0"
                                    autoFocus={isNew}
                                />
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        {selectedEvent.status || 'Todo'}
                                    </Badge>
                                    <Badge variant="outline" className="text-muted-foreground border-border">
                                        Linked Flow: Project Alpha
                                    </Badge>
                                </div>
                            </div>

                            {/* Time Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-muted-foreground group">
                                    <div className="p-2 rounded-lg bg-accent group-hover:bg-primary/10 transition-colors">
                                        <CalendarIcon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground">
                                            {format(selectedEvent.start, 'EEEE, MMMM do')}
                                        </span>
                                        <span className="text-xs">Date</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-muted-foreground group">
                                    <div className="p-2 rounded-lg bg-accent group-hover:bg-primary/10 transition-colors">
                                        <Clock className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground">
                                            {selectedEvent.isAllDay
                                                ? 'All Day'
                                                : `${format(selectedEvent.start, 'h:mm a')} - ${format(selectedEvent.end, 'h:mm a')}`
                                            }
                                        </span>
                                        <span className="text-xs">Time</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Description Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <AlignLeft className="h-4 w-4" />
                                    Description
                                </div>
                                <textarea
                                    placeholder="Add details for this event..."
                                    defaultValue={selectedEvent.description}
                                    className="w-full min-h-25 bg-transparent border-none outline-none resize-none text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:ring-0"
                                />
                            </div>

                            {/* Rich Content Placeholder (Tiptap would go here) */}
                            {!isNew && (
                                <div className="pt-4 border-t border-dashed border-border">
                                    <div className="p-4 rounded-xl bg-accent/50 border border-border/50 text-center space-y-2">
                                        <div className="text-xs font-medium text-muted-foreground">Rich Event Notes</div>
                                        <Button variant="outline" size="sm" className="w-full text-xs">
                                            Open in Full Editor
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-accent/30 border-t border-border mt-auto">
                            <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
                                <span>Created: {format(new Date(), 'MMM d, yyyy')}</span>
                                <span>Last Updated: Just Now</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
