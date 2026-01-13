import { FeatureCard } from "../landing/feature-card";

export function FlowHero() {
    return (
        <div className="h-full flex flex-col justify-center items-center p-10 text-center space-y-10 rounded-[3rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-2xl shadow-sky-100/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-300/30 transition-colors duration-700" />

            <div className="relative">
                <div className="absolute inset-0 bg-sky-200 blur-3xl opacity-20 rounded-full scale-150 animate-pulse"></div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-sky-200/50 relative transform transition hover:scale-105 duration-500 border border-sky-50">
                    <FeatureCard
                        variant="image"
                        imageSrc="/hero.webp"
                        className="w-56 h-40"
                    />
                </div>
            </div>

            <div className="max-w-xs space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    Elevate Your <span className="text-sky-500">Focus</span>
                </h2>
                <p className="text-slate-500 leading-relaxed font-medium">
                    Flows are more than folders—they are your digital command centers for deep thought.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center bg-white/80 p-5 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:scale-[1.05]">
                    <span className="text-3xl font-bold text-sky-500">100%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Productive</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 p-5 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:scale-[1.05]">
                    <span className="text-3xl font-bold text-sky-500">∞</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Workflow</span>
                </div>
            </div>
        </div>
    );
}
