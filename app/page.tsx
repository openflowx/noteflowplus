import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <Hero />
    </main>
  );
}
