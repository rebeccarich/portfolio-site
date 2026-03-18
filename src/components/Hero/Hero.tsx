import { motion, type Variants } from 'framer-motion'
import * as cv from '../../data/cv'
import styles from './Hero.module.css'

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export function Hero() {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.name} variants={item}>
          Rebecca <span>Richards</span>
        </motion.h1>
        <motion.p className={styles.title} variants={item}>
          {cv.title}
        </motion.p>
        <motion.div className={styles.techList} variants={item}>
          {cv.headlineTech.map((tech, i) => (
            <span key={tech}>
              <span className={styles.tech}>{tech}</span>
              {i < cv.headlineTech.length - 1 && <span className={styles.separator}>·</span>}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  )
}
