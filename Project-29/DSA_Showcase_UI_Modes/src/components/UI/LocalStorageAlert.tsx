
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LocalStorageAlertProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  autoClose?: boolean;
  duration?: number;
}

export const LocalStorageAlert: React.FC<LocalStorageAlertProps> = ({
  message,
  type = 'info',
  autoClose = true,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-400 dark:text-green-300';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-400 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900 dark:border-red-400 dark:text-red-300';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-300';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 p-4 border-l-4 rounded-md shadow-lg max-w-md ${getColorClasses()}`}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{message}</p>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
              aria-label="Close alert"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
