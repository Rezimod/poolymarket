'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'yes' | 'no' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-teal text-base font-semibold text-[#0B0E1A] hover:bg-teal/90 shadow-glow active:scale-[0.98]',
  secondary:
    'bg-elevated border border-white/10 text-text-primary hover:border-white/20 active:scale-[0.98]',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/5',
  yes: 'bg-yes text-white hover:bg-yes/90 active:scale-[0.98]',
  no: 'bg-no text-white hover:bg-no/90 active:scale-[0.98]',
  danger: 'bg-no/20 text-no border border-no/30 hover:bg-no/30',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  )
);
Button.displayName = 'Button';
