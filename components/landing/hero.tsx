import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                            Study Smarter, <span className="block text-primary">Organize Better</span>
                        </h1>
                        <p className="max-w-150 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
                            NoteFlow+ is your all-in-one study companion, seamlessly integrating Flows, Notes, AI Q&A, Quizzes, Study Sessions, and Calendar Events/Deadlines to elevate your learning experience.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                        <Button size="lg" className="w-full min-[400px]:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                            Get Started
                        </Button>
                        <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                            Learn More
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-125 aspect-square lg:aspect-4/3">
                        <Image
                            src="/hero.webp"
                            alt="Student using laptop for study"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
