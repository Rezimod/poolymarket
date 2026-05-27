'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TopBar } from '@/components/layout/TopBar';
import { MarketTicker } from '@/components/markets/MarketTicker';
import { CategoryFilter } from '@/components/markets/CategoryFilter';
import { MarketFeed } from '@/components/markets/MarketFeed';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { ProbabilityBar } from '@/components/markets/ProbabilityBar';
import { Button } from '@/components/ui/Button';
import { MOCK_MARKETS, MOCK_CATEGORIES } from '@/lib/data/mock';
import type { MarketSort } from '@/lib/data/markets';
import {
  ALL_MARKETS_FILTER,
  filterSeriousMarkets,
  getPrimaryFeaturedMarket,
} from '@/lib/data/market-tiers';
import { useUserStore } from '@/stores/userStore';
import { useLocale } from '@/lib/hooks/useLocale';
import { formatVolume } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

const sortKeys: { value: MarketSort; key: 'sortTrending' | 'sortVolume' | 'sortClosing' | 'sortNew' }[] = [
  { value: 'trending', key: 'sortTrending' },
  { value: 'volume', key: 'sortVolume' },
  { value: 'closing', key: 'sortClosing' },
  { value: 'new', key: 'sortNew' },
];

export default function MarketsContent() {
  const searchParams = useSearchParams();
  const { profile, initDemoUser } = useUserStore();
  const { t, marketTitle, isKa } = useLocale();
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<MarketSort>('trending');
  const [search, setSearch] = useState(searchParams.get('q') ?? '');

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '');
  }, [searchParams]);

  const featured = getPrimaryFeaturedMarket(MOCK_MARKETS);
  const seriousMarkets = filterSeriousMarkets(MOCK_MARKETS);
  const seriousVolume = seriousMarkets.reduce((s, m) => s + m.total_volume, 0);

  const markets = useMemo(() => {
    let result = [...MOCK_MARKETS];

    if (category === null) {
      result = filterSeriousMarkets(result);
    } else if (category !== ALL_MARKETS_FILTER) {
      result = result.filter((m) => m.category?.slug === category);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.title_ka?.toLowerCase().includes(q) ?? false) ||
          (m.description?.toLowerCase().includes(q) ?? false)
      );
    }

    switch (sort) {
      case 'volume':
        return result.sort((a, b) => b.total_volume - a.total_volume);
      case 'closing':
        return result.sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime());
      case 'new':
        return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      default:
        return result.sort((a, b) => b.total_volume - a.total_volume);
    }
  }, [category, search, sort]);

  return (
    <>
      <TopBar onSearch={setSearch} />
      <MarketTicker markets={seriousMarkets} />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full"
      >
        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-widest text-slate-600">
          <span className={isKa ? 'font-georgian normal-case' : ''}>
            <span className="text-gold tabular-nums">{seriousMarkets.length}</span> {t('activeMarkets')}
          </span>
          <span className="hidden sm:inline text-white/10">|</span>
          <span className={cn('tabular-nums', isKa && 'font-georgian normal-case')}>
            <span className="text-slate-400">{formatVolume(seriousVolume)}</span> {t('totalVolume')}
          </span>
        </div>

        <Link href={`/markets/${featured.id}`}>
          <div className="premium-card relative mb-10 overflow-hidden p-6 md:p-8 cursor-pointer group hover:shadow-premium transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-wine/5 via-transparent to-gold/5 pointer-events-none" />
            <div className="relative z-10">
              {featured.category && (
                <div className="mb-4">
                  <CategoryBadge category={featured.category} />
                </div>
              )}
              <p className={cn('text-[10px] uppercase tracking-[0.2em] text-gold/70 mb-3', isKa && 'font-georgian')}>
                {t('trending')}
              </p>
              <h2
                className={cn(
                  'font-sora text-xl md:text-2xl font-medium text-white mb-6 max-w-3xl group-hover:text-gold/90 transition-colors leading-snug',
                  isKa && 'font-georgian font-normal'
                )}
              >
                {marketTitle(featured)}
              </h2>
              <div className="flex items-end gap-8 mb-5">
                <div>
                  <p className="font-sora text-4xl md:text-5xl font-semibold text-yes tabular-nums">
                    {Math.round(featured.yes_price * 100)}%
                  </p>
                  <p className={cn('text-xs text-slate-600 mt-1', isKa && 'font-georgian')}>{t('chance')}</p>
                </div>
                <p className={cn('text-sm text-slate-500 tabular-nums pb-1', isKa && 'font-georgian')}>
                  {formatVolume(featured.total_volume)} {t('volume')}
                </p>
              </div>
              <ProbabilityBar yesPrice={featured.yes_price} size="md" />
            </div>
          </div>
        </Link>

        <CategoryFilter categories={MOCK_CATEGORIES} active={category} onChange={setCategory} />

        <div className="flex gap-2 mt-6 mb-8 overflow-x-auto">
          {sortKeys.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSort(opt.value)}
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide transition-colors border',
                sort === opt.value
                  ? 'border-gold/30 bg-gold/10 text-gold'
                  : 'border-transparent text-slate-600 hover:text-slate-300',
                isKa && 'font-georgian normal-case'
              )}
            >
              {t(opt.key)}
            </button>
          ))}
          <span className={cn('ml-auto shrink-0 self-center text-xs text-slate-600 tabular-nums', isKa && 'font-georgian')}>
            {markets.length} {t('results')}
          </span>
        </div>

        <MarketFeed markets={markets} />

        {!profile && (
          <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-40">
            <Button size="lg" onClick={initDemoUser} className={cn('shadow-glow-gold', isKa && 'font-georgian')}>
              {t('startFree')}
            </Button>
          </div>
        )}
      </motion.main>
    </>
  );
}
