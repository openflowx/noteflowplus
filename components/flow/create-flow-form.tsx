"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Flow, FlowColor } from "@/types/flow";

interface CreateFlowFormProps {
    onSubmit: (flow: Omit<Flow, "id" | "createdAt">) => void;
}

export function CreateFlowForm({ onSubmit }: CreateFlowFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    // Random color for new flows just for demo
    const colors: FlowColor[] = ['lime', 'orange', 'blue'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const newFlow = {
            name,
            description: description.trim() || undefined,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            color: colors[Math.floor(Math.random() * colors.length)],
        };

        onSubmit(newFlow);

        // Reset form
        setName("");
        setDescription("");
        setTags("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">Flow Name <span className="text-red-500">*</span></Label>
                    <Input
                        id="name"
                        placeholder="e.g. Morning Routine"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-11 bg-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-semibold">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="What needs to be done?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="resize-none min-h-25 bg-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags" className="text-base font-semibold">Tags</Label>
                    <Input
                        id="tags"
                        placeholder="e.g. personal, urgent (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="h-11 bg-white"
                    />
                </div>
            </div>

            <Button type="submit" size="lg" className="w-full font-bold bg-black hover:bg-gray-800 text-white shadow-lg shadow-gray-200">
                <Plus className="w-5 h-5 mr-2" />
                Create Flow
            </Button>
        </form>
    );
}
