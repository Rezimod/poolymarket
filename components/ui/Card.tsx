'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  if (hover) {
    return (
      <motion.div
        className={cn('glass-card p-4 md:p-5', className)}
        onClick={onClick}
        whileHover={{
          y: -4,
          boxShadow: '0 8px 32px -8px rgba(0,212,170,0.3)',
          transition: { type: 'spring', stiffness: 400, damping: 30 },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn('glass-card p-4 md:p-5', className)} onClick={onClick}>
      {children}
    </div>
  );
}
