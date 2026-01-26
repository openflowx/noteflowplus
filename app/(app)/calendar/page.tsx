import { CalendarContainer } from "@/components/calendar/calendar-container";
import { getEventsAction } from "@/app/actions/calendar";
import { getFlowsAction } from "@/app/actions/flow";

export default async function CalendarPage() {
    const [events, flows] = await Promise.all([
        getEventsAction(),
        getFlowsAction()
    ]);

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
                        
                    </div>
                </div>

                {/* Calendar Wrapper - Fills available height */}
                <div className="flex-1 min-h-0 rounded-[2rem] border border-white/60 bg-white shadow-2xl shadow-primary/5 md:rounded-[2.5rem] overflow-hidden">
                    <CalendarContainer events={events} flows={flows} />
                </div>
            </div>
        </div>
    );
}
