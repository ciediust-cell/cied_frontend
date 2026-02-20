import {
  Briefcase,
  Users,
  Wifi,
  BookOpen,
  Lightbulb,
  Network,
} from "lucide-react";
import { motion } from "framer-motion";

const facilities = [
  {
    icon: Briefcase,
    title: "Co-working Spaces",
    description:
      "Modern, fully-equipped workstations for incubated startups with flexible seating arrangements",
  },
  {
    icon: Users,
    title: "Meeting Rooms",
    description:
      "Private conference rooms for client meetings, team discussions, and investor presentations",
  },
  {
    icon: Wifi,
    title: "High-Speed Internet",
    description:
      "Reliable, high-bandwidth connectivity to support technology development and operations",
  },
  {
    icon: BookOpen,
    title: "Library & Resources",
    description:
      "Access to business journals, research papers, and essential startup resources",
  },
  {
    icon: Lightbulb,
    title: "Innovation Lab",
    description:
      "Prototyping facilities and equipment for product development and testing",
  },
  {
    icon: Network,
    title: "Networking Events",
    description:
      "Regular meetups, workshops, and events to connect with mentors and fellow entrepreneurs",
  },
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Infrastructure() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            Infrastructure & Facilities
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            State-of-the-art facilities designed to support startup growth and
            innovation
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12"
        >
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -6 }}
                className="flex gap-4 p-5 sm:p-6 bg-white rounded-xl border border-border shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                </div>

                <div>
                  <h3 className="mb-1.5 text-primary text-base sm:text-lg">
                    {facility.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="CIED Infrastructure"
            className="w-full h-64 sm:h-80 object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

