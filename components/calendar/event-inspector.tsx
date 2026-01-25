"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { X, Trash2, Loader2, MoreVertical } from 'lucide-react';

import { useCalendarStore } from '@/store/use-calendar-store';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import { CALENDAR_LAYOUT } from '@/lib/constants';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EventInspectorForm } from './event-inspector-form';
import { useEventInspectorLogic } from '../../hooks/use-event-inspector';

interface EventInspectorProps {
    flows?: any[];
}

export const EventInspector = ({ flows = [] }: Readonly<EventInspectorProps>) => {
    const { selectedEvent, isInspectorOpen, closeInspector } = useCalendarStore();
    const isLargeScreen = useIsLargeScreen();

    // Hook provides all the "intel" and CRUD operations
    const {
        isNew,
        isPending,
        selectedFlowId,
        setSelectedFlowId,
        selectedStatus,
        setSelectedStatus,
        titleInputRef,
        descriptionRef,
        handleSave,
        handleDelete,
        currentFlow,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen
    } = useEventInspectorLogic(selectedEvent, flows, closeInspector);

    if (!selectedEvent) return null;


    // Shared Header across Mobile & Desktop
    const InspectorHeader = (
        <header className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={closeInspector} disabled={isPending} className="rounded-full">
                    <X className="h-4 w-4" />
                </Button>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {isNew ? 'Create New' : 'Event Details'}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                {!isNew && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 rounded-full"
                            onClick={() => setIsDeleteDialogOpen(true)}
                            disabled={isPending}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" disabled={isPending} className="rounded-full">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </>
                )}
                <Button
                    variant="default"
                    size="sm"
                    className="rounded-full px-5 text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                    onClick={handleSave}
                    disabled={isPending}
                >
                    {isPending ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : null}
                    {isNew ? 'Create' : 'Save Changes'}
                </Button>
            </div>
        </header>
    );


    // Shared Footer across Mobile & Desktop
    const InspectorFooter = !isNew && (
        <footer className="p-5 bg-muted/30 border-t border-border mt-auto">
            <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground/50 uppercase tracking-[0.1em]">
                <span className="flex items-center gap-1.5">
                    Updated: {format(selectedEvent.start, 'MMM d, h:mm a')}
                </span>
                <span className="flex items-center gap-1.5">
                    Role: <span className="text-primary/70 italic">Owner</span>
                </span>
            </div>
        </footer>
    );

    // Props bundle to keep the main return clean
    const formProps = {
        selectedEvent,
        flows,
        isPending,
        titleInputRef,
        descriptionRef,
        selectedFlowId,
        setSelectedFlowId,
        selectedStatus,
        setSelectedStatus,
        currentFlow,
        isNew
    };

    const DeleteDialog = (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="rounded-[1.5rem] border-border shadow-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-bold">Delete Event?</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground">
                        This action cannot be undone. This will permanently delete the {" "}
                        <span className="text-foreground"> "{selectedEvent.title}"</span> event
                        and remove it from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel className="rounded-2xl border-border bg-accent/20 font-bold px-6">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        className="rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold px-6 border-none text-white"
                    >
                        {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    // MOBILE VIEW: Bottom Sheet Layout
    if (!isLargeScreen) {
        return (
            <>
                <Sheet open={isInspectorOpen} onOpenChange={(open) => !open && !isPending && closeInspector()}>
                    <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-[2.5rem] overflow-hidden border-t-0 bg-card ring-0 outline-none">
                        <main className="relative h-full flex flex-col">
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-muted/50 rounded-full z-50" />
                            {InspectorHeader}
                            <EventInspectorForm {...formProps} />
                            {InspectorFooter}
                        </main>
                    </SheetContent>
                </Sheet>
                {DeleteDialog}
            </>
        );
    }

    // DESKTOP VIEW: Motion Animated Sidebar
    return (
        <>
            <AnimatePresence>
                {isInspectorOpen && (
                    <motion.aside
                        initial={{ x: '110%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '110%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 26, stiffness: 200 }}
                        className="absolute top-6 right-6 bottom-6 bg-card border  rounded-[2rem]  shadow-md flex flex-col premium-glass z-50"
                        style={{ width: `${CALENDAR_LAYOUT.INSPECTOR_WIDTH}px` }}
                    >
                        {InspectorHeader}
                        <EventInspectorForm {...formProps} />
                        {InspectorFooter}
                    </motion.aside>
                )}
            </AnimatePresence>
            {DeleteDialog}
        </>
    );
}
