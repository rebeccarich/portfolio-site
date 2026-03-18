import { Section } from "../Section/Section";
import * as resume from "../../data/resume";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <>
      {resume.projects.map((project) => (
        <Section key={project.name}>
          <h3 className={styles.name}>
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name} <span className={styles.arrow}>&#8599;</span>
              </a>
            ) : (
              project.name
            )}
          </h3>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.tags}>
            {project.tech.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
