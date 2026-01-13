import { FeatureCard } from "../landing/feature-card";

export function FlowHero() {
    return (
        <div className="h-full flex flex-col justify-center items-center p-8 text-center space-y-10 rounded-[2.5rem] bg-white  border-slate-100 shadow-xl shadow-sky-50 overflow-hidden relative">
            <div className="relative">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                    <FeatureCard
                        variant="image"
                        imageSrc="/hero.webp"
                        className="w-56 h-40"
                    />
                </div>
            </div>

            <div className="max-w-xs space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                    Elevate Your <span className="text-sky-500">Focus</span>
                </h2>
                <p className="text-slate-500 leading-relaxed">
                    Flows are more than folders—they are your digital command centers for deep thought.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                    <span className="text-3xl font-bold text-sky-500">100%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Productive</span>
                </div>
                <div className="flex flex-col items-center bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                    <span className="text-3xl font-bold text-sky-500">∞</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Workflow</span>
                </div>
            </div>
        </div>
    );
}
