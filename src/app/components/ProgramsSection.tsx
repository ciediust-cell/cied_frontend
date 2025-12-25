import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Rocket,
  GraduationCap,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

const programs = [
  {
    icon: Rocket,
    title: "Pre-Incubation Program",
    description:
      "Ideal for early-stage entrepreneurs with innovative ideas. Get mentorship, workspace, and resources to validate your concept.",
    duration: "3-6 months",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: TrendingUp,
    title: "Incubation Program",
    description:
      "For startups ready to scale. Access funding support, legal guidance, and industry connections to accelerate growth.",
    duration: "12-18 months",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: GraduationCap,
    title: "Student Innovation",
    description:
      "Specialized program for student entrepreneurs. Transform academic projects into viable business ventures.",
    duration: "6-12 months",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Award,
    title: "Acceleration Program",
    description:
      "Fast-track program for growth-stage startups. Intensive mentorship and investor connect sessions.",
    duration: "3-6 months",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="py-24 bg-gradient-to-b from-muted/30 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <span className="text-sm text-secondary">Our Programs</span>
          </div>

          <motion.h2
            className="text-4xl sm:text-5xl mb-6 text-primary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            Choose Your Path to Success
          </motion.h2>

          <p className="text-lg text-muted-foreground">
            Comprehensive programs tailored to support entrepreneurs at every
            stage of their journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card
                key={index}
                className="group border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-16 h-16 rounded-xl ${program.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`h-8 w-8 ${program.color}`} />
                    </div>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                      {program.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl mb-3 text-primary">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary group/btn p-0"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
}
