import { CTASection } from "src/app/components/CTASection";
import { ImpactHighlights } from "src/app/components/portfolio/ImpactHighlights";
import { PortfolioHero } from "src/app/components/portfolio/PortfolioHero";
import { PortfolioOverview } from "src/app/components/portfolio/PortfolioOverview";
import { StartupGrid } from "src/app/components/portfolio/StartupGrid";

export function StartupPortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <PortfolioHero />
        <PortfolioOverview />
        <StartupGrid />
        <ImpactHighlights />
      </main>
    </div>
  );
}
