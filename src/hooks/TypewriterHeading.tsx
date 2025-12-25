// components/TypewriterHeading.tsx
import { motion } from "framer-motion";

interface TypewriterHeadingProps {
  text: string;
  highlight?: string;
}

export function TypewriterHeading({ text, highlight }: TypewriterHeadingProps) {
  const letters = Array.from(text);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
        hidden: {},
      }}
    >
      {letters.map((char, index) => {
        const isHighlight =
          highlight && text.slice(index).startsWith(highlight);

        if (isHighlight) {
          return (
            <motion.span
              key={index}
              className="text-secondary"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              {highlight}
            </motion.span>
          );
        }

        if (
          highlight &&
          index > text.indexOf(highlight) &&
          index < text.indexOf(highlight) + highlight.length
        ) {
          return null;
        }

        return (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
