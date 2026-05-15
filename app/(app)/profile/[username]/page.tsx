'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { TopBar } from '@/components/layout/TopBar';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { MOCK_LEADERBOARD, MOCK_USER } from '@/lib/data/mock';
import { formatLariPoints, formatVolume } from '@/lib/utils/format';
import { useUserStore } from '@/stores/userStore';

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { locale } = useUserStore();

  const entry =
    MOCK_LEADERBOARD.find((e) => e.profile.username === username) ??
    (username === MOCK_USER.username
      ? { rank: 5, profile: MOCK_USER, volume: MOCK_USER.total_volume, pnl: MOCK_USER.total_pnl, win_rate: 0.55 }
      : null);

  if (!entry) {
    return (
      <>
        <TopBar />
        <div className="flex items-center justify-center flex-1 p-8 text-slate-400">
          User not found
        </div>
      </>
    );
  }

  const { profile } = entry;

  return (
    <>
      <TopBar />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-4 lg:p-6 max-w-lg mx-auto w-full"
      >
        <div className="glass-card p-6 text-center mb-6">
          <UserAvatar username={profile.username} size="lg" className="mx-auto mb-4" />
          <h1 className="font-sora text-2xl font-bold text-white">@{profile.username}</h1>
          <p className="text-teal text-sm font-medium mt-1">{profile.rank}</p>
          <p className="text-slate-500 text-xs mt-1">
            Rank #{entry.rank} · Joined {new Date(profile.created_at || '2025-01-01').getFullYear()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Balance', value: formatLariPoints(profile.lari_points, locale) },
            { label: 'Total PnL', value: formatLariPoints(entry.pnl, locale) },
            { label: 'Volume', value: formatVolume(entry.volume) },
            { label: 'Win Rate', value: `${((entry.win_rate ?? 0) * 100).toFixed(0)}%` },
          ].map(({ label, value }) => (
            <div key={label} className="glass-card p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className="font-sora font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </motion.main>
    </>
  );
}
