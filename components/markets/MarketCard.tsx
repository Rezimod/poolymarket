'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Market } from '@/types';
import { Card } from '@/components/ui/Card';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { ProbabilityBar } from './ProbabilityBar';
import { CountUp } from '@/components/shared/CountUp';
import { formatVolume, formatDate } from '@/lib/utils/format';
import { useUserStore } from '@/stores/userStore';
import { Clock, TrendingUp } from 'lucide-react';

interface MarketCardProps {
  market: Market;
  index?: number;
}

export function MarketCard({ market, index = 0 }: MarketCardProps) {
  const locale = useUserStore((s) => s.locale);
  const title = locale === 'ka' && market.title_ka ? market.title_ka : market.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/markets/${market.id}`}>
        <Card hover className="group cursor-pointer">
          <div className="flex flex-col gap-3">
            {market.category && <CategoryBadge category={market.category} />}
            <h3 className="font-sora line-clamp-2 text-base font-semibold leading-snug text-white group-hover:text-teal transition-colors">
              {title}
            </h3>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-0.5">YES probability</p>
                <p className="font-sora text-2xl font-bold text-yes">
                  <CountUp value={market.yes_price * 100} decimals={0} />
                </p>
              </div>
              <div className="text-right text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-1 justify-end">
                  <TrendingUp className="h-3 w-3" />
                  {formatVolume(market.total_volume)} vol
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <Clock className="h-3 w-3" />
                  {formatDate(market.end_date, locale)}
                </div>
              </div>
            </div>
            <ProbabilityBar yesPrice={market.yes_price} />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
