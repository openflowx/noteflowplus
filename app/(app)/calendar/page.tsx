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
        <div className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[60%] animate-pulse rounded-full bg-primary/10 blur-[80px] -z-10 md:blur-[120px] lg:w-[40%]" />
            <div className="absolute bottom-[10%] right-[-5%] h-[30%] w-[50%] rounded-full bg-primary/5 blur-[70px] -z-10 md:blur-[100px] lg:w-[30%]" />

            <div className="flex-1 flex flex-col mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-10 py-6 md:py-8 space-y-6 md:space-y-8">
                {/* Header Section - Compact */}
                <div className="space-y-1 md:space-y-2">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary md:text-xs">
                        Flow Schedule
                    </div>
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl lg:text-3xl text-balance">
                            Event <span className="text-primary">Timeline</span>
                        </h1>
                        <p className="hidden md:block max-w-md text-sm leading-relaxed text-slate-500">
                            Unified interactive schedule for your deadlines and flow events.
                        </p>
                    </div>
                </div>

                {/* Calendar Wrapper - Fills available height */}
                <div className="flex-1 min-h-0 rounded-[2rem] border border-white/60 bg-white shadow-2xl shadow-primary/5 backdrop-blur-xl md:rounded-[2.5rem] overflow-hidden">
                    <CalendarContainer events={mockEvents} />
                </div>
            </div>
        </div>
    );
}
