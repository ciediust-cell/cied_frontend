import { useState, useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Search,
  ArrowRight,
  X,
  ExternalLink,
  Award,
  Users,
  Target,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  sector: string;
  stage: "Ideation" | "Early-stage" | "Growth";
  status: "Incubated" | "Graduated";
  founders: string[];
  achievements: string[];
  website?: string;
}

const startups: Startup[] = [
  {
    id: "1",
    name: "AgriTech Solutions",
    tagline: "Empowering farmers with precision agriculture technology",
    description:
      "AgriTech Solutions leverages IoT sensors, AI-driven analytics, and mobile applications to help farmers optimize crop yields, reduce water consumption, and make data-driven farming decisions. Our platform provides real-time soil health monitoring, weather predictions, and crop recommendations tailored to local conditions.",
    logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
    sector: "Agriculture",
    stage: "Early-stage",
    status: "Incubated",
    founders: ["Dr. Ayesha Khan", "Ravi Sharma"],
    achievements: [
      "Deployed across 500+ farms in J&K",
      "Reduced water usage by 30% on average",
      "Recognized by NITI Aayog Innovation Challenge",
      "Secured seed funding of ₹50 lakhs",
    ],
    website: "https://example.com",
  },
  {
    id: "2",
    name: "EduLearn",
    tagline: "Making quality education accessible to every student",
    description:
      "EduLearn is an EdTech platform that provides personalized learning experiences for K-12 students through adaptive AI technology. Our mobile-first approach ensures students in remote areas can access high-quality educational content, live tutoring, and interactive assessments in local languages.",
    logo: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400",
    sector: "EdTech",
    stage: "Growth",
    status: "Graduated",
    founders: ["Sameer Bhat", "Priya Nair"],
    achievements: [
      "50,000+ active students",
      "Partnerships with 100+ schools",
      "Featured in national education initiatives",
      "Series A funding of ₹2 crores",
    ],
    website: "https://example.com",
  },
  {
    id: "3",
    name: "HealthConnect",
    tagline: "Bridging healthcare gaps through telemedicine",
    description:
      "HealthConnect provides accessible and affordable healthcare through telemedicine services connecting patients in rural and remote areas with qualified doctors. Our platform includes video consultations, e-prescriptions, medicine delivery, and health record management.",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
    sector: "HealthTech",
    stage: "Early-stage",
    status: "Incubated",
    founders: ["Dr. Farhan Ali", "Meera Reddy"],
    achievements: [
      "10,000+ consultations completed",
      "Network of 200+ doctors",
      "Coverage across 5 districts in J&K",
      "Partnership with state health department",
    ],
  },
  {
    id: "4",
    name: "EcoWaste",
    tagline: "Transforming waste into valuable resources",
    description:
      "EcoWaste is a circular economy startup focused on waste management and recycling. We collect, segregate, and process waste materials to create value-added products while promoting environmental sustainability and providing livelihood opportunities to waste collectors.",
    logo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
    sector: "Social Impact",
    stage: "Early-stage",
    status: "Incubated",
    founders: ["Anil Kumar", "Zainab Sheikh"],
    achievements: [
      "Processing 5 tons of waste daily",
      "Employed 50+ waste collectors",
      "Diverted 80% waste from landfills",
      "Won Clean India Startup Award",
    ],
    website: "https://example.com",
  },
  {
    id: "5",
    name: "TechCraft",
    tagline: "Custom software solutions for local businesses",
    description:
      "TechCraft specializes in developing affordable and scalable software solutions tailored for small and medium enterprises. From inventory management to customer relationship systems, we help local businesses digitize operations and improve efficiency.",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    sector: "Technology",
    stage: "Growth",
    status: "Graduated",
    founders: ["Rohit Verma", "Sana Wani"],
    achievements: [
      "100+ enterprise clients",
      "Developed 200+ custom applications",
      "Expanded to 3 states",
      "Revenue of ₹1.5 crores annually",
    ],
    website: "https://example.com",
  },
  {
    id: "6",
    name: "CraftKashmir",
    tagline: "Bringing traditional crafts to global markets",
    description:
      "CraftKashmir is an e-commerce platform connecting traditional artisans from Kashmir with global customers. We provide a fair-trade marketplace for handmade crafts including Pashmina shawls, carpets, and woodwork while ensuring artisans receive fair compensation.",
    logo: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400",
    sector: "E-commerce",
    stage: "Early-stage",
    status: "Incubated",
    founders: ["Shabir Ahmad", "Nazia Khan"],
    achievements: [
      "Onboarded 200+ artisans",
      "Shipped to 15+ countries",
      "Monthly revenue growth of 40%",
      "Featured in Startup India showcase",
    ],
    website: "https://example.com",
  },
  {
    id: "7",
    name: "CleanEnergy Solutions",
    tagline: "Renewable energy for sustainable future",
    description:
      "CleanEnergy Solutions designs and installs solar power systems for homes, businesses, and public institutions. We make renewable energy accessible and affordable while contributing to environmental sustainability and energy independence.",
    logo: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
    sector: "Technology",
    stage: "Growth",
    status: "Incubated",
    founders: ["Imran Hassan", "Kavita Singh"],
    achievements: [
      "Installed 500+ solar systems",
      "Generated 2 MW clean energy",
      "Reduced 1,000 tons of CO2 emissions",
      "Government empaneled vendor",
    ],
    website: "https://example.com",
  },
  {
    id: "8",
    name: "FoodChain",
    tagline: "Farm-to-table direct delivery platform",
    description:
      "FoodChain connects farmers directly with consumers through a mobile app, eliminating middlemen and ensuring fair prices for farmers while providing fresh produce to customers. Our logistics network ensures same-day delivery of farm-fresh products.",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    sector: "Agriculture",
    stage: "Early-stage",
    status: "Incubated",
    founders: ["Arjun Malik", "Fatima Begum"],
    achievements: [
      "5,000+ active customers",
      "Partnership with 300+ farmers",
      "Operating in 3 cities",
      "Monthly orders exceeding 10,000",
    ],
  },
  {
    id: "9",
    name: "SkillUp",
    tagline: "Professional skill development for youth",
    description:
      "SkillUp offers industry-relevant training programs in technology, digital marketing, soft skills, and entrepreneurship. We bridge the gap between education and employment by providing hands-on training and placement assistance.",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
    sector: "EdTech",
    stage: "Ideation",
    status: "Incubated",
    founders: ["Neha Sharma", "Tariq Ahmed"],
    achievements: [
      "Trained 2,000+ students",
      "70% placement rate",
      "Partnerships with 20+ companies",
      "Expanded to 2 new cities",
    ],
    website: "https://example.com",
  },
];

const sectors = [
  "All",
  "Technology",
  "Agriculture",
  "HealthTech",
  "EdTech",
  "E-commerce",
  "Social Impact",
];
const stages = ["All", "Ideation", "Early-stage", "Growth"];

/* ---------- Motion Variants ---------- */
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function StartupGrid() {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStartups = useMemo(() => {
    return startups.filter((startup) => {
      const matchesSector =
        selectedSector === "All" || startup.sector === selectedSector;
      const matchesStage =
        selectedStage === "All" || startup.stage === selectedStage;
      const matchesSearch =
        startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSector && matchesStage && matchesSearch;
    });
  }, [selectedSector, selectedStage, searchQuery]);

  return (
    <>
      <section className="py-14 sm:py-18 lg:py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search startups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:border-primary outline-none transition"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-5 mb-10">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Filter by Sector
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {sectors.map((sector) => (
                  <motion.button
                    key={sector}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSector(sector)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedSector === sector
                        ? "bg-primary text-white"
                        : "border-2 hover:border-primary/30"
                    }`}
                  >
                    {sector}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Filter by Stage
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {stages.map((stage) => (
                  <motion.button
                    key={stage}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedStage(stage)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedStage === stage
                        ? "bg-accent text-white"
                        : "border-2 hover:border-accent/30"
                    }`}
                  >
                    {stage}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Count */}
          <p className="text-center text-muted-foreground mb-8">
            Showing{" "}
            <span className="text-primary">{filteredStartups.length}</span>{" "}
            startup{filteredStartups.length !== 1 && "s"}
          </p>

          {/* Grid */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredStartups.map((startup) => (
              <motion.div
                key={startup.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
              >
                <Card className="border-2 hover:border-primary/30 hover:shadow-lg h-full">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="h-40 rounded-xl overflow-hidden mb-4">
                      <motion.img
                        src={startup.logo}
                        alt={startup.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <h3 className="text-lg sm:text-xl text-primary mb-2">
                      {startup.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {startup.tagline}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary">
                        {startup.sector}
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {startup.status}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedStartup(startup)}
                      className="flex items-center gap-2 text-primary mt-auto"
                    >
                      View Profile
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty */}
          {filteredStartups.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No startups found
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedStartup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setSelectedStartup(null)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-4xl rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="relative h-44 bg-primary/10">
                <img
                  src={selectedStartup.logo}
                  alt={selectedStartup.name}
                  className="w-full h-full object-cover opacity-30"
                />
                <button
                  onClick={() => setSelectedStartup(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-white rounded-lg flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl text-primary mb-1">
                    {selectedStartup.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedStartup.tagline}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedStartup.description}
                </p>

                <div>
                  <h4 className="text-primary mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5" /> Founders
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStartup.founders.map((f, i) => (
                      <span key={i} className="px-4 py-2 bg-muted rounded-lg">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-primary mb-2 flex items-center gap-2">
                    <Award className="h-5 w-5" /> Achievements
                  </h4>
                  <ul className="space-y-2">
                    {selectedStartup.achievements.map((a, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-accent">✓</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedStartup.website && (
                  <a
                    href={selectedStartup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
