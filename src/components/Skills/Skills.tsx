import { motion } from 'framer-motion'
import { Section } from '../Section/Section'
import * as resume from '../../data/resume'
import styles from './Skills.module.css'

export function Skills() {
  return (
    <Section id="skills" className={styles.wrapper}>
      <div className={styles.proficient}>
        <h2 className={styles.heading}>Skills</h2>
        {resume.proficientSkills.map((cat) => (
          <div key={cat.label} className={styles.category}>
            <h3 className={styles.label}>{cat.label}</h3>
            <div className={styles.chips}>
              {cat.skills.map((skill) => (
                <motion.span
                  key={skill}
                  className={styles.chip}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.exposureRow}>
        <h3 className={styles.label}>Exposure</h3>
        <div className={styles.chips}>
          {resume.exposureSkills.map((skill) => (
            <span key={skill} className={`${styles.chip} ${styles.exposure}`}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
