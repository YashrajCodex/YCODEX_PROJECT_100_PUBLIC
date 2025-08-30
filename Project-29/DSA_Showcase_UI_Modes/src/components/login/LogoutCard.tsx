import React from "react";
import { motion } from "motion/react";
import { LogOut, User, Clock } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useUILevel } from "../../contexts/UILevelContext";

export const LogoutCard: React.FC = () => {
  const { user, logout } = useAuth();
  const { uiLevel } = useUILevel();

  const getCardStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
        // return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
      case "basic":
        return "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl";
      case "futuristic":
        return "bg-gradient-to-br from-gray-900 to-black border border-green-500 shadow-xl shadow-green-500/20";
      default:
        return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
    }
  };

  const getButtonStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
        // return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
      case "basic":
        return "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500";
      case "futuristic":
        return "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/50 border border-red-400";
      default:
        return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
    }
  };

  const getTitleStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-400";
      case "skeleton":
        return "";
      default:
        return "text-gray-900 dark:text-white";
    }
  };

  const getTextStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-200";
      case "skeleton":
        return "";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const formatLoginTime = (loginTime: string) => {
    return new Date(loginTime).toLocaleString();
  };

  if (!user) return null;

  return (
    <motion.div
      initial={uiLevel !== 'skeleton' && { opacity: 0, scale: 0.9 }}
      animate={uiLevel !== 'skeleton' && { opacity: 1, scale: 1 }}
      className={`max-w-md mx-auto rounded-lg p-8 stylish-regular ${getCardStyles()}`}
    >
      <div className="text-center mb-8">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            uiLevel !== "skeleton" && uiLevel === "futuristic"
              ? "bg-green-900/50 text-green-400"
              : "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
          }`}
        >
          <User size={32} />
        </div>
        <h2 className={`text-2xl font-bold ${getTitleStyles()}`}>
          Welcome, {user.username}!
        </h2>
        <p className={`mt-2 ${getTextStyles()}`}>You are currently signed in</p>
      </div>

      <div
        className={`p-4 rounded-lg mb-6 ${
          uiLevel !== "skeleton" && uiLevel === "futuristic"
            ? "bg-green-900/20 border border-green-700"
            : "bg-gray-50 dark:bg-gray-700"
        }`}
      >
        <div className="space-y-3">
          <div className={`flex items-center space-x-3 ${getTextStyles()}`}>
            <User size={16} />
            <div>
              <span className="font-medium">Username:</span>
              <span className="ml-2">{user.username}</span>
            </div>
          </div>
          <div className={`flex items-center space-x-3 ${getTextStyles()}`}>
            <Clock size={16} />
            <div>
              <span className="font-medium">Signed in:</span>
              <span className="ml-2">{formatLoginTime(user.loginTime)}</span>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={uiLevel !== "skeleton" && { scale: 1.02 }}
        whileTap={uiLevel !== "skeleton" && { scale: 0.98 }}
        onClick={logout}
        className={`w-full py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${getButtonStyles()}`}
      >
        <LogOut size={16} />
        <span>Sign Out</span>
      </motion.button>
    </motion.div>
  );
};
