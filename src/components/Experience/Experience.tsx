import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as resume from '../../data/resume'
import styles from './Experience.module.css'

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeJob = resume.experience[activeIndex]

  return (
    <section id="experience" className={styles.wrapper}>
      <h2 className={styles.heading}>Experience</h2>

      {/* Horizontal timeline */}
      <div className={styles.timeline}>
        <div className={styles.line} />
        <div className={styles.entries}>
          {resume.experience.map((job, i) => (
            <button
              key={i}
              className={`${styles.entry} ${i === activeIndex ? styles.active : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <div className={styles.dot} />
              <span className={styles.year}>
                {job.period.split('–')[0].trim().split(' ').pop()}
              </span>
              <span className={styles.company}>{job.company.split('/')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className={styles.detail}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.detailHeader}>
            <div>
              <h3 className={styles.title}>{activeJob.title}</h3>
              <p className={styles.detailCompany}>{activeJob.company}</p>
            </div>
            <span className={styles.period}>{activeJob.period}</span>
          </div>
          {activeJob.description && <p className={styles.description}>{activeJob.description}</p>}
          {activeJob.bullets.length > 0 && (
            <ul className={styles.bullets}>
              {activeJob.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
