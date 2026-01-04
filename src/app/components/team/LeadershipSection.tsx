import { Card, CardContent } from "../ui/card";
import { Mail, Linkedin } from "lucide-react";

interface Leader {
  name: string;
  designation: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
}

const leaders: Leader[] = [
  {
    name: "Prof. Shakeel Ahmad Romshoo",
    designation: "Director, CIED IUST",
    bio: "Leading innovation and entrepreneurship initiatives with a vision to transform IUST into a hub for startup excellence and sustainable economic growth in J&K.",
    image: "https://images.unsplash.com/photo-1758518727592-706e80ebc354?w=400",
    email: "director@cied.iust.ac.in",
    linkedin: "#",
  },
  {
    name: "Dr. Mushtaq Ahmad Dar",
    designation: "Chief Coordinator, Incubation Centre",
    bio: "Steering strategic initiatives for incubation programs, mentorship, and ecosystem development to nurture high-impact startups across diverse sectors.",
    image: "https://images.unsplash.com/photo-1543132220-7bc04a0e790a?w=400",
    email: "coordinator@cied.iust.ac.in",
    linkedin: "#",
  },
  {
    name: "Dr. Sana Shafi",
    designation: "Head, Programs & Mentorship",
    bio: "Designing and executing comprehensive incubation programs, mentorship frameworks, and strategic partnerships to accelerate startup growth and success.",
    image: "https://images.unsplash.com/photo-1758518729912-bf3a84c400e0?w=400",
    email: "programs@cied.iust.ac.in",
    linkedin: "#",
  },
];

export function LeadershipSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">Leadership</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experienced leaders guiding CIED's mission and strategic direction
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {leaders.map((leader, index) => (
            <Card
              key={index}
              className="border-2 border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <CardContent className="p-0">
                <div className="grid md:grid-cols-[300px_1fr] gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto bg-muted overflow-hidden md:rounded-l-xl rounded-t-xl md:rounded-tr-none">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl text-primary mb-2">
                      {leader.name}
                    </h3>
                    <div className="text-lg text-secondary mb-4">
                      {leader.designation}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {leader.bio}
                    </p>

                    {/* Contact Links */}
                    <div className="flex flex-wrap gap-3">
                      {leader.email && (
                        <a
                          href={`mailto:${leader.email}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">Email</span>
                        </a>
                      )}
                      {leader.linkedin && (
                        <a
                          href={leader.linkedin}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
