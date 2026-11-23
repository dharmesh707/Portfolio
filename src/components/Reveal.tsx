import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export default function Reveal({ children, delay = 0, y = 32 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0.3, 1, 1, 0.3],
  );

  return (
    <motion.div ref={ref} style={{ opacity }}>
      <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
