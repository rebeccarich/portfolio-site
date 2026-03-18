import { Section } from '../Section/Section'
import * as resume from '../../data/resume'
import { ArrowRightIcon, GitHubIcon, LinkedInIcon } from '../Icons/Icons'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <Section id="contact">
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Let's build something together</h2>
        <p className={styles.subtext}>
          Always interested in hearing about new opportunities, interesting projects, or just a good
          chat about frontend engineering.
        </p>
        <div className={styles.links}>
          <a href={`mailto:${resume.email}`} className={styles.cta}>
            Say hello
            <ArrowRightIcon size={16} />
          </a>
          <a
            href={resume.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="GitHub"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href={resume.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={20} />
          </a>
        </div>
      </div>
    </Section>
  )
}
