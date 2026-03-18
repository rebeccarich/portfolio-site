import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as cv from '../../data/cv'
import { EnvelopeIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from '../Icons/Icons'
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
      <p className={styles.bio}>{cv.bio}</p>
      <div className={styles.details}>
        <a href={`mailto:${cv.email}`} className={styles.iconLink} aria-label="Email">
          <EnvelopeIcon size={18} />
        </a>
        <a
          href={cv.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="GitHub"
        >
          <GitHubIcon size={18} />
        </a>
        <a
          href={cv.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="LinkedIn"
        >
          <LinkedInIcon size={18} />
        </a>
        <a href="/rebecca-richards-cv.pdf" download className={styles.iconLink} aria-label="Download CV">
          <DownloadIcon size={18} />
        </a>
      </div>
    </motion.section>
  )
}
