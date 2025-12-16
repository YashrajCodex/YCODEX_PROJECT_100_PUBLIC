import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface CryptoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  glowEffect?: boolean;
}

export function CryptoCard({
  icon: Icon,
  title,
  description,
  children,
  onClick,
  className = '',
  glowEffect = true,
}: CryptoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={`bg-card border border-border rounded-lg p-6 ${
        onClick ? 'cursor-pointer' : ''
      } ${glowEffect ? 'hover:card-glow' : ''} transition-all ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="text-primary" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          {children}
        </div>
      </div>
    </motion.div>
  );
}