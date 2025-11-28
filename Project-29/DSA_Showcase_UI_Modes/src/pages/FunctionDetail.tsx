import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, AlertCircle, ArrowRight } from "lucide-react";
import { FunctionDetailCard } from "../components/function/FunctionDetailCard";
import { SourceCodeEditor } from "../components/function/SourceCodeEditor";
import problemDetails from "../data/problemDetails";
import { useUILevel } from "../contexts/UILevelContext";

export default function FunctionDetail() {
  const { id } = useParams<{ id: string }>();
  const { uiLevel } = useUILevel();
  const problem = problemDetails.find((p) => p.id === Number(id));

  const getBackButtonStyles = () => {
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

  const getNextPreviousStyles = () => {
    switch (uiLevel) {
      // return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
      case "basic":
        return "bg-indigo-600 text-white hover:bg-indigo-700";
      case "futuristic":
        return "bg-green-600 text-black hover:bg-green-500 shadow-md shadow-green-500/50 border border-green-400";
      default:
        return "";
    }
  };

  const getContainerStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "min-h-screen";
      case "skeleton":
        return "min-h-screen";
      default:
        return "min-h-screen bg-gray-50 dark:bg-gray-900";
    }
  };

  const getErrorStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
      // return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
      case "basic":
        return "bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 shadow-lg";
      case "futuristic":
        return "bg-gradient-to-br from-gray-900 to-black border border-red-500 shadow-xl shadow-red-500/20";
      default:
        return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
    }
  };

  if (!problem) {
    return (
      <div className={getContainerStyles()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
          <motion.div
            initial={uiLevel !== "skeleton" && { opacity: 0, scale: 0.9 }}
            animate={uiLevel !== "skeleton" && { opacity: 1, scale: 1 }}
            className={`rounded-lg p-8 text-center max-w-md mx-auto ${getErrorStyles()}`}
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                uiLevel !== "skeleton"
                  ? uiLevel === "futuristic"
                    ? "bg-red-900/50 text-red-400"
                    : "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                  : ""
              }`}
            >
              <AlertCircle size={32} />
            </div>
            <h2
              className={`text-2xl font-bold mb-4 ${
                uiLevel !== "skeleton"
                  ? uiLevel === "futuristic"
                    ? "text-red-400"
                    : "text-gray-900 dark:text-white"
                  : ""
              }`}
            >
              Problem Not Found
            </h2>
            <p
              className={`mb-6 ${
                uiLevel !== "skeleton"
                  ? uiLevel === "futuristic"
                    ? "text-red-200"
                    : "text-gray-600 dark:text-gray-400"
                  : ""
              }`}
            >
              The problem you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all ${getBackButtonStyles()}`}
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={getContainerStyles()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={uiLevel !== "skeleton" && { opacity: 0, x: -20 }}
          animate={uiLevel !== "skeleton" && { opacity: 1, x: 0 }}
          className="mb-6 flex justify-between"
        >
          <Link
            to="/"
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all select-none ${getBackButtonStyles()}`}
          >
            <ArrowLeft size={16} />
            <span>Back to Problems</span>
          </Link>
          <div className="flex gap-2 select-none">
            <Link
              to={`/function/${problem?.id - 1}`}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${getNextPreviousStyles()}`}
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </Link>
            <Link
              to={`/function/${problem?.id + 1}`}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${getNextPreviousStyles()}`}
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        <FunctionDetailCard problem={problem} />
        <SourceCodeEditor sourceCode={problem.sourceCode} />
      </div>
    </div>
  );
};
