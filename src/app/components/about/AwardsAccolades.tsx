import { Card, CardContent } from "../ui/card";
import { Award, Trophy } from "lucide-react";

interface AwardItem {
  title: string;
  year: string;
  awardingBody: string;
  description: string;
}

const awards: AwardItem[] = [
  {
    title: "Best Innovation Hub Award",
    year: "2024",
    awardingBody: "Ministry of Education, Govt. of India",
    description:
      "Recognized for exceptional contribution to fostering innovation and entrepreneurship in higher education institutions.",
  },
  {
    title: "Excellence in Startup Ecosystem Development",
    year: "2023",
    awardingBody: "NITI Aayog",
    description:
      "Awarded for creating a robust ecosystem supporting startups across diverse sectors in Jammu & Kashmir.",
  },
  {
    title: "Outstanding Incubation Centre",
    year: "2023",
    awardingBody: "Startup India, DPIIT",
    description:
      "Honored for outstanding performance in incubation services, mentorship quality, and startup success rate.",
  },
  {
    title: "Social Impact Innovation Award",
    year: "2022",
    awardingBody: "Government of Jammu & Kashmir",
    description:
      "Recognized for incubating startups that have created significant social and economic impact in the region.",
  },
  {
    title: "Best University Incubator",
    year: "2022",
    awardingBody: "Association of Indian Universities (AIU)",
    description:
      "Acknowledged for integrating entrepreneurship education with practical incubation support at the university level.",
  },
  {
    title: "Women Entrepreneurship Excellence",
    year: "2021",
    awardingBody: "National Commission for Women",
    description:
      "Commended for promoting and supporting women-led startups through dedicated programs and resources.",
  },
];

export function AwardsAccolades() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-xl mb-4">
            <Trophy className="h-8 w-8 text-secondary" />
          </div>
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            Awards & Accolades
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition for our commitment to innovation and entrepreneurship
            excellence
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto space-y-6">
          {awards.map((award, index) => (
            <Card
              key={index}
              className="border-2 border-border hover:border-secondary/30 hover:shadow-md transition-all"
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Year Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center border-2 border-secondary/30">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl text-primary mb-1">
                          {award.year}
                        </div>
                        <Award className="h-5 w-5 text-secondary mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl mb-2 text-primary">
                      {award.title}
                    </h3>
                    <div className="text-sm text-secondary mb-3">
                      {award.awardingBody}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {award.description}
                    </p>
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
