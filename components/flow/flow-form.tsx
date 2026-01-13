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
        <form onSubmit={handleSubmit(onFormSubmit)} className="relative group overflow-hidden rounded-3xl bg-white/80 p-5 space-y-6 backdrop-blur-md md:rounded-[2rem] md:p-8 md:space-y-8">
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/50 blur-2xl transition-colors group-hover:bg-sky-200" />

            <div className="relative space-y-1 md:space-y-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                    Create <span className="text-2xl text-sky-500 md:text-3xl">.</span>
                </h2>
                <p className="text-xs font-medium leading-relaxed text-slate-500 md:text-sm">
                    Define a new workstream and start organizing.
                </p>
            </div>

            <div className="relative space-y-5 md:space-y-6">
                <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="title" className="px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 md:text-xs">
                        Title
                    </Label>
                    <Input
                        id="title"
                        {...register("title")}
                        placeholder="E.g. Project Phoenix"
                        className={`h-10 rounded-xl border-slate-100 bg-white shadow-sm transition-all focus:border-sky-300 focus:ring-sky-100 md:h-12 md:rounded-2xl ${errors.title ? "border-red-300 focus:ring-red-100" : ""}`}
                    />
                    {errors.title && <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="description" className="px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 md:text-xs">
                        Abstract
                    </Label>
                    <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="What is this flow about?"
                        className="min-h-24 resize-none rounded-xl border-slate-100 bg-white p-3 shadow-sm transition-all focus:border-sky-300 focus:ring-sky-100 md:min-h-28 md:rounded-2xl md:p-4"
                    />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="tags" className="px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 md:text-xs">
                        Categorization
                    </Label>
                    <Input
                        id="tags"
                        {...register("tags")}
                        placeholder="development, design, research"
                        className={`h-10 rounded-xl border-slate-100 bg-white shadow-sm transition-all focus:border-sky-300 focus:ring-sky-100 md:h-12 md:rounded-2xl ${errors.tags ? "border-red-300 focus:ring-red-100" : ""}`}
                    />
                    <div className="flex flex-col gap-1 px-1 md:flex-row md:items-center md:justify-between">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 md:text-[10px]">Max 3 tags, comma separated</p>
                        {errors.tags && <p className="text-[9px] font-bold uppercase tracking-wider text-red-500 md:text-[10px]">{errors.tags.message}</p>}
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="flex h-11! w-full items-center justify-center gap-3 rounded-full border-0 bg-sky-500 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98] md:h-12! md:text-base"
            >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin md:h-5 md:w-5" /> : <Plus className="h-4 w-4 md:h-5 md:w-5" />}
                {isSubmitting ? "Orchestrating..." : "Initiate Flow"}
            </Button>
        </form>
    );
}
