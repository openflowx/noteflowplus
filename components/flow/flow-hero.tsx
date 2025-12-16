import { Zap } from "lucide-react";
import { FeatureCard } from "../landing/feature-card";

export function FlowHero() {
    return (
        <div className="h-full flex flex-col justify-center items-center p-8 text-center space-y-8 rounded-2xl">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-200 blur-3xl opacity-20 rounded-full scale-150"></div>
                <div className="bg-white p-6 rounded-3xl shadow-xl relative transform transition hover:scale-105 duration-500">
                    <FeatureCard
                        variant="image"
                        imageSrc="/hero.webp"
                        className="w-48 h-36"
                    />
                </div>
            </div>

            <div className="max-w-md space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Streamline Your Work
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed">
                    Flows help you organize your tasks, notes, and ideas into a cohesive stream.
                    Create a flow to get started and boost your productivity.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-2xl font-bold text-gray-900">100%</span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Focus</span>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-2xl font-bold text-gray-900">Zero</span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Clutter</span>
                </div>
            </div>
        </div>
    );
}
