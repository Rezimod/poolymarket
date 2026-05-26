'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Market } from '@/types';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { ProbabilityBar } from './ProbabilityBar';
import { CountUp } from '@/components/shared/CountUp';
import { formatVolume, formatDate } from '@/lib/utils/format';
import { useUserStore } from '@/stores/userStore';
import { Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MarketCardProps {
  market: Market;
  index?: number;
}

export function MarketCard({ market, index = 0 }: MarketCardProps) {
  const locale = useUserStore((s) => s.locale);
  const title = locale === 'ka' && market.title_ka ? market.title_ka : market.title;
  const yesCents = Math.round(market.yes_price * 100);
  const noCents = 100 - yesCents;
  const isHot = market.total_volume > 150000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.4), duration: 0.3 }}
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gold/10 bg-elevated/80 p-4 transition-all hover:border-wine/30 hover:shadow-glow">
        <Link href={`/markets/${market.id}`} className="flex flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xl">
                {market.image_url ?? '📊'}
              </span>
              <div className="min-w-0">
                {market.category && <CategoryBadge category={market.category} />}
              </div>
            </div>
            {isHot && (
              <span className="shrink-0 rounded-full bg-wine/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-wine">
                Hot
              </span>
            )}
          </div>

          <h3
            className={cn(
              'font-sora line-clamp-3 text-[15px] font-semibold leading-snug text-white group-hover:text-gold transition-colors',
              locale === 'ka' && 'font-georgian'
            )}
          >
            {title}
          </h3>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Chance</p>
              <p className="font-sora text-2xl font-bold text-yes">
                <CountUp value={market.yes_price * 100} decimals={0} />%
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1 justify-end">
                <TrendingUp className="h-3 w-3 text-gold/70" />
                {formatVolume(market.total_volume)}
              </div>
              <div className="flex items-center gap-1 justify-end">
                <Clock className="h-3 w-3" />
                {formatDate(market.end_date, locale)}
              </div>
            </div>
          </div>

          <ProbabilityBar yesPrice={market.yes_price} size="sm" />
        </Link>

        {/* Polymarket-style quick trade buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={`/markets/${market.id}?side=yes`}
            className="rounded-lg border border-yes/30 bg-yes/10 py-2 text-center text-sm font-semibold text-yes hover:bg-yes/20 transition-colors"
          >
            Yes {yesCents}¢
          </Link>
          <Link
            href={`/markets/${market.id}?side=no`}
            className="rounded-lg border border-no/30 bg-no/10 py-2 text-center text-sm font-semibold text-no hover:bg-no/20 transition-colors"
          >
            No {noCents}¢
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
