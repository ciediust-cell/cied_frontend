import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    setFormStatus("success");

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setFormStatus("idle");
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-gradient-to-b from-primary/5 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary mb-3">
              Send Us a Message
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              Fill out the form below and we’ll get back to you as soon as
              possible
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-2 border-border shadow-md">
            <CardContent className="p-5 sm:p-8">
              <motion.form
                onSubmit={handleSubmit}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.08 }}
                className="space-y-6"
              >
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block mb-2 text-sm sm:text-base">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      name="name"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 h-11 sm:h-12 border-2"
                    />
                  </div>
                </motion.div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block mb-2 text-sm sm:text-base">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 h-11 sm:h-12 border-2"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block mb-2 text-sm sm:text-base">
                      Phone Number{" "}
                      <span className="text-muted-foreground text-xs">
                        (Optional)
                      </span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 h-11 sm:h-12 border-2"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block mb-2 text-sm sm:text-base">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-11 sm:h-12 pl-10 pr-4 border-2 rounded-lg bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="incubation">Incubation Inquiry</option>
                      <option value="partnership">
                        Partnership Opportunity
                      </option>
                      <option value="workspace">Workspace Booking</option>
                      <option value="event">Host an Event</option>
                      <option value="mentorship">Mentorship Program</option>
                      <option value="general">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block mb-2 text-sm sm:text-base">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    className="border-2 resize-none"
                  />
                </motion.div>

                {/* Success Message */}
                <AnimatePresence>
                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-accent/10 border-2 border-accent/30 rounded-lg text-accent text-center text-sm"
                    >
                      Thank you for your message. We’ll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-11 sm:h-12 bg-secondary hover:bg-secondary/90 text-white"
                  >
                    Submit Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
