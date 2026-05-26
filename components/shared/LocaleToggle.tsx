'use client';

import { Globe } from 'lucide-react';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn } from '@/lib/utils/cn';

interface LocaleToggleProps {
  className?: string;
}

export function LocaleToggle({ className }: LocaleToggleProps) {
  const { locale, setLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === 'en' ? 'ka' : 'en')}
      className={cn(
        'flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-gold border border-transparent hover:border-gold/20 transition-colors',
        className
      )}
      aria-label={locale === 'en' ? 'Switch to Georgian' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      {locale === 'en' ? 'ქარ' : 'EN'}
    </button>
  );
}
