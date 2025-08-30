import React from "react";
import { motion } from "motion/react";
import { useUILevel } from "../contexts/UILevelContext";

export const Footer: React.FC = () => {
  const { uiLevel } = useUILevel();

  const getFooterStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
        // return "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700";
      case "basic":
        return "bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600";
      case "futuristic":
        return "bg-black border-t border-green-500 shadow-lg shadow-green-500/20";
      default:
        return "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700";
    }
  };

  const getTextStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-400";
      case "skeleton":
        return "";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <motion.footer
    initial={uiLevel !== 'skeleton' && { opacity: 0 }}
    animate={uiLevel !== 'skeleton' && { opacity: 1 }}
      className={`select-none mt-auto ${getFooterStyles()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className={`text-sm ${getTextStyles()}`}>
            © 2024 DSA Showcase. Built with React, Tailwind CSS, and modern web
            technologies.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <span className={`text-xs ${getTextStyles()}`}>
              Accessible • Responsive • Theme-aware
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
