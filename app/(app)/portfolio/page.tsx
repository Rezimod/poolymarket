'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { ProbabilityBar } from '@/components/markets/ProbabilityBar';
import { useUserStore } from '@/stores/userStore';
import { MOCK_POSITIONS } from '@/lib/data/mock';
import { formatLariPoints, formatDate } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { TrendingUp, TrendingDown, Gift } from 'lucide-react';

export default function PortfolioPage() {
  const { profile, locale, initDemoUser } = useUserStore();

  if (!profile) {
    return (
      <>
        <TopBar />
        <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
          <p className="text-4xl mb-4">📊</p>
          <h2 className="font-sora text-xl font-bold text-white mb-2">Your Portfolio</h2>
          <p className="text-slate-400 mb-6">Sign in to track your positions and PnL</p>
          <Button onClick={initDemoUser}>Start with 1,000 ₾P</Button>
        </div>
      </>
    );
  }

  const totalValue = MOCK_POSITIONS.reduce((sum, p) => {
    const current = p.market?.yes_price ?? 0.5;
    const price = p.side === 'yes' ? current : 1 - current;
    return sum + p.shares * price * 100;
  }, 0);

  const unrealizedPnl = totalValue - MOCK_POSITIONS.reduce((s, p) => s + p.shares * p.avg_price * 100, 0);

  return (
    <>
      <TopBar />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-4 lg:p-6 max-w-4xl mx-auto w-full space-y-6"
      >
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Balance', value: formatLariPoints(profile.lari_points, locale), color: 'text-teal' },
            { label: 'Portfolio Value', value: formatLariPoints(totalValue, locale), color: 'text-white' },
            {
              label: 'Unrealized PnL',
              value: `${unrealizedPnl >= 0 ? '+' : ''}${formatLariPoints(unrealizedPnl, locale)}`,
              color: unrealizedPnl >= 0 ? 'text-yes' : 'text-no',
            },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-card p-4">
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className={cn('font-sora text-xl font-bold', color)}>{value}</p>
            </div>
          ))}
        </div>

        <section>
          <h2 className="font-sora text-lg font-semibold text-white mb-4">Active Positions</h2>
          <div className="space-y-3">
            {MOCK_POSITIONS.map((pos) => {
              const current = pos.market?.yes_price ?? 0.5;
              const mktPrice = pos.side === 'yes' ? current : 1 - current;
              const value = Math.floor(pos.shares * mktPrice * 100);
              const cost = Math.floor(pos.shares * pos.avg_price * 100);
              const pnl = value - cost;
              const title =
                locale === 'ka' && pos.market?.title_ka
                  ? pos.market.title_ka
                  : pos.market?.title;

              return (
                <Link key={pos.id} href={`/markets/${pos.market_id}`}>
                  <div className="glass-card p-4 hover:border-teal/30 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            'text-xs font-bold uppercase px-2 py-0.5 rounded',
                            pos.side === 'yes' ? 'bg-yes/15 text-yes' : 'bg-no/15 text-no'
                          )}
                        >
                          {pos.side}
                        </span>
                        <p className="font-medium text-white mt-1 line-clamp-2">{title}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-white">{formatLariPoints(value, locale)}</p>
                        <p className={cn('text-sm flex items-center gap-0.5 justify-end', pnl >= 0 ? 'text-yes' : 'text-no')}>
                          {pnl >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {pnl >= 0 ? '+' : ''}{formatLariPoints(pnl, locale)}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                      <span>{pos.shares} shares @ {(pos.avg_price * 100).toFixed(0)}%</span>
                      <span>Ends {pos.market ? formatDate(pos.market.end_date, locale) : ''}</span>
                    </div>
                    {pos.market && <ProbabilityBar yesPrice={pos.market.yes_price} size="sm" showLabels={false} />}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="h-5 w-5 text-amber" />
            <h2 className="font-sora font-semibold text-white">Rewards</h2>
          </div>
          <p className="text-sm text-slate-400">
            Win Astroman store vouchers by ranking in the top 10 on the weekly leaderboard.
          </p>
          <div className="mt-3 rounded-lg bg-amber/10 border border-amber/20 p-3 text-sm text-amber">
            🎁 Next reward at 5,000 ₾P total payout
          </div>
        </section>
      </motion.main>
    </>
  );
}
