import { AboutHero } from "src/app/components/about/AboutHero";
import { AboutOverview } from "src/app/components/about/AboutOverview";
import { CIEDAtIUST } from "src/app/components/about/CIEDAtIUST";
import { Infrastructure } from "src/app/components/programs/Infrastructure";
import { Leadership } from "src/app/components/about/Leadership";
import { Objectives } from "src/app/components/about/Objectives";
import { VisionMission } from "src/app/components/about/VisionMission";

import { AwardsAccolades } from "src/app/components/about/AwardsAccolades";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <AboutHero />
        <AboutOverview />
        <VisionMission />
        <Objectives />
        <CIEDAtIUST />
        <Leadership />
        <AwardsAccolades />
      </main>
    </div>
  );
}
