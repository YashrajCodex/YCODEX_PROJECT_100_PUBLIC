import React, { useState } from "react";
import { motion, useScroll } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Code, Home, LogIn, User } from "lucide-react";
import { ThemeToggle } from "./UI/ThemeToggle";
import { UIModeSwitcher } from "./UI/UIModeSwitcher";
import { useAuth } from "../contexts/AuthContext";
import { useUILevel } from "../contexts/UILevelContext";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { uiLevel } = useUILevel();
  const { scrollYProgress } = useScroll();

  const [show, setShow] = useState<boolean>(false);

  const getNavbarStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
      // return "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700";
      case "basic":
        return "bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600";
      case "futuristic":
        return "bg-black border-b border-green-500 shadow-lg shadow-green-500/20";
      default:
        return "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700";
    }
  };

  const getLinkStyles = (isActive: boolean) => {
    const baseStyles =
      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all";

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
            ? "bg-green-600 text-black shadow-md shadow-green-500/50"
            : "text-green-400 hover:bg-green-900/50 hover:text-green-300"
        }`;
      default:
        return `${baseStyles} ${
          isActive
            ? "bg-gray-200 dark:bg-gray-700"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`;
    }
  };

  return (
    <motion.nav
      initial={uiLevel !== "skeleton" && { y: -100 }}
      animate={uiLevel !== "skeleton" && { y: 0 }}
      className={`select-none sticky top-0 z-40  font_pixelify-sans ${getNavbarStyles()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 ${
                uiLevel !== "skeleton"
                  ? uiLevel === "futuristic"
                    ? "text-green-400"
                    : "text-gray-900 dark:text-white"
                  : ""
              }`}
            >
              <Code size={24} />
              <span className="text-lg">DSA Showcase</span>
            </Link>

            <div className="hidden md:flex space-x-4">
              <Link to="/" className={getLinkStyles(location.pathname === "/")}>
                <Home size={16} />
                <span>Home</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`text-${uiLevel === 'futuristic' ? 'green-400':'black'} dark:text-${uiLevel === 'futuristic' ? 'green-400':'white'}`}>
              <button onClick={()=> setShow((show)=> !show)}>UI Level</button>
              <UIModeSwitcher isOpen={show} onClose={()=> setShow((show)=> !show)}/>
            </div>
            {uiLevel !== 'futuristic' && <ThemeToggle />}

            {isAuthenticated ? (
              <div
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                  uiLevel !== "skeleton"
                    ? uiLevel === "futuristic"
                      ? "text-green-400"
                      : "text-gray-700 dark:text-gray-300"
                    : ""
                }`}
              >
                <User size={16} />
                <span className="text-sm">{user?.username}</span>
              </div>
            ) : (
              <Link
                to="/login"
                className={getLinkStyles(location.pathname === "/login")}
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      {uiLevel !== "skeleton" && (
        <motion.div
          id="scroll-indicator"
          style={{ scaleX: scrollYProgress }}
          className={`right-0 left-0 h-1 ${uiLevel === 'futuristic' ? `bg-green-400` : 'bg-gray-300'} fixed`}
        ></motion.div>
      )}
    </motion.nav>
  );
};
