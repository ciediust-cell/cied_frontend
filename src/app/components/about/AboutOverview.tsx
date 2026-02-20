import { motion } from "framer-motion";

export function AboutOverview() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* -------- LEFT: TEXT CONTENT -------- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="space-y-5 sm:space-y-6"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" as const },
                },
              }}
              className="text-2xl sm:text-3xl lg:text-4xl text-primary"
            >
              What is CIED?
            </motion.h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              {[
                `The Centre for Innovation, Entrepreneurship, and Development (CIED) is the dedicated
                incubation and innovation center at the Islamic University of Science and Technology (IUST).
                We serve as a dynamic bridge between academic excellence and entrepreneurial success.`,

                `CIED provides comprehensive support to aspiring entrepreneurs, startups, and innovators
                from across Kashmir and beyond. Our mission is to transform groundbreaking ideas into
                sustainable, scalable ventures that create meaningful impact.`,

                `Through our structured programs, mentorship networks, and state-of-the-art facilities,
                we empower students, researchers, and early-stage entrepreneurs to navigate the challenges
                of building successful startups. We foster an ecosystem where innovation thrives,
                collaboration flourishes, and ventures grow.`,

                `As part of a leading academic institution, CIED leverages the research capabilities,
                technical expertise, and knowledge resources of IUST to provide unparalleled support
                to our incubatees.`,
              ].map((text, index) => (
                <motion.p
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut" as const,
                        delay: index * 0.05,
                      },
                    },
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* -------- RIGHT: IMAGE -------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="relative"
          >
            <motion.div
              initial={{ scale: 0.96 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              viewport={{ once: true }}
              className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjY5NzQ4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Innovation and Collaboration"
                className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
              />
            </motion.div>

            {/* -------- DECORATIVE ELEMENTS -------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-32 sm:w-48 h-32 sm:h-48 bg-secondary/10 rounded-2xl -z-10"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-24 sm:w-32 h-24 sm:h-32 bg-accent/10 rounded-2xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

