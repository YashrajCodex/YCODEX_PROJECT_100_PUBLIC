import React from "react";
import { motion } from "motion/react";
import { Search, RefreshCw } from "lucide-react";
import { useUILevel } from "../../contexts/UILevelContext";

interface NoResultProps {
  onReset: () => void;
}

export const NoResult: React.FC<NoResultProps> = ({ onReset }) => {
  const { uiLevel } = useUILevel();

  const getContainerStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
        // return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
      case "basic":
        return "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700";
      case "futuristic":
        return "bg-gradient-to-br from-gray-900 to-black border border-green-500 shadow-lg shadow-green-500/20";
      default:
        return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
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

  const getButtonStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
        // return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
      case "basic":
        return "bg-blue-600 text-white hover:bg-blue-700";
      case "futuristic":
        return "bg-green-600 text-black hover:bg-green-500 shadow-md shadow-green-500/50 border border-green-400";
      default:
        return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
    }
  };

  return (
    <motion.div
      initial={ uiLevel !== 'skeleton' && { opacity: 0, scale: 0.9 }}
      animate={ uiLevel !== 'skeleton' && { opacity: 1, scale: 1 }}
      className={`rounded-lg p-12 text-center ${getContainerStyles()}`}
    >
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          uiLevel === "futuristic"
            ? "bg-green-900/50 text-green-400"
            : "bg-gray-100 dark:bg-gray-700 text-gray-400"
        }`}
      >
        <Search size={32} />
      </div>

      <h3
        className={`text-xl font-semibold mb-2 ${
          uiLevel !== "skeleton" ? uiLevel === "futuristic"
            ? "text-green-400"
            : "text-gray-900 dark:text-white" : ""
        }`}
      >
        No Problems Found
      </h3>

      <p className={`mb-6 max-w-md mx-auto ${getTextStyles()}`}>
        We couldn't find any problems matching your current filters. Try
        adjusting your search criteria or browse all problems.
      </p>

      <motion.button
        whileHover={uiLevel !== 'skeleton' && { scale: 1.05 }}
        whileTap={uiLevel !== 'skeleton' && { scale: 0.95 }}
        onClick={onReset}
        className={`inline-flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all ${getButtonStyles()}`}
      >
        <RefreshCw size={16} />
        <span>Reset Filters</span>
      </motion.button>
    </motion.div>
  );
};
