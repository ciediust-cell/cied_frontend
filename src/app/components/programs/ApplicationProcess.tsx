import { FileText, ClipboardCheck, Users, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: FileText,
    title: "Apply Online",
    description:
      "Complete the online application form with your startup details, team information, and business plan.",
  },
  {
    icon: ClipboardCheck,
    title: "Screening & Evaluation",
    description:
      "Our team reviews applications based on innovation, market potential, team capability, and alignment with CIED goals.",
  },
  {
    icon: Users,
    title: "Pitch & Interview",
    description:
      "Shortlisted applicants present their ideas to our evaluation committee and participate in Q&A sessions.",
  },
  {
    icon: UserCheck,
    title: "Onboarding & Mentorship",
    description:
      "Selected startups complete onboarding formalities and begin their journey with dedicated mentor support.",
  },
];

/* Animation Variants */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ApplicationProcess() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            Application Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, transparent process to join CIED's incubation programs
          </p>
        </motion.div>

        {/* Desktop: Horizontal Flow */}
        <div className="hidden lg:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Connection Line */}
            <div
              className="absolute top-16 left-0 right-0 h-0.5 bg-border"
              style={{ left: "12.5%", right: "12.5%" }}
            />

            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    {/* Icon */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 border-4 border-white rounded-2xl flex items-center justify-center mb-4 relative z-10">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="absolute top-0 right-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm z-20">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl mb-3 text-primary">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Mobile / Tablet: Vertical Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:hidden space-y-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-border -mb-6" />
                )}

                <div className="flex gap-5 sm:gap-6">
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary/10 border-4 border-white rounded-2xl flex items-center justify-center relative z-10">
                      <Icon className="h-6 sm:h-7 w-6 sm:w-7 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 sm:w-8 h-7 sm:h-8 bg-secondary text-white rounded-full flex items-center justify-center text-xs sm:text-sm z-20">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg sm:text-xl mb-1 text-primary">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10"
        >
          <p className="text-center text-sm sm:text-base text-muted-foreground">
            <span className="text-primary font-medium">Timeline:</span> The
            entire application and selection process typically takes 4–6 weeks
            from submission to final decision. Applications are reviewed on a
            rolling basis.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
