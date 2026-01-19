"use client";

import React from 'react';
import { CalendarView } from './calendar-view';
import { EventInspector } from './event-inspector';
import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/use-calendar-store';

export function CalendarContainer({ events = [] }: Readonly<{ events?: any[] }>) {
    const { isInspectorOpen } = useCalendarStore();

    // Use 1024px as the threshold for the sidebar vs drawer
    const [isLargeScreen, setIsLargeScreen] = React.useState(false);

    React.useEffect(() => {
        const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

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
