import React, { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, SortAsc } from "lucide-react";
import { useUILevel } from "../../contexts/UILevelContext";
import { useSearchParams } from "react-router-dom";

interface FilterSearchSortProps {
  // onSearch: (query: string) => void;
  // onCategoryFilter: (category: string) => void;
  // onDifficultyFilter: (difficulty: string) => void;
  // onSort: (sortBy: string) => void;
  categories: string[];
}

export const FilterSearchSort: React.FC<FilterSearchSortProps> = ({
  // onSearch,
  // onCategoryFilter,
  // onDifficultyFilter,
  // onSort,
  categories,
}) => {
  const { uiLevel } = useUILevel();
  const [params, setParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    params.get("search") ? params.get("search") : ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    params.get("category") ? params.get("category") : ""
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    params.get("difficulty") ? params.get("difficulty") : ""
  );
  const [sortBy, setSortBy] = useState(
    params.get("sort") ? params.get("sort") : "title"
  );

  const getContainerStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        // return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded";
        return "";
      case "basic":
        return "bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm";
      case "futuristic":
        return "border border-green-500 rounded-lg shadow-lg shadow-green-500/20";
      default:
        return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded";
    }
  };

  const getInputStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        // return "border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-900";
        return "";
      case "basic":
        return "border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500";
      case "futuristic":
        return "border border-green-500 rounded-md px-3 py-2 bg-black text-green-400 placeholder-green-600 focus:ring-2 focus:ring-green-400 focus:border-green-400";
      default:
        return "border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-900";
    }
  };

  const setURLParam = useCallback(
    function setURLParam(key: string, value: string) {
      const newParam = new URLSearchParams(params);

      if (!value || value === "All") {
        newParam.delete(key);
      } else {
        newParam.set(key, value);
      }
      setParams(newParam);
    },
    [params, setParams]
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // onSearch(value);
    if (value.length > 2) {
      // newParam.set('search',value)
      setURLParam("search", value);
    } else {
      params.delete("search");
      setParams(params);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // onCategoryFilter(value);
    setURLParam("category", value);
  };

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value);
    // onDifficultyFilter(value);
    setURLParam("difficulty", value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // onSort(value);
    setURLParam("sort", value);
  };

  return (
    <motion.div
      initial={uiLevel !== "skeleton" && { opacity: 0, y: 20 }}
      animate={uiLevel !== "skeleton" && { opacity: 1, y: 0 }}
      className={`p-6 mb-6 ${getContainerStyles()}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            Search problems
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              id="search"
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={`pl-10 pr-3 py-2 w-full ${getInputStyles()}`}
            />
          </div>
        </div>
        {/* Category */}
        <div>
          <label htmlFor="category" className="sr-only">
            Filter by category
          </label>
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={`pl-10 pr-8 py-2 w-full appearance-none ${getInputStyles()}`}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Difficulty */}
        <div>
          <label htmlFor="difficulty" className="sr-only">
            Filter by difficulty
          </label>
          <select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className={`px-3 py-2 w-full ${getInputStyles()}`}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        {/* Sort-By */}
        <div>
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <div className="relative">
            <SortAsc
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className={`pl-10 pr-8 py-2 w-full appearance-none ${getInputStyles()}`}
            >
              <option value="title">Sort by Title</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="category">Sort by Category</option>
              <option value="id">Sort by Id</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
