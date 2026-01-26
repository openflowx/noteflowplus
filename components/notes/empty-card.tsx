import { AlertCircle } from "lucide-react"

export const EmtyCard = () => {
    return (
        <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/40 px-6 py-16 text-center shadow-2xl shadow-primary/5 backdrop-blur-md md:rounded-[3rem] md:py-32">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative">
                <div className="mb-6 inline-block transform rounded-[1.5rem] bg-white p-5 shadow-xl shadow-primary/10 transition duration-500 group-hover:rotate-6 sm:mb-8 sm:rounded-[2rem] sm:p-6">
                    <AlertCircle className="h-10 w-10 text-primary/60 sm:h-12 sm:w-12" />
                </div>
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:mb-4 sm:text-3xl">Select a Workspace</h2>
                <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-slate-500 sm:mb-10 sm:text-lg">
                    To start creating magic, please pick a flow from the dropdown above. Your notes need a home!
                </p>
                <div className="flex justify-center">
                    <div className="h-1.5 w-20 rounded-full bg-primary/10 sm:w-24" />
                </div>
            </div>
        </div>
    )
}