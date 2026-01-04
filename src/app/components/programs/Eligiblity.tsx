import { Card, CardContent } from "../ui/card";
import { Users, GraduationCap, Building2, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const eligibilityCategories = [
  {
    icon: GraduationCap,
    title: "Students & Researchers",
    description:
      "Current students and alumni of IUST or other recognized institutions",
    criteria: [
      "Must be 18 years or older",
      "Have an innovative business idea or research project",
      "Available to commit time to the program",
      "Open to learning and mentorship",
    ],
  },
  {
    icon: Lightbulb,
    title: "Aspiring Entrepreneurs",
    description: "Individuals with innovative ideas ready to build a startup",
    criteria: [
      "Clear business idea or concept",
      "Willingness to validate and iterate",
      "Commitment to build a sustainable venture",
      "Openness to collaboration and feedback",
    ],
  },
  {
    icon: Building2,
    title: "Early-Stage Startups",
    description: "Registered startups seeking growth and scale",
    criteria: [
      "Startup registered under applicable laws",
      "Less than 5 years old from date of incorporation",
      "Focused on innovation and scalability",
      "Willing to relocate to CIED (if required)",
    ],
  },
  {
    icon: Users,
    title: "Social Enterprises",
    description: "Ventures addressing social or environmental challenges",
    criteria: [
      "Clear social or environmental impact thesis",
      "Sustainable business model",
      "Measurable impact metrics",
      "Commitment to underserved communities",
    ],
  },
];

const generalRequirements = [
  "Startup should be based in or willing to establish operations in Jammu & Kashmir",
  "Team should demonstrate relevant domain knowledge or technical expertise",
  "Idea/product should have clear differentiation and competitive advantage",
  "Founders must be willing to dedicate full-time or significant part-time commitment",
  "Compliance with CIED's code of conduct and ethical business practices",
];

/* Animation Variants */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function Eligibility() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-primary/5 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            Who Can Apply?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            CIED welcomes applications from diverse backgrounds and stages
          </p>
        </motion.div>

        {/* Eligibility Categories */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6 mb-12"
        >
          {eligibilityCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220 }}
              >
                <Card className="h-full border border-border rounded-xl hover:shadow-md transition-shadow">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl mb-1 text-primary">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-2 pl-1">
                      {category.criteria.map((criterion, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-accent mt-1">•</span>
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* General Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl border-2 border-border p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl mb-6 text-primary text-center">
              General Requirements
            </h3>

            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {generalRequirements.map((requirement, index) => (
                <motion.li
                  key={index}
                  variants={item}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-xs mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">
                    {requirement}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl mx-auto">
            <span className="text-primary font-medium">Note:</span> Specific
            programs may have additional eligibility criteria. Please review
            individual program details before applying. CIED reserves the right
            to accept or reject applications based on alignment with our mission
            and available capacity.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
