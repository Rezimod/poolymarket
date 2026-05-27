'use client';

import Link from 'next/link';
import type { Market } from '@/types';
import { filterSeriousMarkets } from '@/lib/data/market-tiers';
import { formatVolume } from '@/lib/utils/format';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn } from '@/lib/utils/cn';

interface MarketTickerProps {
  markets: Market[];
}

export function MarketTicker({ markets: allMarkets }: MarketTickerProps) {
  const { marketTitle, isKa } = useLocale();
  const markets = filterSeriousMarkets(allMarkets);
  const hot = [...markets]
    .sort((a, b) => b.total_volume - a.total_volume)
    .slice(0, 12);

  const items = [...hot, ...hot];

  return (
    <div className="relative overflow-hidden border-b border-white/5 bg-surface/80 py-2.5">
      <div className="market-ticker flex w-max gap-8 whitespace-nowrap px-4">
        {items.map((m, i) => (
          <Link
            key={`${m.id}-${i}`}
            href={`/markets/${m.id}`}
            className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
          >
            <span className="text-lg">{m.image_url ?? '·'}</span>
            <span className={cn('text-slate-300 max-w-[220px] truncate', isKa && 'font-georgian')}>
              {marketTitle(m)}
            </span>
            <span className="font-semibold text-yes">{Math.round(m.yes_price * 100)}%</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-500">{formatVolume(m.total_volume)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
