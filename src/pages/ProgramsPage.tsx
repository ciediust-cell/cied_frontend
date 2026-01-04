import { CTASection } from "src/app/components/CTASection";

import { ApplicationProcess } from "src/app/components/programs/ApplicationProcess";
import { BookWorkspace } from "src/app/components/programs/BookWorkspace";
import { Eligibility } from "src/app/components/programs/Eligiblity";
import { Infrastructure } from "src/app/components/programs/Infrastructure";
import { ProgramsGrid } from "src/app/components/programs/ProgramsGrid";
import { ProgramsHero } from "src/app/components/programs/ProgramsHero";
import { ProgramsOverview } from "src/app/components/programs/ProgramsOverview";

export function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <ProgramsHero />
        <ProgramsOverview />
        <ProgramsGrid />
        <ApplicationProcess />
        <Eligibility />
        <Infrastructure />
        <BookWorkspace />
      </main>
    </div>
  );
}
