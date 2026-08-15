import { useMemo } from "react";
import { Lightbulb, Users, Calendar, Handshake } from "lucide-react";
import type { PublicHomepageStat } from "src/services/publicHomepageStats.service";
import { Card, CardContent } from "./ui/card";

const fallbackStartupStat: PublicHomepageStat = {
  id: "startups_incubated",
  key: "startups_incubated",
  label: "Startups Incubated",
  prefix: null,
  value: 75,
  decimals: 0,
  suffix: "+",
  order: 0,
  isActive: true,
};

const formatStatValue = (stat: PublicHomepageStat) => {
  const value = stat.value.toFixed(stat.decimals);
  return `${stat.prefix || ""}${value}${stat.suffix || ""}`;
};

const buildHighlights = (startupStat: PublicHomepageStat) => [
  {
    icon: Lightbulb,
    title: "Innovation Programs",
    description:
      "Structured incubation programs designed to transform ideas into successful ventures",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Users,
    title: "Startups Supported",
    description: `${formatStatValue(
      startupStat,
    )} startups nurtured across technology, agriculture, and social sectors`,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Calendar,
    title: "Events & Workshops",
    description:
      "Regular networking events, masterclasses, and industry connect sessions",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Collaborations with leading industry partners and academic institutions",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

interface KeyHighlightsProps {
  stats?: PublicHomepageStat[];
}

export function KeyHighlights({ stats = [] }: KeyHighlightsProps) {
  const startupStat = useMemo(
    () => stats.find((stat) => stat.key === "startups_incubated") ?? fallbackStartupStat,
    [stats],
  );
  const highlights = useMemo(() => buildHighlights(startupStat), [startupStat]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card 
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl ${highlight.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`h-7 w-7 ${highlight.color}`} />
                  </div>
                  <h3 className="text-xl mb-2 text-primary">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
