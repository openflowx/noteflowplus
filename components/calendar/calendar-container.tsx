"use client";

import { CalendarView } from './calendar-view';
import { EventInspector } from './event-inspector';
import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/use-calendar-store';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import { getInspectorTotalWidth } from '@/lib/constants';

export function CalendarContainer({ events = [] }: Readonly<{ events?: any[] }>) {
    const isInspectorOpen = useCalendarStore((state) => state.isInspectorOpen);
    const isLargeScreen = useIsLargeScreen();

    const totalMargin = getInspectorTotalWidth();

    return (
        <div className="relative flex h-full w-full overflow-hidden bg-white">
            {/* Calendar Grid */}
            <motion.div
                initial={false}
                animate={{
                    marginRight: isInspectorOpen && isLargeScreen ? `${totalMargin}px` : '0px'
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
