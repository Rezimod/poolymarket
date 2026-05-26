import { kaUI } from './ka-ui';

export type Locale = 'en' | 'ka';

export const enUI = {
  markets: 'Markets',
  portfolio: 'Portfolio',
  leaderboard: 'Rankings',
  suggest: 'Suggest',
  all: 'All',
  balance: 'Balance',
  profile: 'Profile',
  searchMarkets: 'Search 45+ Georgian markets...',
  signIn: 'Start Trading',
  activeMarkets: 'active markets',
  totalVolume: 'total volume',
  volume: 'volume',
  trending: 'Trending now',
  results: 'results',
  startFree: 'Predict Now — Get 1,000 ₾P Free',
  sortTrending: 'Trending',
  sortVolume: 'Volume',
  sortClosing: 'Closing Soon',
  sortNew: 'New',
  topPredictors: 'Top predictors by volume and PnL',
  suggestMarket: 'Suggest a Market',
  suggestHint: 'What event should Georgia be predicting on?',
  chance: 'YES chance',
  yesLabel: 'YES',
  noLabel: 'NO',
  nplgNote: 'Georgian terms follow the National Parliamentary Library lexicon',
  nplgLink: 'NPLG gwdict',
} as const;

export type UIKey = keyof typeof enUI;

export function t(locale: Locale, key: UIKey): string {
  if (locale === 'ka') return kaUI[key];
  return enUI[key];
}

export function marketTitle(
  locale: Locale,
  market: { title: string; title_ka: string | null }
): string {
  return locale === 'ka' && market.title_ka ? market.title_ka : market.title;
}

export function categoryName(
  locale: Locale,
  category: { name: string; name_ka: string }
): string {
  return locale === 'ka' ? category.name_ka : category.name;
}
