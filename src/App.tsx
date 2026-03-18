import { useTheme } from "./theme/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
      <p>Portfolio — {theme} mode</p>
    </div>
  );
}

export default App;
