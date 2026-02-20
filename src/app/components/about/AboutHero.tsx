import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/5 via-white to-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* -------- TEXT CONTENT -------- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="max-w-4xl mx-auto text-center mb-10 sm:mb-12"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: "easeOut" as const },
              },
            }}
            className="text-3xl sm:text-4xl lg:text-6xl mb-4 sm:mb-6 text-primary"
          >
            About CIED – IUST
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" as const },
              },
            }}
            className="text-base sm:text-lg lg:text-2xl text-muted-foreground leading-relaxed px-2 sm:px-0"
          >
            Fostering innovation and entrepreneurship within the academic
            ecosystem
          </motion.p>
        </motion.div>

        {/* -------- IMAGE -------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="relative w-full max-w-5xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1765133469414-02f4e445df19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjcwODU2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="CIED IUST Campus"
            className="w-full h-56 sm:h-80 lg:h-96 object-cover"
          />

          {/* Subtle overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

