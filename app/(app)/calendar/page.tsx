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
            backgroundColor: 'oklch(0.65 0.2 240)',
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
            backgroundColor: 'oklch(0.7 0.15 180)',
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
            backgroundColor: 'oklch(0.75 0.15 60)',
        }
    ];

    return (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-x-hidden pt-8 md:pt-12">
            {/* Background Decorations */}
            <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[60%] animate-pulse rounded-full bg-primary/10 blur-[80px] -z-10 md:blur-[120px] lg:w-[40%]" />
            <div className="absolute bottom-[10%] right-[-5%] h-[30%] w-[50%] rounded-full bg-primary/5 blur-[70px] -z-10 md:blur-[100px] lg:w-[30%]" />

            <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-10 space-y-8">
                {/* Header Section */}
                <div className="space-y-3">
                    <div className="mb-1 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary md:mb-2 md:text-xs">
                        Flow Schedule
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl text-balance">
                        Event <span className="text-primary">Timeline</span>
                    </h1>
                    <p className="max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
                        Manage your deadlines and flow-specific events in a unified, interactive schedule.
                    </p>
                </div>

                {/* Calendar Wrapper */}
                <div className="rounded-[2rem] border border-white/60 bg-white/40 p-1 shadow-2xl shadow-primary/5 backdrop-blur-xl md:rounded-[2.5rem] overflow-hidden">
                    <div className="h-[750px] w-full">
                        <CalendarContainer events={mockEvents} />
                    </div>
                </div>
            </div>
        </div>
    );
}
