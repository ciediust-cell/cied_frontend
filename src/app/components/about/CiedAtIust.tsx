import { motion } from "framer-motion";
import { Building2, BookOpen, FlaskConical, Network } from "lucide-react";

const highlights = [
  {
    icon: Building2,
    title: "Institutional Support",
    description:
      "Backed by IUST's strong academic foundation and administrative resources",
  },
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description:
      "Access to world-class faculty, research facilities, and knowledge repositories",
  },
  {
    icon: FlaskConical,
    title: "Research Integration",
    description:
      "Seamless connection between cutting-edge research and commercial applications",
  },
  {
    icon: Network,
    title: "Regional Impact",
    description:
      "Contributing to economic development and job creation in Jammu & Kashmir",
  },
];

export function CIEDAtIUST() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* -------- LEFT: IMAGE -------- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ scale: 0.96 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/ciediust-cell/cied_images/CIED_COMPRESSED/IUst.webp"
                alt="IUST Campus"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </motion.div>
          </motion.div>

          {/* -------- RIGHT: CONTENT -------- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="order-1 lg:order-2 space-y-6 sm:space-y-8"
          >
            {/* Heading & Intro */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" as const },
                },
              }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary mb-3 sm:mb-4">
                CIED at IUST
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                As an integral part of the Islamic University of Science and
                Technology, CIED benefits from the university&apos;s strong
                academic ecosystem, research capabilities, and institutional
                credibility. This unique positioning enables us to offer
                startups a comprehensive support system that few standalone
                incubators can match.
              </p>
            </motion.div>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
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
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-lg flex items-center justify-center"
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="mb-1 sm:mb-2 text-sm sm:text-base text-primary">
                        {highlight.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Text */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" as const },
                },
              }}
              className="pt-4 border-t border-border"
            >
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                IUST, established in 2005, has emerged as a premier institution
                in the region, known for its excellence in science, technology,
                and research. CIED extends this legacy by transforming academic
                knowledge into entrepreneurial ventures that create real-world
                impact.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
