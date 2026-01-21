"use client";


import { CalendarView } from './calendar-view';
import { EventInspector } from './event-inspector';
import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/use-calendar-store';
import { useIsLargeScreen } from '@/hooks/use-large-screen';

export function CalendarContainer({ events = [] }: Readonly<{ events?: any[] }>) {
    const { isInspectorOpen } = useCalendarStore();
    const isLargeScreen = useIsLargeScreen();
    
    return (
        <div className="relative flex h-full w-full overflow-hidden bg-white">
            {/* Calendar Grid */}
            <motion.div
                animate={{
                    marginRight: isInspectorOpen && isLargeScreen ? '450px' : '0px'
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="flex-1 h-full"
            >
                <CalendarView events={events} />
            </motion.div>

            {/* Inspector Sidebar / Mobile Drawer handled inside EventInspector */}
            <EventInspector />
        </div>
    );
}
