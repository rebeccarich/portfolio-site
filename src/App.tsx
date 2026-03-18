import { useTheme } from "./theme/useTheme";
import { Nav } from "./components/Nav/Nav";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Skills } from "./components/Skills/Skills";
import { Achievements } from "./components/Achievements/Achievements";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Education } from "./components/Education/Education";
import { Contact } from "./components/Contact/Contact";
import styles from "./App.module.css";

function App() {
  const { theme, toggleTheme } = useTheme();

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

        {/* Row 3: Experience (full width) */}
        <div className={styles.fullWidth}>
          <Experience />
        </div>

        {/* Row 4: Projects */}
        <section id="projects" className={styles.fullWidth}>
          <h2 className={styles.sectionHeading}>Projects</h2>
          <div className={styles.projectsGrid}>
            <Projects />
          </div>
        </section>

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
        <p>&copy; {new Date().getFullYear()} Rebecca Richards</p>
      </footer>
    </>
  );
}

export default App;
