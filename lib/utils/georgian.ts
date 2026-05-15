export const categories = {
  'georgian-politics': { en: 'Georgian Politics', ka: 'ქართული პოლიტიკა', icon: '🇬🇪', color: '#DC2626' },
  'georgian-sports': { en: 'Georgian Sports', ka: 'ქართული სპორტი', icon: '⚽', color: '#10B981' },
  economy: { en: 'Economy', ka: 'ეკონომიკა', icon: '📈', color: '#F59E0B' },
  culture: { en: 'Culture', ka: 'კულტურა', icon: '🎭', color: '#8B5CF6' },
  global: { en: 'Global', ka: 'გლობალური', icon: '🌍', color: '#3B82F6' },
  weather: { en: 'Weather', ka: 'ამინდი', icon: '🌤️', color: '#06B6D4' },
} as const;

export type CategorySlug = keyof typeof categories;

export function getCategoryLabel(slug: string, locale: 'en' | 'ka'): string {
  const cat = categories[slug as CategorySlug];
  if (!cat) return slug;
  return locale === 'ka' ? cat.ka : cat.en;
}
