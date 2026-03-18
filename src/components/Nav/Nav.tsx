import { useState, useEffect } from "react";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Nav.module.css";

interface NavProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const sections = ["about", "skills", "experience", "projects", "contact"];

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          RR
        </a>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.show : ""}`}>
          {sections.map((id) => (
            <li key={id}>
              <button
                className={`${styles.link} ${active === id ? styles.active : ""}`}
                onClick={() => handleClick(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </nav>
  );
}
