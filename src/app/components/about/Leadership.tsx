import { Card, CardContent } from "../ui/card";
import { Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

interface LeaderProfile {
  name: string;
  designation: string;
  department?: string;
  image: string;
  email?: string;
}

const leaders: LeaderProfile[] = [
  {
    name: "Prof. Mohammad Ashraf Shah",
    designation: "Director, CIED",
    department: "Department of Computer Science",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    email: "director.cied@iust.ac.in",
  },
  {
    name: "Dr. Syed Mudasir Ahmad",
    designation: "Program Manager",
    department: "Incubation & Acceleration",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    email: "program.cied@iust.ac.in",
  },
  {
    name: "Dr. Aasim Zafar",
    designation: "Innovation Coordinator",
    department: "Research & Development",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    email: "innovation.cied@iust.ac.in",
  },
  {
    name: "Ms. Rukhsana Akhter",
    designation: "Startup Mentor",
    department: "Business Development",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    email: "mentor.cied@iust.ac.in",
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

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Leadership() {
  return (
    <section className="py-14 sm:py-20 bg-white">
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
            Leadership & Governance
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Experienced professionals dedicated to nurturing the next generation
            of entrepreneurs
          </p>
        </motion.div>

        {/* Leaders Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {leaders.map((leader, index) => (
            <motion.div key={index} variants={card} whileHover={{ y: -6 }}>
              <Card className="border border-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow h-full">
                <div className="aspect-square overflow-hidden bg-muted">
                  <motion.img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <CardContent className="p-5 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl mb-1 text-primary">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-secondary mb-1">
                    {leader.designation}
                  </p>

                  {leader.department && (
                    <p className="text-xs text-muted-foreground mb-4">
                      {leader.department}
                    </p>
                  )}

                  {leader.email && (
                    <div className="flex justify-center gap-3 pt-4 border-t border-border">
                      <a
                        href={`mailto:${leader.email}`}
                        className="w-9 h-9 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <button
                        className="w-9 h-9 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Advisory Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-14 p-5 sm:p-6 bg-primary/5 rounded-xl border border-primary/10"
        >
          <p className="text-center text-sm sm:text-base text-muted-foreground">
            <span className="text-primary font-medium">Note:</span> CIED
            operates under the guidance of an Advisory Board comprising
            distinguished academicians, successful entrepreneurs, industry
            leaders, and government representatives who provide strategic
            direction and mentorship to our incubated startups.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

