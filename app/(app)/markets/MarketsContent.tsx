'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TopBar } from '@/components/layout/TopBar';
import { CategoryFilter } from '@/components/markets/CategoryFilter';
import { MarketFeed } from '@/components/markets/MarketFeed';
import { ProbabilityBar } from '@/components/markets/ProbabilityBar';
import { Button } from '@/components/ui/Button';
import { MOCK_MARKETS, MOCK_CATEGORIES } from '@/lib/data/mock';
import type { MarketSort } from '@/lib/data/markets';
import { useUserStore } from '@/stores/userStore';
import { formatVolume } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

const sortOptions: { value: MarketSort; label: string; labelKa: string }[] = [
  { value: 'trending', label: 'Trending', labelKa: 'ტრენდი' },
  { value: 'volume', label: 'Volume', labelKa: 'მოცულობა' },
  { value: 'closing', label: 'Closing Soon', labelKa: 'მალე იხურება' },
  { value: 'new', label: 'New', labelKa: 'ახალი' },
];

export default function MarketsContent() {
  const searchParams = useSearchParams();
  const { profile, locale, initDemoUser } = useUserStore();
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<MarketSort>('trending');
  const [search, setSearch] = useState(searchParams.get('q') ?? '');

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '');
  }, [searchParams]);

  const featured = MOCK_MARKETS.find((m) => m.is_featured) ?? MOCK_MARKETS[0];

  const markets = useMemo(() => {
    let result = [...MOCK_MARKETS];
    if (category) result = result.filter((m) => m.category?.slug === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.title_ka?.toLowerCase().includes(q) ?? false)
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
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-4 lg:p-6 max-w-6xl mx-auto w-full"
      >
        <Link href={`/markets/${featured.id}`}>
          <div className="relative mb-8 overflow-hidden rounded-2xl border border-teal/20 bg-gradient-to-br from-teal/10 via-elevated to-base p-6 md:p-8 cursor-pointer group hover:border-teal/40 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />
            <p className="text-xs font-medium text-teal mb-2">⭐ FEATURED</p>
            <h2 className="font-sora text-xl md:text-2xl font-bold text-white mb-4 max-w-2xl group-hover:text-teal transition-colors">
              {locale === 'ka' && featured.title_ka ? featured.title_ka : featured.title}
            </h2>
            <div className="flex items-end gap-6 mb-4">
              <div>
                <p className="text-4xl md:text-5xl font-sora font-bold text-yes">
                  {Math.round(featured.yes_price * 100)}%
                </p>
                <p className="text-sm text-slate-500">YES probability</p>
              </div>
              <div className="text-sm text-slate-400">
                <p>{formatVolume(featured.total_volume)} volume</p>
              </div>
            </div>
            <ProbabilityBar yesPrice={featured.yes_price} size="lg" />
          </div>
        </Link>

        <CategoryFilter
          categories={MOCK_CATEGORIES}
          active={category}
          onChange={setCategory}
        />

        <div className="flex gap-2 mt-4 mb-6 overflow-x-auto">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                sort === opt.value
                  ? 'bg-white/10 text-white'
                  : 'text-slate-500 hover:text-white'
              )}
            >
              {locale === 'ka' ? opt.labelKa : opt.label}
            </button>
          ))}
        </div>

        <MarketFeed markets={markets} />

        {!profile && (
          <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-40">
            <Button size="lg" onClick={initDemoUser} className="shadow-glow">
              Predict Now — Get 1,000 ₾P Free
            </Button>
          </div>
        )}
      </motion.main>
    </>
  );
}
