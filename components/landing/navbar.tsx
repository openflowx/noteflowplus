import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hexagon } from "lucide-react";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Hexagon className="h-6 w-6 text-primary fill-primary/20" />
                    <span>NoteFlow+</span>
                </Link>
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="#" className="transition-colors hover:text-primary">Home</Link>
                    <Link href="#features" className="transition-colors hover:text-primary">Features</Link>
                    <Link href="#support" className="transition-colors hover:text-primary">Support</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block">
                        Log in
                    </Link>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    );
}
