'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Briefcase, Trophy, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useLocale } from '@/lib/hooks/useLocale';
import type { UIKey } from '@/lib/i18n/messages';

const items: { href: string; icon: typeof TrendingUp; labelKey: UIKey }[] = [
  { href: '/markets', icon: TrendingUp, labelKey: 'markets' },
  { href: '/portfolio', icon: Briefcase, labelKey: 'portfolio' },
  { href: '/leaderboard', icon: Trophy, labelKey: 'leaderboard' },
  { href: '/suggest', icon: Lightbulb, labelKey: 'suggest' },
];

export function MobileNav() {
  const pathname = usePathname();
  const { t, isKa } = useLocale();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-around border-t border-white/8 bg-surface/90 backdrop-blur-xl px-2 py-2 safe-area-pb">
      {items.map(({ href, icon: Icon, labelKey }) => {
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
            <span className={cn(isKa && 'font-georgian text-[10px]')}>{t(labelKey)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
