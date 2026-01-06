"use client"

import { useState, useEffect } from "react"
import { NotesTabs } from "@/components/notes/notes-tab"
import { useNotes } from "@/hooks/use-notes"
import { useFlows } from "@/hooks/use-flows"
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
    const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null)

    const {
        notes,
        activeNote,
        selectNote,
        createNote,
        updateActiveNoteLocally,
        isSaving,
        isLoading
    } = useNotes(selectedFlowId)

    useEffect(() => {
        fetchFlows()
    }, [fetchFlows])

    return (
        <div className="container h-full max-w-5xl py-8 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
                    <p className="text-muted-foreground">Organize your thoughts within your workflows.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Select
                        value={selectedFlowId || ""}
                        onValueChange={(val: string) => setSelectedFlowId(val)}
                    >
                        <SelectTrigger className="w-50 bg-white">
                            <SelectValue placeholder="Select a Flow" />
                        </SelectTrigger>
                        <SelectContent>
                            {flows.map((flow) => (
                                <SelectItem key={flow.id} value={flow.id}>
                                    {flow.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectedFlowId && (
                        <Button onClick={createNote} className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Note
                        </Button>
                    )}
                </div>
            </header>

            {!selectedFlowId ? (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center px-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                        <AlertCircle className="h-10 w-10 text-orange-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No Flow Selected</h2>
                    <p className="text-muted-foreground max-w-xs mx-auto mb-6">
                        Notes must be associated with a flow. Please select a flow from the dropdown above to view or create notes.
                    </p>
                </div>
            ) : (
                <NotesTabs
                    notes={notes}
                    activeNote={activeNote}
                    onSelect={selectNote}
                    onUpdate={updateActiveNoteLocally}
                    isSaving={isSaving}
                    isLoading={isLoading}
                />
            )}
        </div>
    )
}