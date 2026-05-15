'use client';

import type { Market } from '@/types';
import { MarketCard } from './MarketCard';

interface MarketFeedProps {
  markets: Market[];
}

export function MarketFeed({ markets }: MarketFeedProps) {
  if (markets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <p className="font-sora text-lg font-semibold text-white">No markets found</p>
        <p className="text-slate-500 mt-1">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {markets.map((market, i) => (
        <MarketCard key={market.id} market={market} index={i} />
      ))}
    </div>
  );
}
