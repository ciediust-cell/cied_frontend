// components/TypewriterText.tsx
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

export function TypewriterText({ text, delay = 0 }: TypewriterTextProps) {
  const letters = Array.from(text);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
      className="inline-block"
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
