import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as resume from '../../data/resume'
import styles from './Experience.module.css'

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="experience" className={styles.wrapper}>
      <h2 className={styles.heading}>Experience</h2>

      <div className={styles.grid}>
        {/* Timeline nav — left column */}
        <div className={styles.nav}>
          {resume.experience.map((job, i) => (
            <button
              key={i}
              className={`${styles.entry} ${i === activeIndex ? styles.active : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <div className={styles.indicator}>
                <div className={styles.dot} />
                {i < resume.experience.length - 1 && <div className={styles.connector} />}
              </div>
              <div className={styles.entryContent}>
                <span className={styles.period}>{job.period.split('–')[0].trim()}</span>
                <span className={styles.entryTitle}>{job.title}</span>
                <span className={styles.entryCompany}>{job.company.split('/')[0].trim()}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail — right column */}
        <div className={styles.detailArea}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className={styles.detail}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className={styles.detailPeriod}>{resume.experience[activeIndex].period}</div>
              <h3 className={styles.detailTitle}>{resume.experience[activeIndex].title}</h3>
              <p className={styles.detailCompany}>{resume.experience[activeIndex].company}</p>
              {resume.experience[activeIndex].description && (
                <p className={styles.description}>{resume.experience[activeIndex].description}</p>
              )}
              {resume.experience[activeIndex].bullets.length > 0 && (
                <ul className={styles.bullets}>
                  {resume.experience[activeIndex].bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
