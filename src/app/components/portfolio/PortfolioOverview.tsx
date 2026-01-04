import { motion } from "framer-motion";

export function PortfolioOverview() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
          >
            CIED IUST has nurtured a diverse ecosystem of innovative startups
            across multiple sectors including technology, healthcare,
            agriculture, education, and social impact. Our incubated ventures
            are led by passionate entrepreneurs committed to solving real-world
            problems through innovation and sustainable business models.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.45 }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
          >
            From early-stage ideation to growth and scale-up, these startups
            represent the cutting edge of entrepreneurial excellence in Jammu &
            Kashmir and beyond.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
