import { Card, CardContent } from "../ui/card";
import { Eye, Target } from "lucide-react";
import { motion } from "framer-motion";

// Motion variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function VisionMission() {
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
            Vision & Mission
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Guiding principles that drive our commitment to innovation and
            entrepreneurship
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {/* Vision */}
          <motion.div variants={item} whileHover={{ y: -6 }}>
            <Card className="h-full border-2 border-border hover:border-primary/30 transition-all">
              <CardContent className="p-6 sm:p-8">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -3 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-5 sm:mb-6"
                >
                  <Eye className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-primary">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  To be a leading catalyst for innovation and entrepreneurship
                  in Jammu & Kashmir, transforming the region into a vibrant
                  startup ecosystem that competes nationally and globally. We
                  envision CIED as the premier destination for aspiring
                  entrepreneurs seeking to build scalable, sustainable, and
                  socially impactful ventures.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission */}
          <motion.div variants={item} whileHover={{ y: -6 }}>
            <Card className="h-full border-2 border-border hover:border-secondary/30 transition-all">
              <CardContent className="p-6 sm:p-8">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-5 sm:mb-6"
                >
                  <Target className="h-7 w-7 sm:h-8 sm:w-8 text-secondary" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-primary">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  To nurture and accelerate startups through comprehensive
                  incubation support, mentorship, infrastructure, and funding
                  opportunities. We are committed to fostering an
                  entrepreneurial culture within academia, bridging the gap
                  between research and commercialization, and creating
                  sustainable economic value for the region.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

