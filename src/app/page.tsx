import { HeroSection } from "@/components/HeroSection";
import { DashboardSection } from "@/components/DashboardSection";
import { CosmicInsightsSection } from "@/components/CosmicInsightsSection";
import { TarotSection } from "@/components/TarotSection";
import { CompatibilitySection } from "@/components/CompatibilitySection";
import { PremiumGuidesSection } from "@/components/PremiumGuidesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-cosmic-blue selection:bg-celestial-gold selection:text-black">
      <HeroSection />
      <DashboardSection />
      <CosmicInsightsSection />
      <TarotSection />
      <CompatibilitySection />
      <PremiumGuidesSection />
      <TestimonialsSection />
    </main>
  );
}
