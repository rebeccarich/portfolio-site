import { BentoCard } from "../BentoCard/BentoCard";
import * as resume from "../../data/resume";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <BentoCard span="full">
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Let's build something together</h2>
        <p className={styles.subtext}>
          Always interested in hearing about new opportunities, interesting projects,
          or just a good chat about frontend engineering.
        </p>
        <div className={styles.links}>
          <a href={`mailto:${resume.email}`} className={styles.cta}>
            Say hello
          </a>
          <a
            href={resume.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <a
            href={resume.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </BentoCard>
  );
}
