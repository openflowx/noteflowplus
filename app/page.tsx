import { HeroCard } from "@/components/landing/hero-card";
import { Navbar } from "@/components/landing/navbar";
import { FeaturesSection } from "@/components/landing/features-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <HeroCard />
      <FeaturesSection />
    </main>
  );
}
