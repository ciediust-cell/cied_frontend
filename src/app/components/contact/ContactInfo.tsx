import { Card, CardContent } from "../ui/card";
import { MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

interface ContactCard {
  title: string;
  icon: React.ReactNode;
  content: string[];
  link?: string;
  linkType?: "email" | "tel" | "map";
}

const contactInfo: ContactCard[] = [
  {
    title: "Address",
    icon: <MapPin className="h-6 w-6" />,
    content: [
      "CIED Incubation Centre",
      "Islamic University of Science & Technology",
      "Awantipora, Pulwama",
      "Jammu & Kashmir 192122",
    ],
    link: "https://maps.google.com/?q=IUST+Awantipora",
    linkType: "map",
  },
  {
    title: "Email",
    icon: <Mail className="h-6 w-6" />,
    content: [
      "cied@iust.ac.in",
      "incubation@iust.ac.in",
      "info.cied@iust.ac.in",
    ],
    link: "mailto:cied@iust.ac.in",
    linkType: "email",
  },
  {
    title: "Phone",
    icon: <Phone className="h-6 w-6" />,
    content: [
      "+91 1933 247955",
      "+91 1933 247956",
      "Mon to Fri, 9:00 AM to 5:00 PM",
    ],
    link: "tel:+911933247955",
    linkType: "tel",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export function ContactInfo() {
  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260 }}
            >
              <Card className="border-2 border-border hover:border-primary/30 transition-all h-full">
                <CardContent className="p-5 sm:p-6 text-center flex flex-col h-full">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl mb-4 text-primary mx-auto"
                  >
                    {info.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl mb-3 text-primary">
                    {info.title}
                  </h3>

                  {/* Content */}
                  <div className="space-y-2 text-sm sm:text-base flex-grow">
                    {info.content.map((line, lineIndex) => (
                      <p
                        key={lineIndex}
                        className={`text-muted-foreground ${
                          lineIndex === info.content.length - 1 &&
                          info.linkType === "tel"
                            ? "text-xs sm:text-sm mt-4 pt-4 border-t border-border"
                            : ""
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Link */}
                  {info.link && (
                    <a
                      href={info.link}
                      target={info.linkType === "map" ? "_blank" : undefined}
                      rel={
                        info.linkType === "map"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-block mt-5 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                    >
                      {info.linkType === "email" && "Send Email"}
                      {info.linkType === "tel" && "Call Us"}
                      {info.linkType === "map" && "Get Directions"}
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

