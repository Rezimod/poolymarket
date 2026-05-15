'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Trade } from '@/types';
import { formatRelativeTime } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface RecentTradesProps {
  trades: Trade[];
}

export function RecentTrades({ trades }: RecentTradesProps) {
  return (
    <div className="glass-card p-4">
      <h3 className="font-sora text-sm font-semibold text-slate-300 mb-3">Recent Trades</h3>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        <AnimatePresence initial={false}>
          {trades.length === 0 ? (
            <p className="text-slate-500 text-sm py-4 text-center">No trades yet</p>
          ) : (
            trades.map((trade) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between py-2 border-b border-white/5 text-sm"
              >
                <span
                  className={cn(
                    'font-semibold',
                    trade.side === 'yes' ? 'text-yes' : 'text-no'
                  )}
                >
                  {trade.side.toUpperCase()}
                </span>
                <span className="text-white">{(trade.price * 100).toFixed(1)}%</span>
                <span className="text-slate-400">{trade.shares} shares</span>
                <span className="text-slate-500 text-xs">{formatRelativeTime(trade.created_at)}</span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
