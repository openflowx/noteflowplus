import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type FeatureVariant = "default" | "lime" | "image";

interface FeatureCardProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    variant?: FeatureVariant;
    imageSrc?: string;
}

const VARIANT_STYLES: Record<Exclude<FeatureVariant, "image">, string> = {
    default: "bg-gray-50",
    lime: "bg-[#D9F99D]",
};

export function FeatureCard({
    title,
    description,
    icon,
    className,
    variant = "default",
    imageSrc,
}: Readonly<FeatureCardProps>) {


    if (variant === "image") {
        if (!imageSrc) {
            console.warn("FeatureCard: image variant requires imageSrc");
            return null;
        }

        return (
            <Card
                className={cn(
                    "relative h-full min-h-75 overflow-hidden border-none shadow-none group",
                    className
                )}
            >
                <div className="absolute inset-0">
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${imageSrc})` }}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            </Card>
        );
    }


    return (
        <Card
            className={cn(
                VARIANT_STYLES[variant],
                "h-full border-none shadow-sm transition-all duration-300 hover:shadow-md",
                className
            )}
        >
            <CardContent className="flex h-full flex-col justify-between gap-8 p-8">
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                    <p className="leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                </div>

                {icon && (
                    <div className="self-start rounded-full bg-white/60 p-3 backdrop-blur-sm">
                        {icon}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
