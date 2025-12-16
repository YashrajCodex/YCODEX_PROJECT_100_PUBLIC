import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({ 
  current, 
  max, 
  label, 
  showPercentage = true,
  className = '' 
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span className="text-primary font-mono font-semibold">
              {current} / {max}
            </span>
          )}
        </div>
      )}
      <div className="h-3 bg-secondary rounded-full overflow-hidden border border-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ boxShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
        />
      </div>
    </div>
  );
}