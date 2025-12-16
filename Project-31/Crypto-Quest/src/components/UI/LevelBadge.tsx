import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function LevelBadge({ level, size = 'md', animated = true }: LevelBadgeProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-xl',
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const BadgeContent = (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative`}
      style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}
    >
      <Shield className="absolute opacity-20" size={iconSizes[size] * 1.5} />
      <span className="font-bold text-primary-foreground z-10 font-mono">
        {level}
      </span>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {BadgeContent}
      </motion.div>
    );
  }

  return BadgeContent;
}