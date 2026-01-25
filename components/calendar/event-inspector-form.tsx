"use client";

import React from 'react';
import { format } from 'date-fns';
import {
    Calendar as CalendarIcon, Clock, AlignLeft,
    CheckCircle2, ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { SelectedEvent } from '@/types/calendar';
import type { Flow } from '@/types/flow';

interface EventInspectorFormProps {
    selectedEvent: SelectedEvent;
    flows: Flow[];
    isPending: boolean;
    titleInputRef: React.RefObject<HTMLInputElement | null>;
    descriptionRef: React.RefObject<HTMLTextAreaElement | null>;
    selectedFlowId: string;
    setSelectedFlowId: (id: string) => void;
    currentFlow: Flow | undefined;
    isNew: boolean;
}

export function EventInspectorForm({
    selectedEvent,
    flows,
    isPending,
    titleInputRef,
    descriptionRef,
    setSelectedFlowId,
    currentFlow,
    isNew
}: Readonly<EventInspectorFormProps>) {
    return (
        <div key={selectedEvent.id} className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
            {/* Title & Status Section */}
            <section className="space-y-4">
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
                        {'extendedProps' in selectedEvent ? selectedEvent.extendedProps.status : selectedEvent.status}
                    </Badge>

                    {/* Flow Selection Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild disabled={isPending}>
                            <Badge variant="outline" className="text-muted-foreground border-border px-2 py-0.5 text-[10px] cursor-pointer hover:bg-accent/50 transition-colors gap-1">
                                {currentFlow?.title || 'Select Flow'}
                                <ChevronDown className="h-2 w-2" />
                            </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[240px] rounded-2xl p-2 shadow-2xl border-border/50">
                            {flows.length === 0 ? (
                                <DropdownMenuItem disabled className="text-xs text-muted-foreground">No flows available</DropdownMenuItem>
                            ) : (
                                flows.map((flow) => (
                                    <DropdownMenuItem
                                        key={flow.id}
                                        onClick={() => setSelectedFlowId(flow.id)}
                                        className="rounded-xl flex flex-col items-start gap-1 cursor-pointer p-3 transition-colors focus:bg-primary/10 focus:text-primary-foreground"
                                    >
                                        <span className="font-bold text-xs">{flow.title}</span>
                                        {flow.tags?.length > 0 && (
                                            <div className="flex gap-1 flex-wrap overflow-hidden">
                                                {flow.tags.slice(0, 3).map((tag: string) => (
                                                    <span key={tag} className="text-[8px] opacity-70">#{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </DropdownMenuItem>
                                ))
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </section>

            {/* Date & Time Visualization Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-accent/20 border border-border/50">
                    <div className="p-2 rounded-xl bg-card shadow-sm ring-1 ring-border/10">
                        <CalendarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-tight text-muted-foreground/60">Date</span>
                        <span className="text-xs font-bold text-slate-900 leading-tight">
                            {format(selectedEvent.start, 'EEE, MMM d, yyyy')}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-accent/20 border border-border/50">
                    <div className="p-2 rounded-xl bg-card shadow-sm ring-1 ring-border/10">
                        <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-tight text-muted-foreground/60">Time</span>
                        <span className="text-xs font-bold text-slate-900 leading-tight">
                            {('allDay' in selectedEvent ? selectedEvent.allDay : selectedEvent.isAllDay)
                                ? 'All Day'
                                : `${format(selectedEvent.start, 'h:mm a')} - ${format(selectedEvent.end, 'h:mm a')}`
                            }
                        </span>
                    </div>
                </div>
            </section>

            <Separator className="opacity-50" />

            {/* Content/Description Input */}
            <section className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <AlignLeft className="h-3 w-3" />
                    Description
                </div>
                <textarea
                    ref={descriptionRef}
                    placeholder="Enter event details, meeting notes, or task description..."
                    defaultValue={'extendedProps' in selectedEvent ? selectedEvent.extendedProps.description : selectedEvent.description}
                    disabled={isPending}
                    className="w-full min-h-32 bg-transparent border-none outline-none resize-none text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:ring-0 disabled:opacity-50"
                />
            </section>

            {/* Context Widget: Premium feature hint */}
            {!isNew && (
                <div className="p-5 rounded-[2rem] bg-accent/5 border border-dashed border-border/60 text-center space-y-3 group hover:border-primary/20 transition-all hover:bg-accent/10">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Intelligence Context</div>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed px-4">
                        Link this event to a knowledge flow to enable AI assisted notes.
                    </p>
                    <Button variant="outline" size="sm" className="w-full rounded-2xl bg-white text-[10px] font-bold shadow-sm hover:shadow-md transition-shadow" disabled={isPending}>
                        Open Knowledge Studio
                    </Button>
                </div>
            )}
        </div>
    );
}
