import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/5 via-white to-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl mb-5 sm:mb-6 mx-auto"
          >
            <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-6xl mb-4 sm:mb-6 text-primary leading-tight"
          >
            Contact CIED
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
            className="text-base sm:text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-2 sm:px-0"
          >
            We would love to hear from you. Reach out for partnerships,
            incubation, events, or general inquiries.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
