import { useState, useEffect } from "react";
import { Palette, Moon, Sun } from "lucide-react";
import styles from "./theme-switcher.module.css";

interface ThemeOption {
  id: string;
  name: string;
  accent: string;
  neutral: string;
}

const themes: ThemeOption[] = [
  { id: "teal", name: "Teal Elegance", accent: "teal", neutral: "slate" },
  { id: "indigo", name: "Indigo Luxury", accent: "indigo", neutral: "slate" },
  { id: "amber", name: "Golden Hour", accent: "amber", neutral: "sand" },
  { id: "crimson", name: "Crimson Elite", accent: "crimson", neutral: "mauve" },
  { id: "jade", name: "Jade Garden", accent: "jade", neutral: "sage" },
  { id: "violet", name: "Violet Dream", accent: "violet", neutral: "slate" },
];

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("teal");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("realtyvibe-theme");
    const savedDarkMode = localStorage.getItem("realtyvibe-dark-mode");
    
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyTheme(themes.find((t) => t.id === savedTheme)!);
    }
    
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === "true");
      document.documentElement.style.colorScheme = savedDarkMode === "true" ? "dark" : "light";
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.style.colorScheme = prefersDark ? "dark" : "light";
    }
  }, []);

  const applyTheme = (theme: ThemeOption) => {
    const root = document.documentElement;
    
    // Update accent colors
    for (let i = 1; i <= 12; i++) {
      root.style.setProperty(
        `--color-accent-${i}`,
        `var(--${theme.accent}-${i})`
      );
    }
    root.style.setProperty(
      "--color-accent-contrast",
      `var(--${theme.accent}-contrast)`
    );

    // Update neutral colors
    for (let i = 1; i <= 12; i++) {
      root.style.setProperty(
        `--color-neutral-${i}`,
        `var(--${theme.neutral}-${i})`
      );
    }
    root.style.setProperty(
      "--color-neutral-contrast",
      `var(--${theme.neutral}-contrast)`
    );
  };

  const handleThemeChange = (theme: ThemeOption) => {
    setCurrentTheme(theme.id);
    applyTheme(theme);
    localStorage.setItem("realtyvibe-theme", theme.id);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.style.colorScheme = newDarkMode ? "dark" : "light";
    localStorage.setItem("realtyvibe-dark-mode", newDarkMode.toString());
  };

  return (
    <>
      <button
        className={`${styles.button} interactive`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
      >
        <Palette size={24} />
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.darkModeToggle}>
            <button
              className={`${styles.darkModeButton} interactive`}
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
          
          <h3 className={styles.panelHeader}>Choose Theme</h3>
          <div className={styles.themeGrid}>
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`${styles.themeOption} interactive`}
                onClick={() => handleThemeChange(theme)}
                data-active={currentTheme === theme.id}
              >
                <div className={styles.colorPreview}>
                  <div
                    className={styles.colorSwatch}
                    style={{ background: `var(--${theme.accent}-9)` }}
                  />
                  <div
                    className={styles.colorSwatch}
                    style={{ background: `var(--${theme.neutral}-9)` }}
                  />
                </div>
                <span className={styles.themeLabel}>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
