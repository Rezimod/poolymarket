'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Briefcase,
  Trophy,
  Lightbulb,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUserStore } from '@/stores/userStore';
import { formatLariPoints } from '@/lib/utils/format';
import { MOCK_MARKETS } from '@/lib/data/mock';

const navItems = [
  { href: '/markets', label: 'Markets', icon: TrendingUp },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/leaderboard', label: 'Rankings', icon: Trophy },
  { href: '/suggest', label: 'Suggest', icon: Lightbulb },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useUserStore();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-gold/10 bg-surface/80 backdrop-blur-xl h-screen sticky top-0">
      <div className="p-5 border-b border-gold/10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-wine/20 text-2xl border border-wine/30">
            🇬🇪
          </span>
          <div>
            <p className="font-sora font-bold text-white leading-none tracking-tight">Pooly</p>
            <p className="font-sora font-bold text-gold leading-none tracking-tight">market</p>
            <p className="text-[10px] text-slate-500 mt-1">{MOCK_MARKETS.length} markets live</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active ? 'text-gold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-gold/10 border border-gold/20"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {profile && (
        <div className="p-4 border-t border-gold/10">
          <div className="glass-card p-3 border-gold/15">
            <p className="text-xs text-slate-500 mb-1">Balance</p>
            <p className="font-sora font-bold text-gold text-lg">
              {formatLariPoints(profile.lari_points)}
            </p>
            <p className="text-xs text-slate-500 mt-1">{profile.rank}</p>
          </div>
          <Link
            href={`/profile/${profile.username}`}
            className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </div>
      )}
    </aside>
  );
}
