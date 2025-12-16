import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface XPNotificationProps {
  xp: number;
  show: boolean;
  onComplete?: () => void;
}

export function XPNotification({ xp, show, onComplete }: XPNotificationProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <Sparkles className="text-primary-foreground" size={20} />
            <span className="text-primary-foreground font-bold text-lg font-mono">
              +{xp} XP
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}