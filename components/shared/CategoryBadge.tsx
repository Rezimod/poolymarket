'use client';

import type { Category } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn } from '@/lib/utils/cn';

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const { categoryName, isKa } = useLocale();
  return (
    <Badge color={category.color}>
      <span>{category.icon}</span>
      <span className={cn(isKa && 'font-georgian')}>{categoryName(category)}</span>
    </Badge>
  );
}
