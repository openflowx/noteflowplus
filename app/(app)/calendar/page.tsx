import { CalendarContainer } from "@/components/calendar/calendar-container";

export default function CalendarPage() {
    // Mock events for UI demonstration
    const mockEvents = [
        {
            id: '1',
            title: 'Project Alpha Kickoff',
            start: new Date(new Date().setHours(10, 0, 0, 0)),
            end: new Date(new Date().setHours(11, 30, 0, 0)),
            extendedProps: {
                description: 'Discuss initial requirements and team roles.',
                flowId: 'flow-1',
                status: 'completed'
            },
            backgroundColor: 'oklch(0.65 0.2 240)', // Custom primary color
        },
        {
            id: '2',
            title: 'Design Review',
            start: new Date(new Date().setDate(new Date().getDate() + 1)),
            allDay: true,
            extendedProps: {
                description: 'Review the latest UI mockups with the stakeholders.',
                flowId: 'flow-2',
                status: 'todo'
            },
            backgroundColor: 'oklch(0.7 0.15 180)', // Success/Greenish
        },
        {
            id: '3',
            title: 'Weekly Sync',
            start: new Date(new Date().setHours(14, 0, 0, 0)),
            end: new Date(new Date().setHours(15, 0, 0, 0)),
            extendedProps: {
                description: 'Catch up on progress and blockers.',
                flowId: 'flow-1',
                status: 'in-progress'
            },
            backgroundColor: 'oklch(0.75 0.15 60)', // Warning/Orange
        }
    ];

    return (
        <div className="h-full w-full overflow-hidden">
            <CalendarContainer events={mockEvents} />
        </div>
    );
}
