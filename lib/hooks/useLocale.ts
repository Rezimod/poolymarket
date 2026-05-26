'use client';

import { useUserStore } from '@/stores/userStore';
import {
  t,
  marketTitle,
  categoryName,
  marketStatus,
  commentContent,
  type Locale,
  type UIKey,
} from '@/lib/i18n/messages';

export function useLocale() {
  const locale = useUserStore((s) => s.locale);
  const setLocale = useUserStore((s) => s.setLocale);

  return {
    locale,
    setLocale,
    t: (key: UIKey) => t(locale, key),
    marketTitle: (market: { title: string; title_ka: string | null }) =>
      marketTitle(locale, market),
    categoryName: (category: { name: string; name_ka: string }) =>
      categoryName(locale, category),
    marketStatus: (status: string) => marketStatus(locale, status),
    commentContent: (comment: { content: string; content_ka?: string | null }) =>
      commentContent(locale, comment),
    isKa: locale === 'ka',
  };
}

export type { Locale };
