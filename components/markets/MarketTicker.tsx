'use client';

import Link from 'next/link';
import type { Market } from '@/types';
import { formatVolume } from '@/lib/utils/format';

interface MarketTickerProps {
  markets: Market[];
}

export function MarketTicker({ markets }: MarketTickerProps) {
  const hot = [...markets]
    .sort((a, b) => b.total_volume - a.total_volume)
    .slice(0, 12);

  const items = [...hot, ...hot];

  return (
    <div className="relative overflow-hidden border-b border-gold/10 bg-surface/60 py-2">
      <div className="market-ticker flex w-max gap-8 whitespace-nowrap px-4">
        {items.map((m, i) => (
          <Link
            key={`${m.id}-${i}`}
            href={`/markets/${m.id}`}
            className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
          >
            <span className="text-lg">{m.image_url ?? '📊'}</span>
            <span className="text-slate-300 max-w-[200px] truncate">{m.title}</span>
            <span className="font-semibold text-yes">{Math.round(m.yes_price * 100)}%</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-500">{formatVolume(m.total_volume)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
