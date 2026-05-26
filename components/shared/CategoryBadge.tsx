import type { Category } from '@/types';
import { Badge } from '@/components/ui/Badge';
interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Badge color={category.color}>
      <span>{category.icon}</span>
      <span>{category.name}</span>
    </Badge>
  );
}
