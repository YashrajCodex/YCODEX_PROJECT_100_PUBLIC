import React, { useState, useMemo } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { FilterSearchSort } from "../components/home/FilterSearchSort";
import { FunctionCard } from "../components/home/FunctionCard";
import { Pagination } from "../components/home/Pagination";
import { NoResult } from "../components/home/NoResult";
import { useUILevel } from "../contexts/UILevelContext";
import { Link, useSearchParams } from "react-router-dom";
import problemDetails from "@/data/problemDetails";
import ProgressCard from "@/components/UI/ProgressCard";
import SubProgressCard from "@/components/home/SubProgressCard";
import { ChevronDownSquare, ChevronUpSquare } from "lucide-react";
import Header from "@/components/home/Header";

const ITEMS_PER_PAGE = 9;

export const Home: React.FC = () => {
  const { uiLevel } = useUILevel();

  const [params] = useSearchParams();
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = params.get("search") || "";
  const categoryFilter = params.get("category") || "";
  const difficultyFilter = params.get("difficulty") || "";
  const sortBy = params.get("sort") || "title";

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(problemDetails.map((p) => p.category)),
    ];
    return uniqueCategories.sort();
  }, []);

  const filteredAndSortedProblems = useMemo(() => {
    const filtered = problemDetails.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        !categoryFilter || problem.category === categoryFilter;
      const matchesDifficulty =
        !difficultyFilter || problem.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort problems
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "difficulty":
          const difficultyOrder = {
            Easy: 1,
            Medium: 2,
            Hard: 3,
          };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "category":
          return a.category.localeCompare(b.category);
        case "id":
          return a.id - b.id;
        case "title":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, categoryFilter, difficultyFilter, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedProblems.length / ITEMS_PER_PAGE
  );
  const paginatedProblems = filteredAndSortedProblems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleReset = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setDifficultyFilter("");
    setSortBy("title");
    setCurrentPage(1);
  };

  // const getContainerStyles = () => {
  //   switch (uiLevel) {
  //     case "futuristic":
  //       return "min-h-screen text-green-400";
  //     case "skeleton":
  //       return "";
  //     default:
  //       return "min-h-screen bg-gray-50 dark:bg-gray-900";
  //   }
  // };
  const getProgressStyle = () => {
    switch (uiLevel) {
      case "futuristic":
        return "shadow-lg shadow-green-500 text-green-400 border-[1px] border-green-500 rounded";
      case "skeleton":
        return "";
      default:
        return "text-gray-800 dark:text-gray-50 bg-gray-50 dark:bg-gray-800 border-[1.5px] border-gray-600 dark:border-gray-750 rounded";
    }
  };

  const categoryData = [
    {
      label: "Easy",
      completed: problemDetails.filter((item) => item.difficulty === "Easy")
        .length,
      total: problemDetails.length,
      strokeColor: "#22c55e",
    },
    {
      label: "Medium",
      completed: problemDetails.filter((item) => item.difficulty === "Medium")
        .length,
      total: problemDetails.length,
      Medium: "#facc15",
    },
    {
      label: "Hard",
      completed: problemDetails.filter((item) => item.difficulty === "Hard")
        .length,
      total: problemDetails.length,
      Hard: "#64748b",
    },
  ];
  const progressData = {
    title: "Total Problems",
    completedTask: problemDetails.length,
    progressedPercent: 100,
    totalTask: problemDetails.length,
  };
  const dropdownVariants: Variants = {
    visible: {
      opacity: 1,
      scaleY: 1,
      originY: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      originY: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className={`getContainerStyles()`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Header />

        {/* Progress-cards */}
        <div className="relative">
          <span
            onClick={() => setShow((s) => !s)}
            className="absolute right-0 m-4 cursor-pointer flex gap-2 select-none"
          >
            {show ? (
              <ChevronDownSquare size={20} className="hover:scale-110" />
            ) : (
              <ChevronUpSquare size={20} className="hover:scale-110" />
            )}
          </span>
          <ProgressCard className={getProgressStyle()}>
            <ProgressCard.Progress
              progress={progressData}
              className="text-gray-800 dark:text-gray-50"
            />
            <ProgressCard.Category
              category={categoryData}
              className="text-gray-800 dark:text-gray-50"
            />
          </ProgressCard>

          <div className="select-none">
            <AnimatePresence>
              {show && (
                <motion.div
                  variants={uiLevel !== "skeleton" && dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <SubProgressCard className={getProgressStyle} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* filter/sort */}
        <FilterSearchSort categories={categories}/>

        {filteredAndSortedProblems &&
        filteredAndSortedProblems?.length === 0 ? (
          <NoResult onReset={handleReset} />
        ) : (
          <>
            <motion.div
              initial={uiLevel !== "skeleton" && { scale: 0 }}
              animate={uiLevel !== "skeleton" && { scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {paginatedProblems &&
                paginatedProblems?.map((problem, index) => (
                  <Link to={`/function/${problem?.id}`} key={problem.id}>
                    <FunctionCard
                      key={problem?.id}
                      problem={problem}
                      index={index}
                    />
                  </Link>
                ))}
            </motion.div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};
