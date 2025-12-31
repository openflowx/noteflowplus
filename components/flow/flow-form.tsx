"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { flowSchema, type FlowFormValues, type FlowInsertValues } from "@/schemas/flow";
import { toast } from "sonner";

interface CreateFlowFormProps {
    onSubmit: (values: FlowInsertValues) => Promise<{
        success: boolean;
        message?: string;
    }>;
}

export function CreateFlowForm({ onSubmit }: CreateFlowFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FlowFormValues, any, FlowInsertValues>({
        resolver: zodResolver(flowSchema),
        defaultValues: {
            title: "",
            description: "",
            tags: "",
        },
    });


    const onFormSubmit = async (data: FlowInsertValues) => {
        const result = await onSubmit(data);

        if (!result || !result.success) {
            toast.error(result?.message ?? "Something went wrong");
            return;
        }


        reset();
        toast.success("Flow created successfully!");
    };


    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">New Flow</h2>
                <p className="text-sm text-gray-500">Create a flow to organize tasks, goals, or ideas.</p>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="title" className="font-medium text-gray-700">
                        Flow title <span className="text-red-500">*</span>
                    </Label>
                    <Input id="title" {...register("title")} placeholder="Morning Routine" className={`h-11 ${errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}`} />
                    {errors.title && <p className="text-xs font-medium text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="font-medium text-gray-700">
                        Description
                    </Label>
                    <Textarea id="description" {...register("description")} placeholder="Optional" className="resize-none min-h-24 bg-gray-50/50" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags" className="font-medium text-gray-700">
                        Tags <span className="text-red-500">*</span>
                    </Label>
                    <Input id="tags" {...register("tags")} placeholder="personal, work, urgent" className={`h-11 ${errors.tags ? "border-red-500 focus-visible:ring-red-500" : ""}`} />
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">Separate up to 3 tags with commas</p>
                        {errors.tags && <p className="text-xs font-medium text-red-500">{errors.tags.message}</p>}
                    </div>
                </div>
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full gap-2 font-semibold bg-gray-800 hover:bg-gray-700 text-white shadow-md rounded-full transition-all active:scale-[0.98]">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                {isSubmitting ? "Creating..." : "Create Flow"}
            </Button>
        </form>
    );
}
