import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Bookmark,
  BookmarkIcon,
  Clock,
  Database,
  Tag,
  Target,
} from "lucide-react";
import { problemDetailsType } from "../../data/problemDetails";
import { useUILevel } from "../../contexts/UILevelContext";
import { FunctionInput } from "./FunctionInput";
import { useAuth } from "@/contexts/AuthContext";
import { useBookmark } from "@/contexts/BookmarkContext";

interface FunctionDetailCardProps {
  problem: problemDetailsType;
}

export const FunctionDetailCard: React.FC<FunctionDetailCardProps> = ({
  problem,
}) => {
  const { uiLevel } = useUILevel();
  const { user, isAuthenticated } = useAuth();
  const { addBookmark, removeBookmark, bookmarks } = useBookmark();
  const [values, setValues] = useState<Record<string, string | number>>({});
  const [result, setResult] = useState("");

  const handleInputChange = (
    name: string,
    value: string,
    type: "text" | "number"
  ) => {
    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };
  const getCardStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
      // return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
      case "basic":
        return "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg";
      case "futuristic":
        return "border border-green-500 shadow-xl shadow-green-500/20";
      default:
        return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
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
        Easy: "bg-green-900/50 text-green-400 border border-green-500 shadow-md shadow-green-500/30",
        Medium:
          "bg-yellow-900/50 text-yellow-400 border border-yellow-500 shadow-md shadow-yellow-500/30",
        Hard: "bg-red-900/50 text-red-400 border border-red-500 shadow-md shadow-red-500/30",
      }[difficulty];
    }

    return baseColors[difficulty as keyof typeof baseColors];
  };

  const getTextStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-200";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getTitleStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-400";
      default:
        return "text-gray-900 dark:text-white";
    }
  };
  const getBookmarkStyles = (isBookmarked: boolean, type: string) => {
    if (isBookmarked) {
      switch (type) {
        case "fill":
          switch (uiLevel) {
            case "skeleton":
              return "black";
            default:
              return "#4ADE80";
          }
        case "color":
          switch (uiLevel) {
            case "skeleton":
              return "white";
            default:
              return "#4ADE80";
          }
      }
    } else {
      switch (type) {
        case "fill":
          switch (uiLevel) {
            case "skeleton":
              return "white";
            default:
              return "#9ca3af";
          }
        case "color":
          switch (uiLevel) {
            case "skeleton":
              return "black";
            default:
              return "#9ca3af";
          }
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(values).length === 0 || values === null) return;
    const submitValues = Object.values(values);
    // console.log("submitted", ...submitValues)
    // const gotResult = problem.functions(submitValues) || false;
    const gotResult = false;
    if (gotResult) {
      setResult(gotResult);
    }
  };

  const SaveAlgo = () => {
    if (isAuthenticated) {
      if (user.email && !isSavedAlgo()) {
        addBookmark(user.email, problem);
      } else {
        removeBookmark(user.email, problem.id.toLocaleString());
      }
    } else {
      alert("Please sign in first");
    }
  };
  const isSavedAlgo = () => {
    const gotAlgo = bookmarks?.filter(
      (algo) => algo.userEmail === user?.email
    && algo.id === problem.id
    );
    if (bookmarks?.length === 0 || gotAlgo?.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-8 mb-8 ${getCardStyles()}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
        <div className="flex-1">
          {/* title */}
          <div className="flex items-center">
            <h1
              className={`text-3xl font-bold mb-4 ${
                uiLevel !== "skeleton" ? getTitleStyles() : ""
              }`}
            >
              {problem?.title}
            </h1>
            {/* Bookmark */}
            <div className="mb-4">
              <i>
                <BookmarkIcon
                  fill={`${getBookmarkStyles(isSavedAlgo(), "fill")}`}
                  color={`${getBookmarkStyles(isSavedAlgo(), "color")}`}
                  onClick={() => SaveAlgo()}
                />
              </i>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4 select-none">
            {/* difficulty */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                uiLevel !== "skeleton"
                  ? getDifficultyColor(problem?.difficulty)
                  : ""
              }`}
            >
              {problem?.difficulty}
            </span>
            {/* category */}
            <div
              className={`flex items-center space-x-1 text-sm select-none ${
                uiLevel !== "skeleton" ? getTextStyles() : ""
              }`}
            >
              <Tag size={16} />
              <span>{problem?.category}</span>
            </div>
          </div>
        </div>
      </div>
      {/* description */}
      <div className="prose prose-lg max-w-none mb-8">
        <p
          className={`text-lg leading-relaxed ${
            uiLevel !== "skeleton" ? getTextStyles() : ""
          }`}
        >
          {problem?.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* time-complexity */}
        <div
          className={`p-4 rounded-lg ${
            uiLevel !== "skeleton"
              ? uiLevel === "futuristic"
                ? "bg-green-900/20 border border-green-700"
                : "bg-gray-50 dark:bg-gray-700"
              : ""
          }`}
        >
          <div
            className={`flex items-center space-x-2 mb-2 ${
              uiLevel !== "skeleton"
                ? uiLevel === "futuristic"
                  ? "text-green-400"
                  : "text-gray-700 dark:text-gray-300"
                : ""
            }`}
          >
            <Clock size={16} />
            <span className="font-medium">Time Complexity</span>
          </div>
          <p
            className={`font-mono text-sm ${
              uiLevel !== "skeleton"
                ? uiLevel === "futuristic"
                  ? "text-green-300"
                  : "text-gray-600 dark:text-gray-400"
                : ""
            }`}
          >
            {problem?.timeComplexity}
          </p>
        </div>
        {/* space-complexity */}
        <div
          className={`p-4 rounded-lg ${
            uiLevel !== "skeleton"
              ? uiLevel === "futuristic"
                ? "bg-green-900/20 border border-green-700"
                : "bg-gray-50 dark:bg-gray-700"
              : ""
          }`}
        >
          <div
            className={`flex items-center space-x-2 mb-2 ${
              uiLevel !== "skeleton"
                ? uiLevel === "futuristic"
                  ? "text-green-400"
                  : "text-gray-700 dark:text-gray-300"
                : ""
            }`}
          >
            <Database size={16} />
            <span className="font-medium">Space Complexity</span>
          </div>
          <p
            className={`font-mono text-sm ${
              uiLevel !== "skeleton"
                ? uiLevel === "futuristic"
                  ? "text-green-300"
                  : "text-gray-600 dark:text-gray-400"
                : ""
            }`}
          >
            {problem?.spaceComplexity}
          </p>
        </div>
        {/* languages */}
        <div
          className={`p-4 rounded-lg ${
            uiLevel !== "skeleton"
              ? uiLevel === "futuristic"
                ? "bg-green-900/20 border border-green-700"
                : "bg-gray-50 dark:bg-gray-700"
              : ""
          }`}
        >
          <div
            className={`flex items-center space-x-2 mb-2 ${
              uiLevel !== "skeleton"
                ? uiLevel === "futuristic"
                  ? "text-green-400"
                  : "text-gray-700 dark:text-gray-300"
                : ""
            }`}
          >
            <Target size={16} />
            <span className="font-medium">Languages</span>
          </div>
          <p
            className={`text-sm ${
              uiLevel !== "skeleton"
                ? uiLevel === "futuristic"
                  ? "text-green-300"
                  : "text-gray-600 dark:text-gray-400"
                : ""
            }`}
          >
            {Object.keys(problem?.sourceCode).length} available
          </p>
        </div>
      </div>

      {/* inputs */}
      <FunctionInput
        select={problem.select}
        inputs={problem.inputs}
        key={problem.id}
        onExecute={(values) => problem.functions(...Object.values(values))}
      />
      {/* tags */}
      <div>
        <h3
          className={`select-none text-lg font-semibold mb-3 ${getTitleStyles()}`}
        >
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {problem?.tags &&
            problem?.tags.map((tag) => (
              <span
                key={tag}
                className={`select-none px-3 py-1 rounded-full text-sm font-medium ${
                  uiLevel === "futuristic"
                    ? "bg-green-900/30 text-green-400 border border-green-700"
                    : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300"
                }`}
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
};
