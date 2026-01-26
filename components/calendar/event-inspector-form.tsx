"use client";

import React from 'react';
import { format } from 'date-fns';
import {
    CheckCircle2, ChevronDown, ExternalLink, Sparkles,
    CalendarIcon,
    Clock,
    AlignLeft
} from 'lucide-react';;
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
import { updateSelectedFlow } from '@/app/actions/preferences';
import { useRouter } from 'next/navigation';
import { useFlowStore } from '@/store/use-flow-store';


type EventStatus = "todo" | "in-progress" | "completed";

interface EventInspectorFormProps {
    selectedEvent: SelectedEvent;
    flows: Flow[];
    isPending: boolean;
    titleInputRef: React.RefObject<HTMLInputElement | null>;
    descriptionRef: React.RefObject<HTMLTextAreaElement | null>;
    selectedFlowId: string;
    setSelectedFlowId: (id: string) => void;
    selectedStatus: EventStatus;
    setSelectedStatus: (status: EventStatus) => void;
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
    selectedStatus,
    setSelectedStatus,
    currentFlow,
    isNew
}: Readonly<EventInspectorFormProps>) {
    const isAllDayEvent = 'allDay' in selectedEvent ? selectedEvent.allDay : selectedEvent.isAllDay;

    const statusConfig = {
        "todo": { label: "Todo", color: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20" },
        "in-progress": { label: "In Progress", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20" },
        "completed": { label: "Completed", color: "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20" },
    };

    const router = useRouter();
    const { setFlowId } = useFlowStore();

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
                    {/* Status Selection Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild disabled={isPending}>
                            <Badge
                                variant="secondary"
                                className={`${statusConfig[selectedStatus].color} transition-colors cursor-pointer px-2 py-0.5 text-[10px] gap-1`}
                            >
                                <CheckCircle2 className="h-3 w-3" />
                                {statusConfig[selectedStatus].label}
                                <ChevronDown className="h-2 w-2 ml-0.5" />
                            </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[160px] rounded-2xl p-2 shadow-2xl border-border/50">
                            {Object.entries(statusConfig).map(([key, config]) => (
                                <DropdownMenuItem
                                    key={key}
                                    onClick={() => setSelectedStatus(key as EventStatus)}
                                    className="rounded-xl cursor-pointer p-3 transition-colors"
                                >
                                    <span className="font-bold text-xs">{config.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

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
                                        className="rounded-xl flex flex-col items-start gap-1 cursor-pointer p-3 transition-colors focus:bg-primary/10"
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
                            {isAllDayEvent
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


            {/* Context Widget: Intelligence Context */}
            {!isNew && currentFlow && (
                // ACTIVE STATE: Flow is linked
                <div className="p-5 rounded-[2rem] bg-primary/5 border border-primary/20 space-y-3 transition-all">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-3 w-3 text-primary" />
                            <div className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">Flow Context</div>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-muted-foreground/70 leading-relaxed mb-1">
                            Linked to Flow
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-foreground">{currentFlow.title}</span>
                            {currentFlow.tags?.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="text-[9px] bg-background/50 px-1.5 py-0.5 rounded-md text-muted-foreground border border-border/50">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="default"
                        size="sm"
                        className="w-full rounded-2xl text-[10px] font-bold shadow-sm hover:shadow-md transition-shadow"
                        onClick={async () => {
                            setFlowId(currentFlow.id); // Update client-side store immediately
                            await updateSelectedFlow(currentFlow.id);
                            router.push('/notes'); // navigate after update
                        }}
                    >
                        Open Flow Notes
                        <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                </div>
            )}
        </div>
    );
}
