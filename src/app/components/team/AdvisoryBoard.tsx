import { Card, CardContent } from "../ui/card";
import { GraduationCap } from "lucide-react";

interface Advisor {
  name: string;
  role: string;
  affiliation: string;
  image: string;
}

const advisors: Advisor[] = [
  {
    name: "Dr. Rahul Khanna",
    role: "Technology & Innovation Advisor",
    affiliation: "IIT Delhi, Former CTO at TechVentures",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    name: "Ms. Priya Sharma",
    role: "Entrepreneurship Advisor",
    affiliation: "Startup India, NITI Aayog",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
  {
    name: "Prof. Amir Hussain",
    role: "Industry & Policy Advisor",
    affiliation: "Kashmir University, Former Secretary J&K Govt",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    name: "Dr. Meera Kapoor",
    role: "Healthcare Innovation Advisor",
    affiliation: "AIIMS, Health Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
  },
  {
    name: "Mr. Arjun Singh",
    role: "Finance & Investment Advisor",
    affiliation: "Angel Investor, Former Partner at Sequoia",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
  {
    name: "Dr. Zainab Khan",
    role: "Agriculture & Sustainability Advisor",
    affiliation: "SKUAST, AgriTech Specialist",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
  },
];

export function AdvisoryBoard() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-primary/5 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-xl mb-4">
            <GraduationCap className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            Advisory Board
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Distinguished experts providing strategic guidance and mentorship
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advisors.map((advisor, index) => (
            <Card
              key={index}
              className="border-2 border-border hover:border-accent/30 hover:shadow-lg transition-all group"
            >
              <CardContent className="p-6 text-center">
                {/* Photo */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-muted border-4 border-white shadow-md group-hover:border-accent/20 transition-colors">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl mb-2 text-primary">{advisor.name}</h3>

                {/* Role */}
                <div className="text-sm text-secondary mb-3">
                  {advisor.role}
                </div>

                {/* Affiliation */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {advisor.affiliation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
