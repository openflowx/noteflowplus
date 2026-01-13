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
            <div className="absolute top-[-10%] right-[-10%] w-[60%] lg:w-[45%] h-[45%] bg-sky-100/40 blur-[80px] lg:blur-[130px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-[5%] left-[-5%] w-[50%] lg:w-[35%] h-[35%] bg-blue-100/30 blur-[70px] lg:blur-[110px] rounded-full -z-10" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 space-y-8 lg:space-y-12 relative">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-8 border-b border-slate-200/60 pb-8 lg:pb-10">
                    <div className="space-y-2 lg:space-y-3">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-600 text-[10px] font-bold uppercase tracking-wider">
                            Workstream
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
                            Notes <span className="text-sky-500">&</span> Insights
                        </h1>
                        <p className="text-base sm:text-lg text-slate-500 max-w-md leading-relaxed">
                            Capture thoughts and iterate on your ideas within specific flows.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/40 backdrop-blur-xl p-2 rounded-[1.5rem] sm:rounded-[2rem] border border-white/60 shadow-xl shadow-sky-100/20 w-full sm:w-auto">
                        <div className="relative group flex-1 sm:flex-none">
                            <Select
                                value={selectedFlowId || "none"}
                                onValueChange={handleFlowChange}
                            >
                                <SelectTrigger className="w-full sm:w-64 bg-white/80 border-none shadow-sm rounded-xl sm:rounded-2xl h-11 sm:h-12 px-4 sm:px-6 font-semibold text-slate-700 transition-all group-hover:bg-white group-hover:shadow-md text-sm sm:text-base">
                                    <SelectValue placeholder="Select a Flow" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl sm:rounded-2xl border-none shadow-2xl p-2">
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
                                className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold shadow-lg shadow-sky-200 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2 text-sm sm:text-base"
                            >
                                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                                New Note
                            </Button>
                        )}
                    </div>
                </header>

                <main className="min-h-125">
                    {!selectedFlowId ? (
                        <div className="flex flex-col items-center justify-center py-16 sm:py-32 bg-white/40 backdrop-blur-md rounded-[2.5rem] sm:rounded-[3rem] border border-white/80 shadow-2xl shadow-sky-100/20 text-center px-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-linear-to-br from-sky-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative">
                                <div className="bg-white p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl shadow-sky-100/50 mb-6 sm:mb-8 inline-block transform transition group-hover:rotate-6 duration-500">
                                    <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-sky-400" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">Select a Workspace</h2>
                                <p className="text-sm sm:text-lg text-slate-500 max-w-sm mx-auto mb-8 sm:mb-10 leading-relaxed">
                                    To start creating magic, please pick a flow from the dropdown above. Your notes need a home!
                                </p>
                                <div className="flex justify-center">
                                    <div className="w-20 sm:w-24 h-1.5 rounded-full bg-sky-100" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] p-1.5 sm:p-2 border border-white/60 shadow-2xl shadow-sky-100/10 min-h-150">
                            <div className="bg-white rounded-[1.8rem] sm:rounded-[2.5rem] h-full overflow-hidden p-4 sm:p-6 lg:p-10">
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