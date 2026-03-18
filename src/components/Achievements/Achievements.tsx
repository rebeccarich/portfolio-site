import { Section } from "../Section/Section";
import * as resume from "../../data/resume";
import styles from "./Achievements.module.css";

export function Achievements() {
  return (
    <Section>
      <h2 className={styles.heading}>Key Achievements</h2>
      <ul className={styles.list}>
        {resume.achievements.map((item, i) => (
          <li key={i} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
