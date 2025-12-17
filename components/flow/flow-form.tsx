"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Flow } from "@/types/flow";

interface CreateFlowFormProps {
    onSubmit: (flow: Omit<Flow, "id" | "createdAt">) => void;
}

export function CreateFlowForm({ onSubmit }: CreateFlowFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        onSubmit({
            name,
            description: description.trim() || undefined,
            tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        });

        setName("");
        setDescription("");
        setTags("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
        >
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                    New Flow
                </h2>
                <p className="text-sm text-gray-500">
                    Create a flow to organize tasks, goals, or ideas.
                </p>
            </div>

            {/* Fields */}
            <div className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="name" className="font-medium">
                        Flow name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="name"
                        placeholder="Morning Routine"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="font-medium">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="What is this flow about?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="resize-none min-h-24"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags" className="font-medium">
                        Tags
                    </Label>
                    <Input
                        id="tags"
                        placeholder="personal, work, urgent"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="h-11"
                    />
                    <p className="text-xs text-gray-500">
                        Separate tags with commas
                    </p>
                </div>
            </div>

            {/* Action */}
            <Button
                type="submit"
                size="lg"
                className="w-full gap-2 font-semibold bg-gray-800 hover:bg-gray-700 shadow-md rounded-full"
            >
                <Plus className="w-5 h-5" />
                Create Flow
            </Button>
        </form>
    );
}
