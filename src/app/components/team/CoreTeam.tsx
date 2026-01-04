import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { X, Mail, Linkedin, Briefcase } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
  bio?: string;
  expertise?: string[];
  email?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Aamir Rashid",
    role: "Incubation Manager",
    department: "Programs & Operations",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    bio: "Manages day-to-day incubation operations, startup onboarding, and program execution with focus on delivering exceptional value to incubatees.",
    expertise: [
      "Program Management",
      "Startup Operations",
      "Mentorship Coordination",
    ],
    email: "aamir@cied.iust.ac.in",
    linkedin: "#",
  },
  {
    name: "Rukhsana Akhter",
    role: "Business Development Lead",
    department: "Partnerships & Outreach",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    bio: "Leads strategic partnerships, corporate collaborations, and investor connections to expand CIED's ecosystem and funding opportunities.",
    expertise: [
      "Partnership Development",
      "Investor Relations",
      "Ecosystem Building",
    ],
    email: "rukhsana@cied.iust.ac.in",
    linkedin: "#",
  },
  {
    name: "Farooq Ahmad",
    role: "Technology & Infrastructure Lead",
    department: "Technical Support",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    bio: "Oversees technical infrastructure, digital platforms, and technology support services for incubated startups and center operations.",
    expertise: ["Technology Infrastructure", "Digital Platforms", "IT Support"],
    email: "farooq@cied.iust.ac.in",
  },
  {
    name: "Sana Altaf",
    role: "Program Coordinator",
    department: "Events & Training",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    bio: "Coordinates training programs, workshops, events, and networking sessions to enhance entrepreneurial skills and community engagement.",
    expertise: [
      "Event Management",
      "Training Programs",
      "Community Engagement",
    ],
    email: "sana@cied.iust.ac.in",
    linkedin: "#",
  },
  {
    name: "Tariq Hussain",
    role: "Finance & Compliance Officer",
    department: "Finance & Administration",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
    bio: "Manages financial operations, budgeting, compliance, and reporting to ensure transparent and efficient resource utilization.",
    expertise: ["Financial Management", "Compliance", "Budget Planning"],
    email: "tariq@cied.iust.ac.in",
  },
  {
    name: "Nazia Bashir",
    role: "Communications & Marketing Lead",
    department: "Marketing & PR",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    bio: "Drives communications strategy, brand building, social media presence, and public relations to enhance CIED's visibility and impact.",
    expertise: ["Digital Marketing", "Brand Strategy", "Public Relations"],
    email: "nazia@cied.iust.ac.in",
    linkedin: "#",
  },
  {
    name: "Imran Khan",
    role: "Mentor Coordination Lead",
    department: "Mentorship Programs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Coordinates mentor-startup matching, mentorship sessions, and feedback mechanisms to ensure effective guidance and support.",
    expertise: ["Mentor Management", "Startup Support", "Advisory Services"],
    email: "imran@cied.iust.ac.in",
  },
  {
    name: "Shaista Jan",
    role: "Research & Analytics Officer",
    department: "Research & Development",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    bio: "Conducts research on startup trends, ecosystem analysis, and impact assessment to inform strategic decisions and policy advocacy.",
    expertise: ["Research", "Data Analytics", "Impact Assessment"],
    email: "shaista@cied.iust.ac.in",
    linkedin: "#",
  },
  {
    name: "Waseem Akram",
    role: "Legal & IP Advisor",
    department: "Legal Affairs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "Provides legal guidance, intellectual property support, and regulatory compliance assistance to startups and incubation operations.",
    expertise: ["Legal Advisory", "IP Protection", "Compliance"],
    email: "waseem@cied.iust.ac.in",
  },
];

export function CoreTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-xl mb-4">
              <Briefcase className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl text-primary mb-4">
              Core Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dedicated professionals driving day-to-day excellence at CIED
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-2 border-border hover:border-secondary/30 hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <CardContent className="p-6">
                  {/* Photo */}
                  <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-muted">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl mb-2 text-primary">{member.name}</h3>

                  {/* Role */}
                  <div className="text-sm text-secondary mb-2">
                    {member.role}
                  </div>

                  {/* Department */}
                  <p className="text-sm text-muted-foreground">
                    {member.department}
                  </p>

                  {/* View Details Hint */}
                  <div className="mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view details →
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Team Member Details */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-64 bg-gradient-to-br from-secondary/10 to-primary/10 overflow-hidden">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-cover opacity-40"
              />
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Profile Photo Overlay */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-white shadow-xl">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 pt-20 space-y-6">
              {/* Name and Role */}
              <div className="text-center">
                <h2 className="text-3xl mb-2 text-primary">
                  {selectedMember.name}
                </h2>
                <div className="text-xl text-secondary mb-2">
                  {selectedMember.role}
                </div>
                <p className="text-muted-foreground">
                  {selectedMember.department}
                </p>
              </div>

              {/* Bio */}
              {selectedMember.bio && (
                <div>
                  <h4 className="mb-3 text-primary">About</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              {/* Expertise */}
              {selectedMember.expertise &&
                selectedMember.expertise.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-primary">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Contact */}
              {(selectedMember.email || selectedMember.linkedin) && (
                <div className="pt-4 border-t border-border">
                  <h4 className="mb-3 text-primary">Contact</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedMember.email && (
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{selectedMember.email}</span>
                      </a>
                    )}
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
