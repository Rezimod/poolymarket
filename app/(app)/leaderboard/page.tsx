'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { MOCK_LEADERBOARD } from '@/lib/data/mock';
import { useUserStore } from '@/stores/userStore';
import { useLocale } from '@/lib/hooks/useLocale';
import { formatLariPoints, formatVolume } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { Crown, Medal } from 'lucide-react';

type Period = 'weekly' | 'monthly' | 'alltime';

export default function LeaderboardPage() {
  const { profile } = useUserStore();
  const { locale, t, isKa } = useLocale();
  const [period, setPeriod] = useState<Period>('weekly');
  const entries = MOCK_LEADERBOARD;

  const medals = [
    { rank: 1, color: 'text-amber', bg: 'bg-amber/15 border-amber/30', icon: Crown },
    { rank: 2, color: 'text-slate-300', bg: 'bg-slate-400/15 border-slate-400/30', icon: Medal },
    { rank: 3, color: 'text-amber-700', bg: 'bg-amber-900/15 border-amber-800/30', icon: Medal },
  ];

  const userEntry = entries.find((e) => e.profile.id === profile?.id || e.profile.username === profile?.username);
  const userInTop20 = userEntry && userEntry.rank <= 20;

  return (
    <>
      <TopBar />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-4 lg:p-6 max-w-3xl mx-auto w-full"
      >
        <h1 className={cn('font-sora text-2xl font-bold text-white mb-2', isKa && 'font-georgian')}>
          {t('leaderboard')}
        </h1>
        <p className={cn('text-slate-400 text-sm mb-6', isKa && 'font-georgian')}>{t('topPredictors')}</p>

        <div className="flex gap-2 mb-6">
          {(['weekly', 'monthly', 'alltime'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors',
                period === p ? 'bg-teal text-[#0B0E1A]' : 'text-slate-400 hover:text-white bg-white/5'
              )}
            >
              {p === 'weekly' ? t('weekly') : p === 'monthly' ? t('monthly') : t('allTime')}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[entries[1], entries[0], entries[2]].map((entry, i) => {
            if (!entry) return null;
            const medal = medals[entry.rank - 1];
            const heights = ['mt-8', 'mt-0', 'mt-12'];
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn('glass-card p-4 text-center border', medal?.bg, heights[i])}
              >
                {medal && <medal.icon className={cn('h-6 w-6 mx-auto mb-2', medal.color)} />}
                <UserAvatar username={entry.profile.username} size="lg" className="mx-auto mb-2" />
                <p className="font-semibold text-white text-sm truncate">@{entry.profile.username}</p>
                <p className="text-teal font-bold text-sm mt-1">
                  {formatLariPoints(entry.pnl, locale)}
                </p>
                <p className={cn('text-xs text-slate-500', isKa && 'font-georgian')}>
                  {formatVolume(entry.volume)} {t('volShort')}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Full list */}
        <div className="space-y-2">
          {entries.slice(3).map((entry) => (
            <div
              key={entry.rank}
              className={cn(
                'flex items-center gap-4 glass-card p-3',
                entry.profile.username === profile?.username && 'border-teal/30'
              )}
            >
              <span className="text-slate-500 font-mono text-sm w-6">#{entry.rank}</span>
              <UserAvatar username={entry.profile.username} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">@{entry.profile.username}</p>
                <p className="text-xs text-slate-500">{entry.profile.rank}</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-teal font-semibold">{formatLariPoints(entry.pnl, locale)}</p>
                <p className={cn('text-slate-500 text-xs', isKa && 'font-georgian')}>
                  {(entry.win_rate * 100).toFixed(0)}% {t('winRate')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {profile && !userInTop20 && userEntry && (
          <div className="fixed bottom-20 lg:bottom-4 left-4 right-4 lg:left-auto lg:right-8 lg:w-96">
            <div className="glass-card p-3 flex items-center gap-3 border-teal/30">
              <span className="text-slate-500 font-mono text-sm">#{userEntry.rank}</span>
              <UserAvatar username={profile.username} size="sm" />
              <div className="flex-1">
                <p className={cn('text-sm font-medium text-white', isKa && 'font-georgian')}>{t('you')}</p>
                <p className="text-xs text-teal">{formatLariPoints(userEntry.pnl, locale)}</p>
              </div>
            </div>
          </div>
        )}
      </motion.main>
    </>
  );
}
