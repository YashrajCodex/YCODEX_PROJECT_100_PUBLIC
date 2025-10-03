import React from "react";
import { motion } from "motion/react";
import { LoginForm } from "../components/login/LoginForm";
import { LogoutCard } from "../components/login/LogoutCard";
import { useAuth } from "../contexts/AuthContext";
import { useUILevel } from "../contexts/UILevelContext";

export const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { uiLevel } = useUILevel();

  const getContainerStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "min-h-screen flex items-center justify-center px-4";
      default:
        return "min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4";
    }
  };

  return (
    <motion.div
      initial={uiLevel !== 'skeleton' && { opacity: 0 }}
      animate={uiLevel !== 'skeleton' && { opacity: 1 }}
      className={getContainerStyles()}
    >
      <div className="w-full">
        {isAuthenticated ? <LogoutCard /> : <LoginForm />}
      </div>
    </motion.div>
  );
};
