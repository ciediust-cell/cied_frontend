import { CTASection } from "src/app/components/CTASection";
import { AdvisoryBoard } from "src/app/components/team/AdvisoryBoard";
import { CoreTeam } from "src/app/components/team/CoreTeam";
import { LeadershipSection } from "src/app/components/team/LeadershipSection";
import { OrganizationalStructure } from "src/app/components/team/OrganizationalStructure";
import { TeamHero } from "src/app/components/team/TeamHero";

export function TeamLeadershipPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <TeamHero />
        <LeadershipSection />
        <AdvisoryBoard />
        <CoreTeam />
        <OrganizationalStructure />
        <CTASection
          title="Interested in collaborating with our team?"
          buttonText="Contact CIED"
        />
      </main>
    </div>
  );
}
