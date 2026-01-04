import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Sparkles,
  Rocket,
  Users,
  DollarSign,
  Zap,
  TrendingUp,
  ArrowRight,
  X,
  Clock,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Program {
  id: string;
  icon: typeof Sparkles;
  title: string;
  shortDescription: string;
  duration: string;
  eligibility: string;
  benefits: string[];
  fullDescription: string;
  applicationProcess: string[];
  keyHighlights: string[];
}

const programs: Program[] = [
  {
    id: "pre-incubation",
    icon: Sparkles,
    title: "Pre-Incubation Program",
    shortDescription:
      "For aspiring entrepreneurs at the ideation stage who need validation and early-stage support.",
    duration: "3-6 months",
    eligibility: "Students, Researchers, Early Ideators",
    benefits: [
      "Idea Validation",
      "Market Research Support",
      "Prototype Development",
      "Mentorship Sessions",
    ],
    fullDescription:
      "The Pre-Incubation Program is designed for entrepreneurs who are at the ideation stage. This program helps validate your business idea, develop a minimum viable product (MVP), and prepare for full incubation. You'll receive guidance on market research, business model development, and early-stage funding options.",
    applicationProcess: [
      "Submit your idea through our online application portal",
      "Initial screening and shortlisting",
      "Pitch your idea to our evaluation panel",
      "Receive feedback and onboarding (if selected)",
    ],
    keyHighlights: [
      "Weekly mentorship sessions with industry experts",
      "Access to co-working space and facilities",
      "Networking opportunities with fellow entrepreneurs",
      "Support in developing pitch decks and business plans",
    ],
  },
  {
    id: "startup-incubation",
    icon: Rocket,
    title: "Startup Incubation",
    shortDescription:
      "Comprehensive support for early-stage startups with a validated business model.",
    duration: "12-18 months",
    eligibility: "Registered Startups, Growth-stage ventures",
    benefits: [
      "Funding Support",
      "Infrastructure Access",
      "Legal & Compliance",
      "Market Connections",
    ],
    fullDescription:
      "Our flagship Startup Incubation Program provides end-to-end support for early-stage startups. This includes dedicated workspace, access to funding opportunities, legal and compliance assistance, marketing support, and connections to potential customers and partners. Incubated startups benefit from our extensive network of mentors, investors, and industry experts.",
    applicationProcess: [
      "Complete detailed application form with business plan",
      "Document verification and background check",
      "Presentation to incubation committee",
      "Agreement signing and onboarding",
    ],
    keyHighlights: [
      "Seed funding opportunities up to ₹25 lakhs",
      "Dedicated workspace with high-speed internet",
      "One-on-one mentorship from successful entrepreneurs",
      "Access to legal, accounting, and HR support services",
    ],
  },
  {
    id: "mentorship-advisory",
    icon: Users,
    title: "Mentorship & Advisory",
    shortDescription:
      "Connect with experienced mentors and industry experts for strategic guidance.",
    duration: "Ongoing",
    eligibility: "All incubated startups",
    benefits: [
      "Expert Guidance",
      "Strategic Planning",
      "Industry Insights",
      "Network Building",
    ],
    fullDescription:
      "Our Mentorship & Advisory program connects you with seasoned entrepreneurs, industry veterans, and domain experts who provide strategic guidance on business development, technology, marketing, fundraising, and scaling operations. Mentors offer regular one-on-one sessions, group workshops, and ad-hoc support as needed.",
    applicationProcess: [
      "Enroll in incubation program",
      "Complete mentor matching questionnaire",
      "Meet potential mentors during orientation",
      "Begin regular mentorship sessions",
    ],
    keyHighlights: [
      "Personalized mentor matching based on startup needs",
      "Monthly one-on-one sessions with assigned mentors",
      "Quarterly group sessions with multiple experts",
      "Access to mentor network for introductions and references",
    ],
  },
  {
    id: "funding-support",
    icon: DollarSign,
    title: "Funding Support",
    shortDescription:
      "Assistance in securing seed funding, grants, and connections to investor networks.",
    duration: "As needed",
    eligibility: "Incubated startups with validated models",
    benefits: [
      "Seed Grants",
      "Investor Connect",
      "Pitch Training",
      "Due Diligence Support",
    ],
    fullDescription:
      "CIED facilitates access to various funding sources including government grants, angel investors, venture capital firms, and our own seed fund. We help startups prepare investor-ready pitch decks, financial models, and due diligence documents. Our team also organizes regular investor connect events and demo days.",
    applicationProcess: [
      "Express interest through program manager",
      "Complete funding readiness assessment",
      "Attend pitch preparation workshops",
      "Present at investor connect events",
    ],
    keyHighlights: [
      "Direct seed grants from CIED fund",
      "Connections to 50+ angel investors and VCs",
      "Pitch deck and financial modeling support",
      "Demo day participation opportunities",
    ],
  },
  {
    id: "accelerator",
    icon: Zap,
    title: "Accelerator Program",
    shortDescription:
      "Intensive 3-month program for startups ready to scale rapidly.",
    duration: "3 months",
    eligibility: "Growth-stage startups with traction",
    benefits: [
      "Intensive Mentoring",
      "Market Access",
      "Scaling Strategy",
      "Investor Readiness",
    ],
    fullDescription:
      "Our Accelerator Program is a highly competitive, intensive 3-month program designed for startups that have achieved product-market fit and are ready to scale. The program includes intensive mentorship, workshops on scaling operations, market expansion strategies, and culminates in a Demo Day where startups pitch to leading investors.",
    applicationProcess: [
      "Apply through competitive selection process",
      "Submit growth metrics and traction data",
      "Attend selection interview and presentation",
      "Commit to full-time participation if accepted",
    ],
    keyHighlights: [
      "Equity investment up to ₹50 lakhs",
      "Intensive 12-week curriculum",
      "Weekly sessions with top-tier mentors",
      "Demo Day with 100+ investors",
    ],
  },
  {
    id: "sector-specific",
    icon: TrendingUp,
    title: "Sector-Specific Programs",
    shortDescription:
      "Specialized programs for startups in technology, healthcare, agriculture, and social impact.",
    duration: "Varies by sector",
    eligibility: "Sector-specific startups",
    benefits: [
      "Domain Expertise",
      "Industry Connections",
      "Specialized Resources",
      "Regulatory Support",
    ],
    fullDescription:
      "CIED runs specialized programs targeting specific sectors such as HealthTech, AgriTech, EdTech, and Social Enterprise. These programs provide sector-specific mentorship, regulatory guidance, access to industry partners, and connections to sector-focused investors. Each program is designed in collaboration with industry experts to address unique sector challenges.",
    applicationProcess: [
      "Check for active sector-specific program calls",
      "Submit application highlighting sector relevance",
      "Domain expert evaluation and selection",
      "Participate in sector-specific cohort activities",
    ],
    keyHighlights: [
      "Access to sector-specific mentors and advisors",
      "Connections to industry partners and pilot customers",
      "Regulatory and compliance guidance",
      "Sector-focused investor introductions",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function ProgramsGrid() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <>
      <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl text-primary mb-4">
              Our Programs
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the program that best fits your startup’s current stage and
              needs
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.id}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border-2 hover:border-primary/30 hover:shadow-lg transition-all h-full">
                    <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                      <motion.div
                        className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Icon className="h-7 w-7 text-primary" />
                      </motion.div>

                      <h3 className="text-lg sm:text-xl mb-3 text-primary">
                        {program.title}
                      </h3>

                      <p className="text-sm sm:text-base text-muted-foreground mb-4 flex-grow">
                        {program.shortDescription}
                      </p>

                      <div className="space-y-2 mb-5 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-secondary" />
                          <span>
                            <strong>Duration:</strong> {program.duration}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-accent mt-0.5" />
                          <span>
                            <strong>Eligibility:</strong> {program.eligibility}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedProgram(program)}
                        className="mt-auto flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-3xl rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-start">
                <div>
                  <h3 className="text-xl sm:text-2xl text-primary mb-1">
                    {selectedProgram.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedProgram.shortDescription}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-6">
                <div>
                  <h4 className="text-primary mb-2">Program Overview</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {selectedProgram.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-primary mb-2">Key Highlights</h4>
                  <ul className="space-y-2">
                    {selectedProgram.keyHighlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-primary mb-2">Application Process</h4>
                  <div className="space-y-2">
                    {selectedProgram.applicationProcess.map((s, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs">
                          {i + 1}
                        </div>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-lg">
                  Apply for This Program
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
