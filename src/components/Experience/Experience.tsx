import { BentoCard } from "../BentoCard/BentoCard";
import * as resume from "../../data/resume";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <BentoCard span="full" id="experience">
      <h2 className={styles.heading}>Experience</h2>
      <div className={styles.timeline}>
        {resume.experience.map((job, i) => (
          <div key={i} className={styles.entry}>
            <div className={styles.dot} />
            <div className={styles.details}>
              <div className={styles.header}>
                <div>
                  <h3 className={styles.title}>{job.title}</h3>
                  <p className={styles.company}>{job.company}</p>
                </div>
                <span className={styles.period}>{job.period}</span>
              </div>
              {job.description && (
                <p className={styles.description}>{job.description}</p>
              )}
              {job.bullets.length > 0 && (
                <ul className={styles.bullets}>
                  {job.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
