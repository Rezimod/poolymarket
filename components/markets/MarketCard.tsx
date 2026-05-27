'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Market } from '@/types';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { ProbabilityBar } from './ProbabilityBar';
import { CountUp } from '@/components/shared/CountUp';
import { formatVolume, formatDate } from '@/lib/utils/format';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn } from '@/lib/utils/cn';

interface MarketCardProps {
  market: Market;
  index?: number;
}

export function MarketCard({ market, index = 0 }: MarketCardProps) {
  const { locale, marketTitle, isKa, t } = useLocale();
  const title = marketTitle(market);
  const yesCents = Math.round(market.yes_price * 100);
  const noCents = 100 - yesCents;
  const isActive = market.total_volume > 150000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.025, 0.35), duration: 0.35 }}
    >
      <div className="group premium-card flex h-full flex-col overflow-hidden p-5 transition-all hover:shadow-premium">
        <Link href={`/markets/${market.id}`} className="flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            {market.category && <CategoryBadge category={market.category} />}
            {isActive && (
              <span
                className={cn(
                  'text-[10px] uppercase tracking-widest text-gold/80',
                  isKa && 'font-georgian normal-case tracking-normal'
                )}
              >
                {t('hot')}
              </span>
            )}
          </div>

          <h3
            className={cn(
              'font-sora line-clamp-3 text-[15px] font-medium leading-snug text-white/95 group-hover:text-gold transition-colors',
              isKa && 'font-georgian font-normal'
            )}
          >
            {title}
          </h3>

          <div className="flex items-end justify-between border-t border-white/5 pt-4">
            <div>
              <p className={cn('text-[10px] uppercase tracking-widest text-slate-600 mb-1', isKa && 'font-georgian')}>
                {t('chance')}
              </p>
              <p className="font-sora text-2xl font-semibold text-yes tabular-nums">
                <CountUp value={market.yes_price * 100} decimals={0} />%
              </p>
            </div>
            <div className="text-right text-[11px] text-slate-500 tabular-nums space-y-1">
              <p>{formatVolume(market.total_volume)}</p>
              <p>{formatDate(market.end_date, locale)}</p>
            </div>
          </div>

          <ProbabilityBar yesPrice={market.yes_price} size="sm" showLabels={false} />
        </Link>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/markets/${market.id}?side=yes`}
            className={cn(
              'rounded-md border border-yes/20 bg-yes/5 py-2 text-center text-xs font-medium text-yes hover:bg-yes/10 transition-colors',
              isKa && 'font-georgian'
            )}
          >
            {t('yesLabel')} {yesCents}¢
          </Link>
          <Link
            href={`/markets/${market.id}?side=no`}
            className={cn(
              'rounded-md border border-no/20 bg-no/5 py-2 text-center text-xs font-medium text-no hover:bg-no/10 transition-colors',
              isKa && 'font-georgian'
            )}
          >
            {t('noLabel')} {noCents}¢
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
