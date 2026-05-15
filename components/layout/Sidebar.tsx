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

const navItems = [
  { href: '/markets', label: 'Markets', labelKa: 'ბაზრები', icon: TrendingUp },
  { href: '/portfolio', label: 'Portfolio', labelKa: 'პორტფელი', icon: Briefcase },
  { href: '/leaderboard', label: 'Leaderboard', labelKa: 'ლიდერბორდი', icon: Trophy },
  { href: '/suggest', label: 'Suggest', labelKa: 'შემოთავაზება', icon: Lightbulb },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile, locale } = useUserStore();

  return (
    <aside className="hidden lg:flex w-60 flex-col border-r border-white/8 bg-surface/50 backdrop-blur-xl h-screen sticky top-0">
      <div className="p-5 border-b border-white/8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🇬🇪</span>
          <div>
            <p className="font-sora font-bold text-white leading-none">Pooly</p>
            <p className="font-sora font-bold text-teal leading-none">market</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, labelKa, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active ? 'text-teal' : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-teal/10 border border-teal/20"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{locale === 'ka' ? labelKa : label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {profile && (
        <div className="p-4 border-t border-white/8">
          <div className="glass-card p-3">
            <p className="text-xs text-slate-500 mb-1">Balance</p>
            <p className="font-sora font-bold text-teal text-lg">
              {formatLariPoints(profile.lari_points, locale)}
            </p>
            <p className="text-xs text-slate-500 mt-1">{profile.rank}</p>
          </div>
          <Link
            href={`/profile/${profile.username}`}
            className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5"
          >
            <User className="h-4 w-4" />
            {locale === 'ka' ? 'პროფილი' : 'Profile'}
          </Link>
        </div>
      )}
    </aside>
  );
}
