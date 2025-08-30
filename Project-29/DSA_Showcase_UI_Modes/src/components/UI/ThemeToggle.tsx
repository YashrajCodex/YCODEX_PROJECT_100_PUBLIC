import React from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useUILevel } from "@/contexts/UILevelContext";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { uiLevel } = useUILevel();

  return (
    <motion.button
      whileHover={uiLevel !== "skeleton" && { scale: 1.05 }}
      whileTap={uiLevel !== "skeleton" && { scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 rounded-lg transition-colors ${
        uiLevel !== "skeleton" &&
        `bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600`
      }`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};
