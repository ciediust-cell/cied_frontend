import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function LocationMap() {
  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-8 sm:mb-10"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" as const }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl mb-4 mx-auto"
            >
              <MapPin className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" as const }}
              className="text-2xl sm:text-3xl lg:text-4xl text-primary mb-3"
            >
              Find Us Here
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" as const }}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground"
            >
              Visit our incubation centre at IUST Campus, Awantipora
            </motion.p>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            whileHover={{ scale: 1.01 }}
            className="rounded-2xl overflow-hidden border-4 border-border shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.251411289323!2d75.01606827447674!3d33.90892842528634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e21f0042cf11a1%3A0x52896b4f2441d085!2sCIED-IUST%20Foundation!5e0!3m2!1sen!2sin!4v1767550406712!5m2!1sen!2sin"
              className="w-full h-[260px] sm:h-[360px] lg:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CIED IUST Location"
            />
          </motion.div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-xs sm:text-sm text-muted-foreground mt-5 sm:mt-6"
          >
            Innovation Hub, IUST, Awantipora, Pulwama, Jammu & Kashmir 192122
          </motion.p>
        </div>
      </div>
    </section>
  );
}

