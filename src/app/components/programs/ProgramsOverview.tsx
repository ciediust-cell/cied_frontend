import { motion } from "framer-motion";

export function ProgramsOverview() {
  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="space-y-5 sm:space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-2xl sm:text-3xl lg:text-4xl text-primary leading-tight"
            >
              Our Incubation Approach
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.12 }}
              className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed"
            >
              {[
                "At CIED, we understand that every startup is unique and requires tailored support at different stages of growth. Our comprehensive programs are designed to provide the right resources, mentorship, and infrastructure at the right time.",
                "From ideation to scale-up, our structured approach ensures that entrepreneurs receive continuous guidance, access to industry experts, funding opportunities, and a collaborative ecosystem that accelerates growth and sustainability.",
                "Whether you're a student with a groundbreaking idea, a researcher looking to commercialize innovation, or an early-stage startup seeking acceleration, CIED has a program tailored for you.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: "easeOut" as const }}
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="relative mt-8 lg:mt-0"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1761933799610-c9a75f115794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Mentorship and Coaching"
                className="w-full h-[260px] sm:h-[340px] lg:h-full object-cover"
              />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-40 sm:w-48 h-40 sm:h-48 bg-accent/10 rounded-2xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-28 sm:w-32 h-28 sm:h-32 bg-secondary/10 rounded-2xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

