'use client';

import type { Category } from '@/types';
import { cn } from '@/lib/utils/cn';
import { useLocale } from '@/lib/hooks/useLocale';

interface CategoryFilterProps {
  categories: Category[];
  active: string | null;
  onChange: (slug: string | null) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const { t, categoryName, isKa } = useLocale();

  const pills = [
    { slug: null, name: t('all'), icon: '✨', color: '#D4A843' },
    ...categories.map((c) => ({
      slug: c.slug,
      name: categoryName(c),
      icon: c.icon,
      color: c.color,
    })),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {pills.map((pill) => (
        <button
          key={pill.slug ?? 'all'}
          type="button"
          onClick={() => onChange(pill.slug)}
          className={cn(
            'relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors border',
            active === pill.slug
              ? 'border-transparent text-white'
              : 'border-gold/10 text-slate-400 hover:text-white hover:border-gold/25'
          )}
          style={
            active === pill.slug
              ? { backgroundColor: pill.color, borderColor: pill.color }
              : undefined
          }
        >
          <span className="relative z-10">{pill.icon}</span>
          <span className={cn('relative z-10 whitespace-nowrap', isKa && 'font-georgian')}>{pill.name}</span>
        </button>
      ))}
    </div>
  );
}
