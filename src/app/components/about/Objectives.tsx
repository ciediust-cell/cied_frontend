import {
  Lightbulb,
  Rocket,
  Users,
  Handshake,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const objectives = [
  {
    icon: Lightbulb,
    title: "Promote Entrepreneurship",
    description:
      "Cultivate an entrepreneurial mindset among students, faculty, and researchers through workshops, boot camps, and awareness programs.",
  },
  {
    icon: Rocket,
    title: "Support Early-Stage Startups",
    description:
      "Provide incubation support, mentorship, and resources to transform innovative ideas into viable businesses.",
  },
  {
    icon: Handshake,
    title: "Industry-Academia Collaboration",
    description:
      "Bridge the gap between academic research and industry needs, fostering partnerships that drive innovation.",
  },
  {
    icon: GraduationCap,
    title: "Skill Development",
    description:
      "Equip entrepreneurs with essential business skills, technical knowledge, and leadership capabilities.",
  },
  {
    icon: TrendingUp,
    title: "Innovation & Commercialization",
    description:
      "Facilitate the commercialization of research outputs and technological innovations developed at IUST.",
  },
  {
    icon: Users,
    title: "Ecosystem Building",
    description:
      "Create a thriving startup ecosystem by connecting entrepreneurs with investors, mentors, and industry experts.",
  },
];

// Motion variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Objectives() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            Our Objectives & Focus Areas
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Strategic priorities that guide our approach to nurturing innovation
            and entrepreneurship
          </p>
        </motion.div>

        {/* Objectives Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <motion.div key={index} variants={item} whileHover={{ y: -6 }}>
                <div className="group h-full p-5 sm:p-6 rounded-xl border-2 border-border hover:border-primary/30 hover:shadow-lg transition-all bg-white">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="h-7 w-7 text-accent" />
                    </motion.div>
                  </div>

                  <h3 className="text-lg sm:text-xl mb-3 text-primary">
                    {objective.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {objective.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

