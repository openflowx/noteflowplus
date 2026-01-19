"use client";

import { CalendarView } from './calendar-view';
import { EventInspector } from './event-inspector';
import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/use-calendar-store';

export function CalendarContainer({ events = [] }: { events?: any[] }) {
    const { isInspectorOpen } = useCalendarStore();

    return (
        <div className="relative flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background">
            {/* Calendar Grid */}
            <motion.div
                animate={{
                    marginRight: isInspectorOpen && globalThis.window !== undefined && globalThis.window.innerWidth > 1024 ? '450px' : '0px'
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="flex-1 h-full"
            >
                <CalendarView events={events} />
            </motion.div>

            {/* Inspector Sidebar */}
            <EventInspector />
        </div>
    );
}
