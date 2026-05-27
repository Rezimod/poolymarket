'use client';

import type { Category } from '@/types';
import { cn } from '@/lib/utils/cn';
import { useLocale } from '@/lib/hooks/useLocale';
import { ALL_MARKETS_FILTER } from '@/lib/data/market-tiers';

interface CategoryFilterProps {
  categories: Category[];
  active: string | null;
  onChange: (slug: string | null) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const { t, categoryName, isKa } = useLocale();

  const pills = [
    { slug: null, name: t('primaryMarkets'), color: '#C9A227' },
    { slug: ALL_MARKETS_FILTER, name: t('all'), color: '#5c4f54' },
    ...categories.map((c) => ({
      slug: c.slug,
      name: categoryName(c),
      color: c.color,
    })),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {pills.map((pill) => (
        <button
          key={pill.slug ?? 'primary'}
          type="button"
          onClick={() => onChange(pill.slug)}
          className={cn(
            'relative shrink-0 rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all border',
            active === pill.slug
              ? 'border-gold/40 bg-gold/10 text-gold'
              : 'border-white/5 text-slate-500 hover:text-slate-200 hover:border-white/10',
            isKa && 'font-georgian'
          )}
        >
          {pill.name}
        </button>
      ))}
    </div>
  );
}
