import { AboutHero } from "src/app/components/about/AboutHero";
import { AboutOverview } from "src/app/components/about/AboutOverview";
import { Objectives } from "src/app/components/about/Objectives";
import { VisionMission } from "src/app/components/about/VisionMission";

import { CIEDAtIUST } from "src/app/components/about/CiedAtIust";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <AboutHero />
        <AboutOverview />
        <VisionMission />
        <Objectives />
        <CIEDAtIUST />
      </main>
    </div>
  );
}
