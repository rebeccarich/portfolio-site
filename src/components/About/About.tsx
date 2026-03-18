import { Section } from "../Section/Section";
import * as resume from "../../data/resume";
import styles from "./About.module.css";

export function About() {
  return (
    <Section id="about">
      <h2 className={styles.heading}>About</h2>
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
    </Section>
  );
}
