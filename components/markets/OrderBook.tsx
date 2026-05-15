'use client';

import { cn } from '@/lib/utils/cn';

interface OrderBookLevel {
  price: number;
  shares: number;
}

interface OrderBookProps {
  yesBids: OrderBookLevel[];
  noAsks: OrderBookLevel[];
}

export function OrderBook({ yesBids, noAsks }: OrderBookProps) {
  const maxShares = Math.max(
    ...yesBids.map((l) => l.shares),
    ...noAsks.map((l) => l.shares),
    1
  );

  return (
    <div className="glass-card p-4">
      <h3 className="font-sora text-sm font-semibold text-slate-300 mb-3">Order Book</h3>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-yes font-medium mb-2">YES Bids</p>
          {yesBids.map((level, i) => (
            <OrderRow key={i} level={level} side="yes" max={maxShares} />
          ))}
        </div>
        <div>
          <p className="text-no font-medium mb-2">NO Bids</p>
          {noAsks.map((level, i) => (
            <OrderRow key={i} level={level} side="no" max={maxShares} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderRow({
  level,
  side,
  max,
}: {
  level: OrderBookLevel;
  side: 'yes' | 'no';
  max: number;
}) {
  const width = (level.shares / max) * 100;
  return (
    <div className="relative flex justify-between py-1 mb-0.5">
      <div
        className={cn(
          'absolute inset-y-0 right-0 opacity-20 rounded',
          side === 'yes' ? 'bg-yes' : 'bg-no'
        )}
        style={{ width: `${width}%` }}
      />
      <span className={cn('relative z-10', side === 'yes' ? 'text-yes' : 'text-no')}>
        {(level.price * 100).toFixed(0)}¢
      </span>
      <span className="relative z-10 text-slate-400">{level.shares}</span>
    </div>
  );
}

export function generateMockOrderBook(yesPrice: number) {
  const yesBids = Array.from({ length: 5 }, (_, i) => ({
    price: yesPrice - i * 0.02,
    shares: Math.floor(Math.random() * 200) + 20,
  }));
  const noAsks = Array.from({ length: 5 }, (_, i) => ({
    price: 1 - yesPrice - i * 0.02,
    shares: Math.floor(Math.random() * 200) + 20,
  }));
  return { yesBids, noAsks };
}
