"use client"

import { useState, useEffect } from "react"
import { NotesTabs } from "@/components/notes/notes-tab"
import { useNotes } from "@/hooks/use-notes"
import { useFlows } from "@/hooks/use-flows"
import { useFlowStore } from "@/store/use-flow-store"
import { updateSelectedFlow } from "@/app/actions/preferences"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AlertCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotesPage() {
    const { flows, fetchFlows } = useFlows()
    const { selectedFlowId, setFlowId } = useFlowStore()

    const {
        notes,
        activeNote,
        selectNote,
        createNote,
        updateActiveNoteLocally,
        isSaving,
        isLoading
    } = useNotes(selectedFlowId)

    const handleFlowChange = async (id: string) => {
        const newId = id === "none" ? null : id;
        setFlowId(newId);
        try {
            await updateSelectedFlow(newId);
        } catch (err) {
            console.error("Failed to sync flow choice", err);
        }
    }

    useEffect(() => {
        fetchFlows()
    }, [fetchFlows])

    return (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-x-hidden">
            {/* Background Decorations */}
            <div className="absolute right-[-10%] top-[-10%] h-[45%] w-[60%] animate-pulse rounded-full bg-sky-100/40 blur-[80px] -z-10 md:blur-[130px] lg:w-[45%]" />
            <div className="absolute bottom-[5%] left-[-5%] h-[35%] w-[50%] rounded-full bg-blue-100/30 blur-[70px] -z-10 md:blur-[110px] lg:w-[35%]" />

            <div className="relative mx-auto max-w-6xl space-y-8 px-4 py-8 md:space-y-12 md:px-6 md:py-12 lg:px-10">
                <header className="flex flex-col gap-6 border-b border-slate-200/60 pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-10">
                    <div className="space-y-2 md:space-y-3">
                        <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-600">
                            Workstream
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                            Notes <span className="text-sky-500">&</span> Insights
                        </h1>
                        <p className="max-w-md text-base leading-relaxed text-slate-500 md:text-lg">
                            Capture thoughts and iterate on your ideas within specific flows.
                        </p>
                    </div>

                    <div className="flex w-full flex-col items-stretch gap-3 rounded-[1.5rem] border border-white/60 bg-white/40 p-2 shadow-xl shadow-sky-100/20 backdrop-blur-xl sm:w-auto sm:flex-row sm:items-center sm:rounded-[2rem]">
                        <div className="relative group flex-1 sm:flex-none">
                            <Select
                                value={selectedFlowId || "none"}
                                onValueChange={handleFlowChange}
                            >
                                <SelectTrigger className="h-11 w-full rounded-xl border-none bg-white/80 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-white hover:shadow-md sm:h-12 sm:w-64 sm:rounded-2xl sm:px-6 sm:text-base">
                                    <SelectValue placeholder="Select a Flow" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-none p-2 shadow-2xl sm:rounded-2xl">
                                    <SelectItem value="none" className="rounded-lg sm:rounded-xl">No Flow Selected</SelectItem>
                                    {flows.map((flow) => (
                                        <SelectItem key={flow.id} value={flow.id} className="rounded-lg sm:rounded-xl">
                                            {flow.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedFlowId && (
                            <Button
                                onClick={createNote}
                                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 text-sm font-bold text-white shadow-lg shadow-sky-200 transition-all hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98] sm:h-12 sm:rounded-2xl sm:px-8 sm:text-base"
                            >
                                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                                New Note
                            </Button>
                        )}
                    </div>
                </header>

                <main className="min-h-125">
                    {!selectedFlowId ? (
                        <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/40 px-6 py-16 text-center shadow-2xl shadow-sky-100/20 backdrop-blur-md md:rounded-[3rem] md:py-32">
                            <div className="absolute inset-0 bg-linear-to-br from-sky-50/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                            <div className="relative">
                                <div className="mb-6 inline-block transform rounded-[1.5rem] bg-white p-5 shadow-xl shadow-sky-100/50 transition duration-500 group-hover:rotate-6 sm:mb-8 sm:rounded-[2rem] sm:p-6">
                                    <AlertCircle className="h-10 w-10 text-sky-400 sm:h-12 sm:w-12" />
                                </div>
                                <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:mb-4 sm:text-3xl">Select a Workspace</h2>
                                <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-slate-500 sm:mb-10 sm:text-lg">
                                    To start creating magic, please pick a flow from the dropdown above. Your notes need a home!
                                </p>
                                <div className="flex justify-center">
                                    <div className="h-1.5 w-20 rounded-full bg-sky-100 sm:w-24" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-[2rem] border border-white/60 bg-white/40 p-1.5 shadow-2xl shadow-sky-100/10 backdrop-blur-xl min-h-150 sm:p-2 md:rounded-[3rem]">
                            <div className="h-full overflow-hidden rounded-[1.8rem] bg-white p-4 sm:rounded-[2.5rem] sm:p-6 lg:p-10">
                                <NotesTabs
                                    notes={notes}
                                    activeNote={activeNote}
                                    onSelect={selectNote}
                                    onUpdate={updateActiveNoteLocally}
                                    isSaving={isSaving}
                                    isLoading={isLoading}
                                />
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}