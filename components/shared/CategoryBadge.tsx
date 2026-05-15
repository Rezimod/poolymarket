import type { Category } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useUserStore } from '@/stores/userStore';

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const locale = useUserStore((s) => s.locale);
  return (
    <Badge color={category.color}>
      <span>{category.icon}</span>
      <span>{locale === 'ka' ? category.name_ka : category.name}</span>
    </Badge>
  );
}
