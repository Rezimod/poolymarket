'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Briefcase, Trophy, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const items = [
  { href: '/markets', icon: TrendingUp, label: 'Markets' },
  { href: '/portfolio', icon: Briefcase, label: 'Portfolio' },
  { href: '/leaderboard', icon: Trophy, label: 'Ranks' },
  { href: '/suggest', icon: Lightbulb, label: 'Suggest' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-around border-t border-white/8 bg-surface/90 backdrop-blur-xl px-2 py-2 safe-area-pb">
      {items.map(({ href, icon: Icon, label }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              active ? 'text-gold' : 'text-slate-500'
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
