import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TypewriterText } from "./TypeWriterText";

const words = ["Partners", "Collaborators", "Supporters"];

export function RotatingTypewriterHeading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <h3 className="text-3xl text-primary flex items-center justify-center gap-2 text-center">
      <span>Our</span>

      <AnimatePresence mode="wait">
        <motion.span
          className="min-w-[180px] text-left"
          key={words[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TypewriterText text={words[index]} />
        </motion.span>
      </AnimatePresence>
    </h3>
  );
}
