import { FeatureCard } from "./feature-card";
import {
    ListChecks,
    NotebookPen,
    Brain,
    CircleHelp,
    Timer,
    Calendar
} from "lucide-react";

export function FeaturesSection() {
    return (
        <section id="features" className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Key Features</h2>
                <p className="text-muted-foreground text-lg">
                    Everything you need to study efficiently — without duct-taping five apps together.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                    icon={<ListChecks />}
                    title="Flows"
                    description="Organize topics into logical learning paths that actually make sense."
                />
                <FeatureCard
                    icon={<NotebookPen />}
                    title="Notes"
                    description="Rich notes with structure, clarity, and zero chaos."
                />
                <FeatureCard
                    icon={<Brain />}
                    title="AI Q&A"
                    description="Ask questions. Get answers. Feel smart instantly."
                />
                <FeatureCard
                    icon={<CircleHelp />}
                    title="Quizzes"
                    description="Test yourself and track progress without exam trauma."
                />
                <FeatureCard
                    icon={<Timer />}
                    title="Study Sessions"
                    description="Focused sessions with timing that respects your sanity."
                />
                <FeatureCard
                    icon={<Calendar />}
                    title="Calendar"
                    description="Deadlines, exams, reminders — all in one place."
                />
            </div>
        </section>
    );
}
