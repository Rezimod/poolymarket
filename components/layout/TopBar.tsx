'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';
import { useLocale } from '@/lib/hooks/useLocale';
import { LocaleToggle } from '@/components/shared/LocaleToggle';
import { Button } from '@/components/ui/Button';
import { formatLariPoints } from '@/lib/utils/format';

interface TopBarProps {
  onSearch?: (q: string) => void;
}

export function TopBar({ onSearch }: TopBarProps) {
  const router = useRouter();
  const { profile, initDemoUser } = useUserStore();
  const { locale, t } = useLocale();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
    if (query) router.push(`/markets?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-gold/10 bg-base/90 backdrop-blur-xl px-4 py-3 lg:px-6">
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder={t('searchMarkets')}
            className="w-full rounded-lg bg-white/5 border border-gold/10 pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-600 focus:border-wine/50 focus:outline-none focus:ring-1 focus:ring-wine/30"
          />
        </div>
      </form>

      <div className="flex items-center gap-2">
        <LocaleToggle />

        <button type="button" className="relative rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-wine" />
        </button>

        {profile ? (
          <div className="hidden sm:flex items-center gap-2 rounded-lg bg-gold/10 border border-gold/25 px-3 py-1.5">
            <span className="text-gold font-semibold text-sm">
              {formatLariPoints(profile.lari_points, locale)}
            </span>
          </div>
        ) : (
          <Button size="sm" onClick={initDemoUser}>
            {t('signIn')}
          </Button>
        )}
      </div>
    </header>
  );
}
