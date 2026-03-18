import { Section } from '../Section/Section'
import * as resume from '../../data/resume'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <>
      {resume.projects.map((project) => (
        <Section key={project.name}>
          {project.image && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageLink}
            >
              <img src={project.image} alt={project.name} className={styles.image} />
            </a>
          )}
          <div className={styles.body}>
            <h3 className={styles.name}>
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                  <svg
                    className={styles.arrow}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
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
          </div>
        </Section>
      ))}
    </>
  )
}
