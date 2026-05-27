import type { Market } from '@/types';

/** Categories shown on home & default markets feed */
export const SERIOUS_CATEGORY_SLUGS = [
  'georgian-politics',
  'georgian-sports',
  'economy',
  'global',
  'culture',
  'speculative',
  'weather',
] as const;

export const MEME_CATEGORY_SLUGS = ['absurd', 'daily-life'] as const;

export const ALL_MARKETS_FILTER = '__all__';

export function isSeriousMarket(market: Market): boolean {
  const slug = market.category?.slug;
  return slug ? SERIOUS_CATEGORY_SLUGS.includes(slug as (typeof SERIOUS_CATEGORY_SLUGS)[number]) : false;
}

export function filterSeriousMarkets(markets: Market[]): Market[] {
  return markets.filter(isSeriousMarket);
}

export function getPrimaryFeaturedMarket(markets: Market[]): Market {
  const serious = filterSeriousMarkets(markets);
  const featured = serious.find((m) => m.is_featured);
  if (featured) return featured;
  return [...serious].sort((a, b) => b.total_volume - a.total_volume)[0] ?? markets[0];
}

export function sortSeriousFirst(markets: Market[]): Market[] {
  return [...markets].sort((a, b) => {
    const aSerious = isSeriousMarket(a) ? 1 : 0;
    const bSerious = isSeriousMarket(b) ? 1 : 0;
    if (aSerious !== bSerious) return bSerious - aSerious;
    return b.total_volume - a.total_volume;
  });
}
