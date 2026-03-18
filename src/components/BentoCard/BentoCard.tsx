import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./BentoCard.module.css";

interface BentoCardProps {
  children: ReactNode;
  span?: "1" | "2" | "3" | "full";
  className?: string;
  id?: string;
}

export function BentoCard({ children, span = "1", className = "", id }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      id={id}
      ref={ref}
      className={`${styles.card} ${styles[`span${span}`]} ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.spotlight} />
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
