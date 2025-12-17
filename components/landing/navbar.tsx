import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <Logo />
                <DesktopNav />
                <Actions />
            </div>
        </header>
    );
}


const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Hexagon className="h-8 w-8 text-black fill-black/20" />
            <span>NoteFlow+</span>
        </Link>
    );
}

const DesktopNav = () => {
    return (
        <nav className="hidden items-center gap-1 rounded-full border border-gray-200/50 bg-gray-100/50 px-2 py-1.5 md:flex">
            {NAV_ITEMS.map((item) => (
                <NavItem key={item.href} {...item} />
            ))}
        </nav>
    );
}

const NavItem = ({ label, href }: { label: string; href: string }) => {
    return (
        <Link
            href={href}
            className={cn(
                "rounded-full px-4 py-2 text-sm font-medium",
                "text-muted-foreground transition-all",
                "hover:bg-white hover:text-foreground"
            )}
        >
            {label}
        </Link>
    );
}

const Actions = () => {
    return (
        <div className="flex items-center gap-3">
            <Link href="/dashboard"> <Button className="rounded-full bg-black px-6 text-white hover:bg-gray-900">
                Try our app <span className="ml-2">↗</span>
            </Button></Link>


            <Button
                variant="outline"
                className="hidden rounded-full px-4 sm:flex"
                aria-label="Change language"
            >
                EN
            </Button>
        </div>
    );
}
