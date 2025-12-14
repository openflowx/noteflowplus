import { FeatureCard } from "./feature-card";
import {
    ListChecks,
    Brain,
    Timer,
    Calendar,
} from "lucide-react";

const FEATURES = [
    {
        icon: <ListChecks className="w-6 h-6" />,
        title: "Structured Notes & Learning Flows",
        description:
            "Organize notes into clear, connected learning paths that actually make sense.",
    },
    {
        icon: <Timer className="w-6 h-6" />,
        title: "Focused Study Sessions",
        description:
            "Stay productive with guided study sessions designed to reduce distractions and burnout.",
    },
    {
        icon: <Brain className="w-6 h-6" />,
        title: "AI-Powered Q&A and Quizzes",
        description:
            "Ask questions, generate quizzes, and get instant explanations while you study.",
    },
    {
        icon: <Calendar className="w-6 h-6" />,
        title: "Smart Deadlines & Reminders",
        description:
            "Track exams, assignments, and study goals in one place — nothing gets forgotten.",
        variant: "lime" as const,
    },
];


export function FeaturesSection() {
    return (
        <section id="features" className="container mx-auto px-4 py-24">
            {/* Header */}
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-xl">
                    <span className="inline-block rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium">
                        Core Features
                    </span>

                    <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                        Everything You Need to Study Smarter
                    </h2>
                </div>
            </div>

            {/* Grid */}
            <div className="grid auto-rows-[350px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Large Image Card (Desktop only) */}
                <FeatureCard
                    variant="image"
                    imageSrc="/hero.webp"
                    className="row-span-2 hidden lg:block"
                />

                {/* Feature Cards */}
                {FEATURES.map((feature) => (
                    <FeatureCard key={feature.title} {...feature} />
                ))}
            </div>

            {/* Image Card (Mobile only) */}
            <div className="mt-6 lg:hidden">
                <FeatureCard variant="image" imageSrc="/hero.webp" />
            </div>
        </section>
    );
}
