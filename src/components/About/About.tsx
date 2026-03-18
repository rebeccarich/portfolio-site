import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as resume from "../../data/resume";
import styles from "./About.module.css";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      id="about"
      ref={ref}
      className={styles.about}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className={styles.bio}>{resume.bio}</p>
      <div className={styles.details}>
        <a href={`mailto:${resume.email}`} className={styles.pill}>
          {resume.email}
        </a>
        <span className={styles.pill}>{resume.location}</span>
        <a href={resume.github} target="_blank" rel="noopener noreferrer" className={styles.pill}>
          GitHub
        </a>
        <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className={styles.pill}>
          LinkedIn
        </a>
      </div>
    </motion.section>
  );
}
