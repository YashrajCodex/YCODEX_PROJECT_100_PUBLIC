import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeName = 
  | "blue-nebula" 
  | "red-inferno" 
  | "green-quantum" 
  | "purple-mystic" 
  | "black-ice";

export type ThemeMode = "dark" | "light";

interface ThemeContextType {
  theme: ThemeName;
  mode: ThemeMode;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem("theme-pack");
    return (saved as ThemeName) || "blue-nebula";
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme-mode");
    return (saved as ThemeMode) || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove(
      "theme-red-inferno",
      "theme-green-quantum",
      "theme-purple-mystic",
      "theme-black-ice",
      "light",
      "dark"
    );
    
    // Add current theme class
    if (theme !== "blue-nebula") {
      root.classList.add(`theme-${theme}`);
    }
    
    // Add mode class
    root.classList.add(mode);
    
    localStorage.setItem("theme-pack", theme);
    localStorage.setItem("theme-mode", mode);
  }, [theme, mode]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const toggleMode = () => {
    setModeState(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
