"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCalendarStore } from '@/store/use-calendar-store';
import './calendar.css';

interface CalendarViewProps {
    events?: any[];
}

export function CalendarView({ events = [] }: CalendarViewProps) {
    const { setSelectedEvent, setView, view } = useCalendarStore();

    const handleEventClick = (info: any) => {
        const event = info.event;
        setSelectedEvent({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            description: event.extendedProps.description,
            content: event.extendedProps.content,
            flowId: event.extendedProps.flowId,
            color: event.backgroundColor,
            status: event.extendedProps.status,
            isAllDay: event.allDay,
        });
    };

    const handleDateSelect = (selectInfo: any) => {
        // Open inspector with a new event template
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

    return (
        <div className="h-full w-full p-4 overflow-hidden">
            <FullCalendar
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
                height="100%"
                datesSet={(info) => {
                    if (info.view.type !== view) {
                        setView(info.view.type as any);
                    }
                }}
                eventContent={renderEventContent}
            />
        </div>
    );
}

function renderEventContent(eventInfo: any) {
    return (
        <div className="flex flex-col gap-0.5 overflow-hidden">
            <div className="font-bold truncate">{eventInfo.timeText}</div>
            <div className="truncate">{eventInfo.event.title}</div>
        </div>
    );
}
