import React, { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { LogIn, User, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useUILevel } from "../../contexts/UILevelContext";
import { LocalStorageAlert } from "../UI/LocalStorageAlert";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Please enter a valid email address"),
});

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { uiLevel } = useUILevel();
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState(false);

  const getFormStyles = () => {
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

  const getInputStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
        // return "border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-900";
      case "basic":
        return "border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
      case "futuristic":
        return "border border-green-500 rounded-md px-3 py-2 bg-black text-green-400 placeholder-green-600 focus:ring-2 focus:ring-green-400 focus:border-green-400";
      default:
        return "border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-900";
    }
  };

  const getButtonStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
        // return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
      case "basic":
        return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500";
      case "futuristic":
        return "bg-green-600 text-black hover:bg-green-500 shadow-lg shadow-green-500/50 border border-green-400";
      default:
        return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
    }
  };

  const getLabelStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-400";
      case "skeleton":
        return "";
      default:
        return "text-gray-700 dark:text-gray-300";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      loginSchema.parse(formData);
      login(formData);
      setShowAlert(true);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <>
      <motion.div
        initial={uiLevel !== 'skeleton' && { opacity: 0, scale: 0.9 }}
        animate={uiLevel !== 'skeleton' && { opacity: 1, scale: 1 }}
        className={`max-w-md mx-auto rounded-lg p-8 stylish-regular ${getFormStyles()}`}
      >
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              uiLevel !== "skeleton" ? uiLevel === "futuristic"
                ? "bg-green-900/50 text-green-400"
                : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""
            }`}
          >
            <LogIn size={32} />
          </div>
          <h2 className={`text-2xl font-bold ${getTitleStyles()}`}>
            Welcome Back
          </h2>
          <p
            className={`mt-2 ${
              uiLevel !== "skeleton" ? uiLevel === "futuristic"
                ? "text-green-200"
                : "text-gray-600 dark:text-gray-400" : ""
            }`}
          >
            Sign in to access your DSA showcase
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className={`block text-sm font-medium mb-2 ${getLabelStyles()}`}
            >
              Username
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className={`pl-10 pr-3 py-2 w-full ${getInputStyles()}`}
                placeholder="Enter your username"
                aria-describedby={
                  errors.username ? "username-error" : undefined
                }
              />
            </div>
            {errors.username && (
              <div
                id="username-error"
                className="mt-1 flex items-center space-x-1 text-red-600 text-sm"
              >
                <AlertCircle size={14} />
                <span>{errors.username}</span>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${getLabelStyles()}`}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`pl-10 pr-3 py-2 w-full ${getInputStyles()}`}
                placeholder="Enter your email"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <div
                id="email-error"
                className="mt-1 flex items-center space-x-1 text-red-600 text-sm"
              >
                <AlertCircle size={14} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          <motion.button
            whileHover={uiLevel !== 'skeleton' && { scale: 1.02 }}
            whileTap={uiLevel !== 'skeleton' && { scale: 0.98 }}
            type="submit"
            className={`w-full py-3 px-4 rounded-md font-medium transition-all ${getButtonStyles()}`}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>

      {showAlert && (
        <LocalStorageAlert
          message="Login successful! Your session has been saved."
          type="success"
          autoClose={true}
          duration={3000}
        />
      )}
    </>
  );
};
