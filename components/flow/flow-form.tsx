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
        <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100/50 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-200 transition-colors" />

            <div className="space-y-2 relative">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create <span className="text-sky-500 text-3xl">.</span></h2>
                <p className="text-sm text-slate-500 font-medium">Define a new workstream and start organizing.</p>
            </div>

            <div className="space-y-6 relative">
                <div className="space-y-2">
                    <Label htmlFor="title" className="font-bold text-xs uppercase tracking-widest text-slate-400 px-1">
                        Title
                    </Label>
                    <Input id="title" {...register("title")} placeholder="E.g. Project Phoenix" className={`h-12 rounded-2xl bg-white border-slate-100 shadow-sm transition-all focus:border-sky-300 focus:ring-sky-100 ${errors.title ? "border-red-300 focus:ring-red-100" : ""}`} />
                    {errors.title && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider px-1">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="font-bold text-xs uppercase tracking-widest text-slate-400 px-1">
                        Abstract
                    </Label>
                    <Textarea id="description" {...register("description")} placeholder="What is this flow about?" className="resize-none min-h-28 bg-white rounded-2xl border-slate-100 shadow-sm transition-all focus:border-sky-300 focus:ring-sky-100" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags" className="font-bold text-xs uppercase tracking-widest text-slate-400 px-1">
                        Categorization
                    </Label>
                    <Input id="tags" {...register("tags")} placeholder="development, design, research" className={`h-12 rounded-2xl bg-white border-slate-100 shadow-sm transition-all focus:border-sky-300 focus:ring-sky-100 ${errors.tags ? "border-red-300 focus:ring-red-100" : ""}`} />
                    <div className="flex justify-between items-center px-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Max 3 tags, comma separated</p>
                        {errors.tags && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.tags.message}</p>}
                    </div>
                </div>
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-12 gap-3 font-bold bg-sky-500 hover:bg-sky-600 text-white border-0 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                {isSubmitting ? "Orchestrating..." : "Initiate Flow"}
            </Button>
        </form>
    );
}
