import { FeatureCard } from "../landing/feature-card";

export function FlowHero() {
    return (
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 text-center shadow-xl shadow-primary/5 md:h-full md:rounded-[2.5rem] md:p-8">
            <div className="relative mb-8 md:mb-10">
                <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-6 md:rounded-[2rem] md:p-8">
                    <FeatureCard
                        variant="image"
                        imageSrc="/hero.webp"
                        className="h-32 w-48 md:h-40 md:w-56"
                    />
                </div>
            </div>

            <div className="max-w-xs space-y-3 md:space-y-4">
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-3xl">
                    Elevate Your <span className="text-primary">Focus</span>
                </h2>
                <p className="text-sm leading-relaxed text-slate-500 md:text-base">
                    Flows are more than folders—they are your digital command centers for deep thought.
                </p>
            </div>

            <div className="mt-8 grid w-full grid-cols-2 gap-3 md:mt-10 md:gap-4">
                <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/50 p-4 md:rounded-3xl md:p-5">
                    <span className="text-2xl font-bold text-primary md:text-3xl">100%</span>
                    <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-400 md:text-[10px]">Productive</span>
                </div>
                <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/50 p-4 md:rounded-3xl md:p-5">
                    <span className="text-2xl font-bold text-primary md:text-3xl">∞</span>
                    <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-400 md:text-[10px]">Workflow</span>
                </div>
            </div>
        </div>
    );
}
