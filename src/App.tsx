import { useTheme } from './theme/useTheme'
import { Nav } from './components/Nav/Nav'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Skills } from './components/Skills/Skills'
import { Achievements } from './components/Achievements/Achievements'
import { Experience } from './components/Experience/Experience'
import { Projects } from './components/Projects/Projects'
import { Education } from './components/Education/Education'
import { Contact } from './components/Contact/Contact'
import { GitHubIcon, LinkedInIcon, DownloadIcon } from './components/Icons/Icons'
import * as cv from './data/cv'
import styles from './App.module.css'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <About />
      <main className={styles.main}>
        {/* Row 1: Achievements (40%) + Skills (60%) */}
        <div className={styles.rowReverse}>
          <div className={styles.narrow}>
            <Achievements />
          </div>
          <div className={styles.wide}>
            <Skills />
          </div>
        </div>

        {/* Projects */}
        <section id="projects" className={styles.fullWidth}>
          <h2 className={styles.sectionHeading}>Projects</h2>
          <div className={styles.projectsGrid}>
            <Projects />
          </div>
        </section>

        {/* Experience: full width within main */}
        <Experience />

        {/* Row 5: Education (40%) + Contact (60%) — flipped */}
        <div className={styles.rowReverse}>
          <div className={styles.narrow}>
            <Education />
          </div>
          <div className={styles.wide}>
            <Contact />
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href={cv.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon size={16} />
          </a>
          <a href={cv.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon size={16} />
          </a>
          <a href="/rebecca-richards-cv.pdf" download aria-label="Download CV">
            <DownloadIcon size={16} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Rebecca Richards</p>
      </footer>
    </>
  )
}

export default App
