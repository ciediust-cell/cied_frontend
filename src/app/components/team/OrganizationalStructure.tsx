import {
  Users,
  Target,
  Briefcase,
  GraduationCap,
  Building2,
} from "lucide-react";

export function OrganizationalStructure() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            Organizational Structure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collaborative structure designed for startup success
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Leadership Tier */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white border-2 border-primary rounded-xl p-6 text-center shadow-md">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-xl text-primary mb-1">Director</div>
                  <p className="text-sm text-muted-foreground">
                    Strategic Leadership & Vision
                  </p>
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-center">
              <div className="w-0.5 h-12 bg-border"></div>
            </div>
          </div>

          {/* Management Tier */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white border-2 border-secondary rounded-xl p-6 text-center shadow-md">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="text-xl text-primary mb-1">
                    Chief Coordinator
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Operations & Execution
                  </p>
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-center">
              <div className="w-0.5 h-12 bg-border"></div>
            </div>
          </div>

          {/* Department Heads Tier */}
          <div className="mb-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-accent rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="h-5 w-5 text-accent" />
                </div>
                <div className="text-lg text-primary mb-1">Programs Lead</div>
                <p className="text-xs text-muted-foreground">
                  Incubation Programs
                </p>
              </div>

              <div className="bg-white border-2 border-accent rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div className="text-lg text-primary mb-1">
                  Business Dev Lead
                </div>
                <p className="text-xs text-muted-foreground">
                  Partnerships & Growth
                </p>
              </div>

              <div className="bg-white border-2 border-accent rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-5 w-5 text-accent" />
                </div>
                <div className="text-lg text-primary mb-1">Mentor Lead</div>
                <p className="text-xs text-muted-foreground">
                  Mentorship Programs
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Teams */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 rounded-xl border border-border">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                <span className="text-primary">Core Team:</span> Finance,
                Technology, Communications, Legal, Research & Analytics
              </span>
            </div>
          </div>

          {/* Advisory Board Note */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/5 rounded-xl border border-accent/20">
              <GraduationCap className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">
                <span className="text-accent">Advisory Board</span> provides
                strategic guidance and mentorship
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
