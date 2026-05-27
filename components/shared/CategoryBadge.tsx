'use client';

import type { Category } from '@/types';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn } from '@/lib/utils/cn';

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const { categoryName, isKa } = useLocale();
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500',
        isKa && 'font-georgian normal-case'
      )}
      style={{ borderLeftColor: category.color, borderLeftWidth: 2 }}
    >
      {categoryName(category)}
    </span>
  );
}
