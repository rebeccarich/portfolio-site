import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as cv from '../../data/cv'
import { CalendarIcon } from '../Icons/Icons'
import styles from './Experience.module.css'

function JobDetail({ job }: { job: (typeof cv.experience)[number] }) {
  return (
    <>
      <div className={styles.detailPeriod}>
        <CalendarIcon size={13} />
        {job.period}
      </div>
      <h3 className={styles.detailTitle}>{job.title}</h3>
      <p className={styles.detailCompany}>{job.company}</p>
      {job.description && <p className={styles.description}>{job.description}</p>}
      {job.bullets.length > 0 && (
        <ul className={styles.bullets}>
          {job.bullets.map((bullet, j) => (
            <li key={j}>{bullet}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(0)

  const toggleAccordion = (i: number) => {
    setExpandedIndex(expandedIndex === i ? -1 : i)
  }

  return (
    <section id="experience" className={styles.wrapper}>
      <h2 className={styles.heading}>Experience</h2>

      {/* Desktop: two-column layout */}
      <div className={styles.grid}>
        <div className={styles.nav}>
          {cv.experience.map((job, i) => (
            <button
              key={i}
              className={`${styles.entry} ${i === activeIndex ? styles.active : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <div className={styles.indicator}>
                <div className={styles.dot} />
                {i < cv.experience.length - 1 && <div className={styles.connector} />}
              </div>
              <div className={styles.entryContent}>
                <span className={styles.period}>{job.period.split('–')[0].trim()}</span>
                <span className={styles.entryTitle}>{job.title}</span>
                <span className={styles.entryCompany}>{job.company.split('/')[0].trim()}</span>
              </div>
            </button>
          ))}
        </div>

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
              <JobDetail job={cv.experience[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className={styles.accordion}>
        {cv.experience.map((job, i) => (
          <div key={i} className={styles.accordionItem}>
            <button
              className={`${styles.accordionHeader} ${expandedIndex === i ? styles.expanded : ''}`}
              onClick={() => toggleAccordion(i)}
            >
              <div className={styles.accordionDot} />
              <div className={styles.accordionMeta}>
                <span className={styles.accordionTitle}>{job.title}</span>
                <span className={styles.accordionCompany}>{job.company.split('/')[0].trim()}</span>
              </div>
              <svg
                className={styles.chevron}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {expandedIndex === i && (
                <motion.div
                  className={styles.accordionBody}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className={styles.accordionContent}>
                    <JobDetail job={job} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
