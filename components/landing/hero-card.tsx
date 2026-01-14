export function HeroCard() {
    return (
        <section className="container mx-auto px-4 pt-20 pb-16">
            {/* Text Intro */}
            <div className="flex flex-col items-center text-center space-y-8 mb-12">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-balance leading-tight">
                    AI-Powered Revolution in
                    <span className="block text-gray-900">Note Taking</span>
                </h1>

                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                    NoteFlow+ is your all-in-one study companion with flows, notes, AI Q&A,
                    quizzes, study sessions, and deadlines — basically your brain, but backed up.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative w-full rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]">

                {/* Soft gradient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-primary),transparent_60%)] opacity-10" />

                {/* Grid Background */}
                <div className="absolute inset-0 opacity-60">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                                <path
                                    d="M 24 0 L 0 0 0 24"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="0.6"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative aspect-video flex flex-col items-center justify-center p-8">
                    <div className="text-center z-10">
                        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight">
                            <span className="text-primary">Study</span>
                            <span className="text-gray-900"> Smarter</span>
                        </h1>
                        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mt-2">
                            <span className="text-gray-900">Organize</span>
                            <span className="text-yellow-400"> Better</span>
                        </h1>
                    </div>

                    {/* Floating Action Card */}
                    <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-4 z-20">
                        <div className="bg-black text-white p-3 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold">+</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm">Conduct session</p>
                            <p className="text-xs text-gray-500">Start AI quiz</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
