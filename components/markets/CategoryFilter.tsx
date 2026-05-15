'use client';

import { motion } from 'framer-motion';
import type { Category } from '@/types';
import { cn } from '@/lib/utils/cn';
import { useUserStore } from '@/stores/userStore';

interface CategoryFilterProps {
  categories: Category[];
  active: string | null;
  onChange: (slug: string | null) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const locale = useUserStore((s) => s.locale);

  const pills = [
    { slug: null, name: locale === 'ka' ? 'ყველა' : 'All', icon: '✨' },
    ...categories.map((c) => ({
      slug: c.slug,
      name: locale === 'ka' ? c.name_ka : c.name,
      icon: c.icon,
    })),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {pills.map((pill) => (
        <button
          key={pill.slug ?? 'all'}
          onClick={() => onChange(pill.slug)}
          className={cn(
            'relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
            active === pill.slug
              ? 'text-[#0B0E1A]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          )}
        >
          {active === pill.slug && (
            <motion.div
              layoutId="category-pill"
              className="absolute inset-0 rounded-full bg-teal"
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
