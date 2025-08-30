import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUILevel } from "../../contexts/UILevelContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { uiLevel } = useUILevel();

  const getButtonStyles = (isActive: boolean, isDisabled: boolean) => {
    const baseStyles =
      "px-3 py-2 rounded-md text-sm font-medium transition-all";

    if (isDisabled) {
      return `${baseStyles} opacity-50 cursor-not-allowed`;
    }

    switch (uiLevel) {
      case "skeleton":
        return `${baseStyles} ${
          ""
          // isActive
          //   ? "bg-gray-200 dark:bg-gray-700"
          //   : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`;
      case "basic":
        return `${baseStyles} ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`;
      case "futuristic":
        return `${baseStyles} ${
          isActive
            ? "bg-green-600 text-black shadow-md shadow-green-500/50 border border-green-400"
            : "text-green-400 border border-green-700 hover:bg-green-900/50 hover:text-green-300"
        }`;
      default:
        return `${baseStyles} ${
          isActive
            ? "bg-gray-200 dark:bg-gray-700"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`;
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={uiLevel !== 'skeleton' && { opacity: 0 }}
      animate={uiLevel !== 'skeleton' && { opacity: 1 }}
      className="flex items-center justify-center space-x-2 mt-8"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={getButtonStyles(false, currentPage === 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span
              className={`px-3 py-2 ${
                uiLevel !== 'skeleton' ? uiLevel === "futuristic"
                  ? "text-green-400"
                  : "text-gray-500 dark:text-gray-400" : ""
              }`}
            >
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={getButtonStyles(currentPage === page, false)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={getButtonStyles(false, currentPage === totalPages)}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </motion.div>
  );
};
