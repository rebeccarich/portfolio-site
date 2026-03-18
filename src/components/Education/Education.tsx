import { Section } from '../Section/Section'
import * as cv from '../../data/cv'
import styles from './Education.module.css'

export function Education() {
  return (
    <Section>
      <h2 className={styles.heading}>Education</h2>
      <div className={styles.entries}>
        {cv.education.map((edu, i) => (
          <div key={i} className={styles.entry}>
            <h3 className={styles.degree}>{edu.degree}</h3>
            <p className={styles.school}>{edu.school}</p>
            <div className={styles.meta}>
              <span>{edu.period}</span>
              {edu.distinction && <span className={styles.distinction}>{edu.distinction}</span>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
