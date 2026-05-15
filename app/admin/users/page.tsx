'use client';

import { MOCK_LEADERBOARD } from '@/lib/data/mock';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { formatLariPoints, formatVolume } from '@/lib/utils/format';

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="font-sora text-2xl font-bold text-white mb-6">User Management</h1>
      <div className="space-y-2">
        {MOCK_LEADERBOARD.map((entry) => (
          <div key={entry.profile.id} className="glass-card p-4 flex items-center gap-4">
            <UserAvatar username={entry.profile.username} />
            <div className="flex-1">
              <p className="font-medium text-white">@{entry.profile.username}</p>
              <p className="text-xs text-slate-500">{entry.profile.rank}</p>
            </div>
            <div className="text-right text-sm">
              <p className="text-teal">{formatLariPoints(entry.profile.lari_points)}</p>
              <p className="text-slate-500">{formatVolume(entry.volume)} vol</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4">
        Connect Supabase for live user management and admin role checks.
      </p>
    </div>
  );
}
