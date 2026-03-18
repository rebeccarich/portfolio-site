import { useTheme } from "./theme/useTheme";
import { BentoGrid } from "./components/BentoGrid/BentoGrid";
import { BentoCard } from "./components/BentoCard/BentoCard";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>{theme === "light" ? "Dark" : "Light"}</button>
      <BentoGrid>
        <BentoCard span="2"><h2>About</h2><p>Hello world</p></BentoCard>
        <BentoCard><h2>Skills</h2><p>TypeScript, React</p></BentoCard>
        <BentoCard span="full"><h2>Experience</h2><p>15+ years</p></BentoCard>
      </BentoGrid>
    </div>
  );
}

export default App;
