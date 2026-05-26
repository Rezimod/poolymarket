'use client';

import { useEffect } from 'react';
import { useLocale } from '@/lib/hooks/useLocale';

/** Syncs <html lang> with the active locale for accessibility and font shaping. */
export function LocaleHtmlLang() {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale === 'ka' ? 'ka' : 'en';
  }, [locale]);

  return null;
}
