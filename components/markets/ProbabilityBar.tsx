'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { useLocale } from '@/lib/hooks/useLocale';

interface ProbabilityBarProps {
  yesPrice: number;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export function ProbabilityBar({ yesPrice, size = 'md', showLabels = true }: ProbabilityBarProps) {
  const { t } = useLocale();
  const yesPercent = Math.round(yesPrice * 100);
  const noPercent = 100 - yesPercent;
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className="w-full">
      {showLabels && (
        <div className="mb-1.5 flex justify-between text-xs font-medium">
          <span className="text-yes">
            {t('yesLabel')} {yesPercent}%
          </span>
          <span className="text-no">
            {t('noLabel')} {noPercent}%
          </span>
        </div>
      )}
      <div className={cn('flex overflow-hidden rounded-full bg-white/5', heights[size])}>
        <motion.div
          className="bg-yes"
          initial={{ width: 0 }}
          animate={{ width: `${yesPercent}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="bg-no"
          initial={{ width: 0 }}
          animate={{ width: `${noPercent}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}
