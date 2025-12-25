import { Card, CardContent } from "./ui/card";
import { Instagram, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const updates = [
  {
    platform: "Instagram",
    icon: Instagram,
    image:
      "https://images.unsplash.com/photo-1624555130858-7ea5b8192c49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzY1OTQ3NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    caption:
      "Amazing pitch session with our pre-incubation batch! 🚀 Witnessing innovation at its finest.",
    timestamp: "2 days ago",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    image:
      "https://images.unsplash.com/photo-1590649681928-4b179f773bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2NTk1NTAyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    caption:
      "Proud to announce our partnership with leading industry experts for mentorship programs. Building bridges for success!",
    timestamp: "5 days ago",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    platform: "Twitter",
    icon: Twitter,
    image:
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY1OTUzMjA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    caption:
      "Innovation never stops at CIED! Our incubatees are working round the clock to make their dreams a reality.",
    timestamp: "1 week ago",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    platform: "Instagram",
    icon: Instagram,
    image:
      "https://images.unsplash.com/photo-1706759755789-66d39fd252b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV0d29ya2luZyUyMGV2ZW50fGVufDF8fHx8MTc2NjA0NDc4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    caption:
      "Networking evening with investors and entrepreneurs. Creating connections that matter! 💼",
    timestamp: "1 week ago",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

export function RecentUpdates() {
  return (
    <section id="updates" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-6">
            <span className="text-sm text-accent">Stay Connected</span>
          </div>
          <h2 className="text-4xl sm:text-5xl mb-6 text-primary">
            Recent Updates
          </h2>
          <p className="text-lg text-muted-foreground">
            Latest updates from our official social media channels
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {updates.map((update, index) => {
            const Icon = update.icon;
            return (
              <Card
                key={index}
                className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={update.image}
                    alt={update.platform}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-4 right-4 w-10 h-10 ${update.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <Icon className={`h-5 w-5 ${update.color}`} />
                  </div>
                </div>

                <CardContent className="p-4">
                  <p className="text-sm text-foreground mb-3 line-clamp-3">
                    {update.caption}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{update.timestamp}</span>
                    <ExternalLink className="h-4 w-4 group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Follow us for more updates
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
