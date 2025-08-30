
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { useUILevel } from '@/contexts/UILevelContext';

interface CopyIconProps {
  text: string;
  className?: string;
}

export const CopyIcon: React.FC<CopyIconProps> = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const {uiLevel} = useUILevel()
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // console.error('Failed to copy text: ', err);
      alert(`Error in copying: ${err}`)
    }
  };

  return (
    <motion.button
      whileHover={uiLevel !== 'skeleton' && { scale: 1.1 }}
      whileTap={uiLevel !== 'skeleton' && { scale: 0.9 }}
      onClick={handleCopy}
      className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check size={16} className="text-green-500" />
      ) : (
        <Copy size={16} className="text-gray-500 dark:text-gray-400" />
      )}
    </motion.button>
  );
};
