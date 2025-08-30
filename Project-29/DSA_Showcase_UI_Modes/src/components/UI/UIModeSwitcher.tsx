import React, { useState } from "react";
import { motion } from "motion/react";
import { useUILevel, UILevel } from "../../contexts/UILevelContext";
import Modal from "./Modal";

interface uiModeSwitchProps {
  isOpen: boolean;
  onClose: () => void;
}
export function UIModeSwitcher({ isOpen, onClose }: uiModeSwitchProps) {
  const { uiLevel, setUILevel } = useUILevel();
  const modes: { key: UILevel; label: string; description: string }[] = [
    { key: "skeleton", label: "Skeleton", description: "Minimal layout" },
    { key: "basic", label: "Basic", description: "VSCode inspired" },
    { key: "futuristic", label: "Futuristic", description: "Cyber terminal" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <label
          className={`text-lg font-medium ${
            uiLevel !== "skeleton" && `text-gray-700 dark:text-white`
          }`}
        >
          UI Mode
        </label>
        <div className="flex flex-col gap-3">
          {modes.map((mode) => (
            <motion.button
              key={mode.key}
              whileHover={uiLevel !== "skeleton" && { scale: 1.06 }}
              whileTap={uiLevel !== "skeleton" && { scale: 0.98 }}
              onClick={() => setUILevel(mode.key)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                uiLevel === mode.key
                  ? "bg-gray-700 dark:bg-gray-200 text-gray-300 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-200"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              aria-label={`Switch to ${mode.label} UI mode - ${mode.description}`}
            >
              {mode.label}
            </motion.button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
