import React from "react";
import { motion } from "motion/react";
import { useUILevel } from "@/contexts/UILevelContext";

export default function Header() {
  const { uiLevel } = useUILevel();
  const getTitleStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-400 text-center mb-8";
      case "skeleton":
        return "";
      default:
        return "text-gray-900 dark:text-white text-center mb-8";
    }
  };
  return (
    <div>
      <motion.div
        initial={uiLevel !== "skeleton" && { opacity: 0, y: -20 }}
        animate={uiLevel !== "skeleton" && { opacity: 1, y: 0 }}
        className={getTitleStyles()}
      >
        <h1 className="text-4xl font-bold mb-4">DSA Problems Showcase</h1>
        <p
          className={`text-lg ${
            uiLevel !== "skeleton"
              ? uiLevel === "futuristic"
                ? "text-green-200"
                : "text-gray-600 dark:text-gray-400"
              : ""
          }`}
        >
          Explore my collection of solved Data Structures and Algorithms
          problems
        </p>
      </motion.div>
    </div>
  );
}
