import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Section.module.css";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      id={id}
      ref={ref}
      className={`${styles.section} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
