import { Section } from '../Section/Section'
import * as cv from '../../data/cv'
import styles from './Achievements.module.css'

export function Achievements() {
  return (
    <Section>
      <h2 className={styles.heading}>Key Achievements</h2>
      <ul className={styles.list}>
        {cv.achievements.map((item, i) => (
          <li key={i} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  )
}
