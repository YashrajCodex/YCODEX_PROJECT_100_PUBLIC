import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { useUILevel } from "../../contexts/UILevelContext";
import problemDetails from "@/data/problemDetails";

interface FunctionInputProps {
  select?: {
    label: string;
    options: {
      key: string | number;
      value: string;
      name: string;
    }[];
  };
  inputs: {
    type: "text" | "number";
    label: string;
    name: string;
    placeholder?: string;
  }[];
  onExecute: (inputValues: Record<string, any>) => any;
  result?: any;
  onResultChange?: (result: any) => void;
}

export const FunctionInput: React.FC<FunctionInputProps> = ({
  inputs,
  select: selectInput,
  onExecute,
  result,
  onResultChange,
}) => {
  const { uiLevel } = useUILevel();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [localResult, setLocalResult] = useState<any>(result);
  const [ifSelectValue, setIfSelectValue] = useState<string>(
    selectInput ? selectInput.options[0]?.value : ""
  );

  // Initialize form data with empty values
  useEffect(() => {
    const initialData: Record<string, any> = {};
    inputs.forEach((input) => {
      initialData[input.name] = input.type === "number" ? 0 : "";
    });
    setFormData(initialData);
  }, [inputs]);
  // Sync local result with prop result

  useEffect(() => {
    setLocalResult(result);
  }, [result]);

  const getContainerStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
      case "basic":
        return "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg";
      case "futuristic":
        return "border border-green-500 shadow-xl shadow-green-500/20";
      default:
        return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
    }
  };

  const getInputStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
      // return 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100';
      case "basic":
        return "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400";
      case "futuristic":
        return "border border-green-700 bg-black text-green-300 placeholder-green-600 focus:border-green-500 focus:shadow-md focus:shadow-green-500/30";
      default:
        return "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";
    }
  };

  const getButtonStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        // return 'bg-gray-600 text-white hover:bg-gray-700';
        return "";
      case "basic":
        return "bg-blue-600 text-white hover:bg-blue-700";
      case "futuristic":
        return "bg-green-600 text-black hover:bg-green-500 shadow-md shadow-green-500/50 border border-green-400";
      default:
        return "bg-gray-600 text-white hover:bg-gray-700";
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

  const getLabelStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-300";
      case "skeleton":
        return "";
      default:
        return "text-gray-700 dark:text-gray-300";
    }
  };

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === "number" ? Number(value) : value,
    }));
  };

  // Main execution handler - processes input and calls onExecute
  const handleExecute = async () => {
    try {
      setIsExecuting(true);

      // console.log("Executing with processed data:", formData);

      // Execute the function and get result
      // console.log(ifSelectValue)
      const data = ifSelectValue
        ? { ...formData, ifSelectValue }
        : { ...formData };
      const executionResult = onExecute(data);

      // Update result state
      setLocalResult(executionResult);
      if (onResultChange) {
        onResultChange(executionResult);
      }

      // console.log("Execution result:", executionResult);

      // Auto-clear after 5 seconds
      setTimeout(() => {
        handleReset();
      }, 5000);
    } catch (error) {
      console.error("Execution error:", error);
      const errorResult = `Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
      setLocalResult(errorResult);
      if (onResultChange) {
        onResultChange(errorResult);
      }
    } finally {
      setIsExecuting(false);
    }
  };

  // Reset form and result
  const handleReset = () => {
    const resetData: Record<string, any> = {};
    inputs.forEach((input) => {
      resetData[input.name] = input.type === "number" ? 0 : "";
    });
    setFormData(resetData);
    setLocalResult(null);
    if (onResultChange) {
      onResultChange(null);
    }
  };

  return (
    <motion.div
      initial={uiLevel !== "skeleton" && { opacity: 0, y: 20 }}
      animate={uiLevel !== "skeleton" && { opacity: 1, y: 0 }}
      className={`rounded-lg p-6 mb-8 ${getContainerStyles()}`}
    >
      <h3 className={`text-xl font-semibold mb-6 ${getTitleStyles()}`}>
        Test Function
      </h3>

      {/* Input Form */}
      <div className="space-y-4 mb-6">
        {inputs.length === 0
          ? "Empty input"
          : inputs.map((input) => (
              <div key={input.name}>
                <label
                  htmlFor={input.name}
                  className={`block text-sm font-medium mb-2 ${getLabelStyles()}`}
                >
                  {input.label}
                </label>
                <input
                  id={input.name}
                  type={input.type}
                  value={formData[input.name] || ""}
                  onChange={(e) =>
                    handleInputChange(input.name, e.target.value)
                  }
                  placeholder={input.placeholder}
                  className={`w-full px-3 py-2 rounded-md text-sm ${getInputStyles()}`}
                />
              </div>
            ))}
      </div>
      {selectInput && (
        <select
          id={selectInput?.label}
          value={ifSelectValue}
          onChange={(e) => setIfSelectValue(e.target.value)}
          className={`block text-sm font-medium mb-2 ${getLabelStyles()}`}
        >
          {selectInput?.label}
          {selectInput?.options.map((opt) => (
            <option key={opt?.key} value={opt?.value}>
              {opt?.name}
            </option>
          ))}
        </select>
      )}
      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap select-none">
        {inputs.length !== 0 && (
          <>
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${getButtonStyles()} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Play size={16} />
              <span>{isExecuting ? "Executing..." : "Execute"}</span>
            </button>

            <button
              onClick={handleReset}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all border ${
                uiLevel !== "skeleton"
                  ? uiLevel === "futuristic"
                    ? "border-green-700 text-green-400 hover:bg-green-900/30"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  : ""
              }`}
            >
              <RotateCcw size={16} />
              <span>Reset...</span>
            </button>
          </>
        )}
      </div>

      {/* Result Display */}
      {localResult !== null && localResult !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-md ${
            uiLevel !== "skeleton"
              ? uiLevel === "futuristic"
                ? "bg-black border border-green-700"
                : "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
              : ""
          }`}
        >
          <h4
            className={`text-sm font-medium mb-2 ${
              uiLevel !== "skeleton"
                ? uiLevel === "futuristic"
                  ? "text-green-400"
                  : "text-gray-700 dark:text-gray-300"
                : ""
            }`}
          >
            Output:
          </h4>
          <pre
            className={`text-sm font-mono ${
              uiLevel !== "skeleton"
                ? uiLevel === "futuristic"
                  ? "text-green-300"
                  : "text-gray-900 dark:text-gray-100"
                : ""
            }`}
          >
            {typeof localResult === "object"
              ? JSON.stringify(localResult, null, 2)
              : String(localResult)}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
};
