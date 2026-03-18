import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as resume from '../../data/resume'
import { EnvelopeIcon, GitHubIcon, LinkedInIcon } from '../Icons/Icons'
import styles from './About.module.css'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.section
      id="about"
      ref={ref}
      className={styles.about}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <p className={styles.bio}>{resume.bio}</p>
      <div className={styles.details}>
        <a href={`mailto:${resume.email}`} className={styles.pill}>
          <EnvelopeIcon size={14} />
          {resume.email}
        </a>
        <a
          href={resume.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="GitHub"
        >
          <GitHubIcon size={18} />
        </a>
        <a
          href={resume.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="LinkedIn"
        >
          <LinkedInIcon size={18} />
        </a>
      </div>
    </motion.section>
  )
}
