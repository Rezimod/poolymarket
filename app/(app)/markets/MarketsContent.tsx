'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TopBar } from '@/components/layout/TopBar';
import { MarketTicker } from '@/components/markets/MarketTicker';
import { CategoryFilter } from '@/components/markets/CategoryFilter';
import { MarketFeed } from '@/components/markets/MarketFeed';
import { ProbabilityBar } from '@/components/markets/ProbabilityBar';
import { Button } from '@/components/ui/Button';
import { MOCK_MARKETS, MOCK_CATEGORIES } from '@/lib/data/mock';
import type { MarketSort } from '@/lib/data/markets';
import { useUserStore } from '@/stores/userStore';
import { useLocale } from '@/lib/hooks/useLocale';
import { formatVolume } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { GWDICT_BASE } from '@/lib/utils/gwdict';

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

  const featured =
    MOCK_MARKETS.find((m) => m.is_featured && m.id === 'm11') ??
    MOCK_MARKETS.find((m) => m.is_featured) ??
    MOCK_MARKETS[0];

  const markets = useMemo(() => {
    let result = [...MOCK_MARKETS];
    if (category) result = result.filter((m) => m.category?.slug === category);
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

  const totalVolume = MOCK_MARKETS.reduce((s, m) => s + m.total_volume, 0);

  return (
    <>
      <TopBar onSearch={setSearch} />
      <MarketTicker markets={MOCK_MARKETS} />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full"
      >
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <span>
            <strong className="text-gold">{MOCK_MARKETS.length}</strong> {t('activeMarkets')}
          </span>
          <span className="text-slate-600">·</span>
          <span>
            <strong className="text-white">{formatVolume(totalVolume)}</strong> {t('totalVolume')}
          </span>
        </div>

        <Link href={`/markets/${featured.id}`}>
          <div className="relative mb-8 overflow-hidden rounded-2xl border border-wine/25 bg-gradient-to-br from-wine/20 via-elevated to-base p-6 md:p-8 cursor-pointer group hover:border-gold/40 transition-all hover:shadow-glow">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute -left-4 top-4 text-6xl opacity-20">{featured.image_url}</div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
              🔥 {t('trending')}
            </p>
            <h2
              className={cn(
                'font-sora text-xl md:text-2xl font-bold text-white mb-4 max-w-2xl group-hover:text-gold transition-colors relative z-10',
                isKa && 'font-georgian'
              )}
            >
              {marketTitle(featured)}
            </h2>
            <div className="flex items-end gap-6 mb-4 relative z-10">
              <div>
                <p className="text-4xl md:text-5xl font-sora font-bold text-yes">
                  {Math.round(featured.yes_price * 100)}%
                </p>
                <p className="text-sm text-slate-500">{t('chance')}</p>
              </div>
              <div className="text-sm text-slate-400">
                <p>
                  {formatVolume(featured.total_volume)} {t('volume')}
                </p>
              </div>
            </div>
            <ProbabilityBar yesPrice={featured.yes_price} size="lg" />
          </div>
        </Link>

        <CategoryFilter categories={MOCK_CATEGORIES} active={category} onChange={setCategory} />

        <div className="flex gap-2 mt-4 mb-6 overflow-x-auto">
          {sortKeys.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSort(opt.value)}
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors border',
                sort === opt.value
                  ? 'bg-gold/20 border-gold/40 text-gold'
                  : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5',
                isKa && 'font-georgian'
              )}
            >
              {t(opt.key)}
            </button>
          ))}
          <span className={cn('ml-auto shrink-0 self-center text-xs text-slate-600', isKa && 'font-georgian')}>
            {markets.length} {t('results')}
          </span>
        </div>

        <MarketFeed markets={markets} />

        <p className={cn('mt-10 text-center text-xs text-slate-600', isKa && 'font-georgian')}>
          {t('nplgNote')}{' '}
          <a
            href={GWDICT_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            {t('nplgLink')}
          </a>
        </p>

        {!profile && (
          <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-40">
            <Button size="lg" onClick={initDemoUser} className="shadow-glow-gold">
              {t('startFree')}
            </Button>
          </div>
        )}
      </motion.main>
    </>
  );
}
