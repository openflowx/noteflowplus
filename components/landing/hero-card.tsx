import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroCard() {
    return (
        <section className="container mx-auto px-4 py-16">
            <Card className="overflow-hidden border-none shadow-none">
                <CardContent className="grid gap-12 lg:grid-cols-2 p-8 lg:p-12 items-center">
                    <div className="space-y-6 text-center lg:text-left">
                        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
                            Study Smarter,
                            <span className="block text-primary">Organize Better</span>
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto lg:mx-0">
                            NoteFlow+ is your all-in-one study companion with flows, notes, AI Q&A, quizzes, study sessions, and deadlines — basically your brain, but backed up.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
                            <Button size="lg" variant="outline">Learn More</Button>
                        </div>
                    </div>

                    <div className="relative w-full aspect-square lg:aspect-4/3 flex items-center justify-center">
                        <div className="relative w-full h-full max-w-150">
                            <Image
                                src="/hero.webp"
                                alt="Student studying"
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
