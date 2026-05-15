import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        className
      )}
      style={
        color
          ? { backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }
          : { backgroundColor: 'rgba(0,212,170,0.15)', color: '#00D4AA' }
      }
    >
      {children}
    </span>
  );
}
