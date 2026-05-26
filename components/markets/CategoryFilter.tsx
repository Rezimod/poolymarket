'use client';

import { motion } from 'framer-motion';
import type { Category } from '@/types';
import { cn } from '@/lib/utils/cn';
interface CategoryFilterProps {
  categories: Category[];
  active: string | null;
  onChange: (slug: string | null) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const pills = [
    { slug: null, name: 'All', icon: '✨', color: '#D4A843' },
    ...categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      icon: c.icon,
      color: c.color,
    })),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {pills.map((pill) => (
        <button
          key={pill.slug ?? 'all'}
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
          {active === pill.slug && pill.slug === null && (
            <motion.div
              layoutId="category-pill"
              className="absolute inset-0 rounded-full bg-gold"
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            />
          )}
          {active === pill.slug && pill.slug !== null && (
            <motion.div
              layoutId="category-pill"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: pill.color }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            />
          )}
          <span className="relative z-10">{pill.icon}</span>
          <span className="relative z-10 whitespace-nowrap">{pill.name}</span>
        </button>
      ))}
    </div>
  );
}
