import { useTheme } from "./theme/useTheme";
import { Nav } from "./components/Nav/Nav";
import { Hero } from "./components/Hero/Hero";
import { BentoGrid } from "./components/BentoGrid/BentoGrid";
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
      <main>
        <BentoGrid>
          <About />
          <Achievements />
          <Skills />
          <Experience />
          <section id="projects" className={styles.projectsSection}>
            <h2 className={styles.sectionHeading}>Projects</h2>
            <div className={styles.projectsGrid}>
              <Projects />
            </div>
          </section>
          <Education />
          <Contact />
        </BentoGrid>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Rebecca Richards</p>
      </footer>
    </>
  );
}

export default App;
