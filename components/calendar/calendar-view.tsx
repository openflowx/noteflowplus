"use client";

import { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCalendarStore } from '@/store/use-calendar-store';
import { updateEventAction } from '@/app/actions/calendar';
import { toast } from 'sonner';
import type { CalendarEvent } from '@/types/calendar';
import './calendar.css';

interface CalendarViewProps {
    events?: CalendarEvent[];
}

export const CalendarView = ({ events = [] }: Readonly<CalendarViewProps>) => {
    const { setSelectedEvent, setView, view } = useCalendarStore();
    const calendarRef = useRef<FullCalendar>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Use ResizeObserver to automatically handle container resizes
    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (!calendarApi || !containerRef.current) return;

        const observer = new ResizeObserver(() => {
            calendarApi.updateSize();
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    const handleEventClick = (info: any) => {
        const event = info.event;
        setSelectedEvent({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            description: event.extendedProps.description,
            flowId: event.extendedProps.flowId,
            status: event.extendedProps.status,
            isAllDay: event.allDay,
        });
    };

    const handleDateSelect = (selectInfo: any) => {
        setSelectedEvent({
            id: 'new',
            title: '',
            start: selectInfo.start,
            end: selectInfo.end,
            flowId: '',
            status: 'todo',
            isAllDay: selectInfo.allDay,
        });
    };

    const handleEventDrop = async (info: any) => {
        const { event } = info;
        const result = await updateEventAction(event.id, {
            ...event.extendedProps,
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.allDay,
        });

        if (result.success) {
            toast.success("Event moved successfully");
        } else {
            info.revert();
            toast.error(result.message ?? "Failed to move event");
        }
    };

    const handleEventResize = async (info: any) => {
        const { event } = info;
        const result = await updateEventAction(event.id, {
            ...event.extendedProps,
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.allDay,
        });

        if (result.success) {
            toast.success("Event duration updated");
        } else {
            info.revert();
            toast.error(result.message ?? "Failed to resize event");
        }
    };

    return (
        <div ref={containerRef} className="h-full w-full overflow-hidden">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={view}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={events}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
                height="100%"
                datesSet={(info) => {
                    if (info.view.type !== view) {
                        setView(info.view.type as any);
                    }
                }}
                eventContent={renderEventContent}
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short' // Changes time format from 'a' to 'am'
                }}
            />
        </div>
    );
}

// Custom inline event content renderer
function renderEventContent(eventInfo: any) {
    return (
        <div className="flex flex-col gap-0.5 overflow-hidden px-1">
            <div className="text-[9px] text-white/80 leading-none truncate font-medium">
                {eventInfo.timeText}
            </div>
            <div className="truncate font-bold leading-tight text-white text-[10px]">
                {eventInfo.event.title}
            </div>
        </div>
    );
}
