import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Clock, Code, Tag } from "lucide-react";
import { problemDetailsType } from "../../data/problemDetails";
import { useUILevel } from "../../contexts/UILevelContext";

interface FunctionCardProps {
  problem: problemDetailsType;
  index: number;
}

export const FunctionCard: React.FC<FunctionCardProps> = ({
  problem,
  index,
}) => {
  const { uiLevel } = useUILevel();

  const getCardStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
        // return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
      case "basic":
        return "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg";
      case "futuristic":
        return "bg-gradient-to-br from-gray-950 to-black border border-green-500 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:border-green-400";
      default:
        return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
    }
  };

  const getTitleStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-400 hover:text-green-300";
      case "skeleton":
        return "";
      default:
        return "text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const baseColors = {
      Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    if (uiLevel === "futuristic") {
      return {
        Easy: "bg-green-900/50 text-green-400 border border-green-500",
        Medium: "bg-yellow-900/50 text-yellow-400 border border-yellow-500",
        Hard: "bg-red-900/50 text-red-400 border border-red-500",
      }[difficulty];
    }
    if (uiLevel === "skeleton") {
      return {
        Easy: "",
        Medium: "",
        Hard: "",
      }[difficulty];
    }

    return baseColors[difficulty as keyof typeof baseColors];
  };

  return (
    <motion.div
      initial={uiLevel !== "skeleton" && { opacity: 0, y: 20 }}
      animate={uiLevel !== "skeleton" && { opacity: 1, y: 0 }}
      transition={uiLevel !== "skeleton" && { delay: 0.2 }}
      // whileHover={uiLevel === "futuristic" && { scale: 1.08}}
      className={`rounded-lg p-6 transition-all duration-300 font_roboto-mono md:hover:scale-105 scale-95 ${getCardStyles()}`}
    >
      <div className="flex justify-between items-start mb-4">
        <Link
          to={`/function/${problem.id}`}
          className={`text-xl font-semibold transition-colors ${getTitleStyles()}`}
        >
          {problem?.title}
        </Link>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
            problem?.difficulty
          )}`}
        >
          {problem?.difficulty}
        </span>
      </div>

      <p
        className={`mb-4 line-clamp-3 ${
          uiLevel !== "skeleton" ? uiLevel === "futuristic"
            ? "text-green-200"
            : "text-gray-600 dark:text-gray-400" : ""
        }`}
      >
        {problem?.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm">
          <div
            className={`flex items-center space-x-1 ${
              uiLevel !== "skeleton" ? uiLevel === "futuristic"
                ? "text-green-300"
                : "text-gray-500 dark:text-gray-400" : ""
            }`}
          >
            <Tag size={14} />
            <span>{problem?.category}</span>
          </div>
          <div
            className={`flex items-center space-x-1 ${
              uiLevel !== "skeleton" ? uiLevel === "futuristic"
                ? "text-green-300"
                : "text-gray-500 dark:text-gray-400" : ""
            }`}
          >
            <Clock size={14} />
            <span>{problem?.timeComplexity}</span>
          </div>
        </div>

        <div
          className={`flex items-center space-x-1 text-sm ${
            uiLevel !== "skeleton" ? uiLevel === "futuristic"
              ? "text-green-300"
              : "text-gray-500 dark:text-gray-400" : ""
          }`}
        >
          <Code size={14} />
          <span>{Object.keys(problem.sourceCode).length} languages</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {problem.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className={`px-2 py-1 rounded text-xs ${
              uiLevel !== "skeleton" ? uiLevel === "futuristic"
                ? "bg-green-900/30 text-green-400 border border-green-700"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300" : ""
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
