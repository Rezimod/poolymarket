import { kaUI } from './ka-ui';

export type Locale = 'en' | 'ka';

export const enUI = {
  markets: 'Markets',
  portfolio: 'Portfolio',
  leaderboard: 'Rankings',
  suggest: 'Suggest',
  all: 'All',
  primaryMarkets: 'Primary',
  balance: 'Balance',
  profile: 'Profile',
  searchMarkets: 'Search markets...',
  signIn: 'Get started',
  activeMarkets: 'active markets',
  totalVolume: 'total volume',
  volume: 'volume',
  trending: 'Trending now',
  results: 'results',
  startFree: 'Start with 1,000 ₾P free',
  sortTrending: 'Trending',
  sortVolume: 'Volume',
  sortClosing: 'Closing Soon',
  sortNew: 'New',
  topPredictors: 'Top predictors by volume and PnL',
  suggestMarket: 'Suggest a Market',
  suggestHint: 'What event should Georgia be predicting on?',
  chance: 'Probability',
  yesLabel: 'YES',
  noLabel: 'NO',
  nplgNote: 'Georgian terms follow the National Parliamentary Library lexicon',
  nplgLink: 'NPLG gwdict',
  hot: 'Active',
  buyYes: 'Buy YES',
  buyNo: 'Buy NO',
  marketOrder: 'Market',
  limitOrder: 'Limit',
  limitPrice: 'Limit price',
  amount: 'Amount (₾P)',
  shares: 'Shares',
  price: 'Price',
  ifCorrectWins: 'If correct, wins',
  signInToTrade: 'Sign in to Trade',
  confirmOrder: 'Confirm Order',
  orderPlaced: 'Order Placed!',
  discussion: 'Discussion',
  sharePrediction: 'Share your prediction...',
  post: 'Post',
  recentTrades: 'Recent Trades',
  noTradesYet: 'No trades yet',
  orderBook: 'Order Book',
  yesBids: 'YES Bids',
  noBids: 'NO Bids',
  resolutionCriteria: 'Resolution Criteria',
  source: 'Source',
  liquidity: 'Liquidity',
  status: 'Status',
  endDate: 'End Date',
  weekly: 'Weekly',
  monthly: 'Monthly',
  allTime: 'All Time',
  you: 'You',
  winRate: 'win',
  volShort: 'vol',
  trade: 'Trade',
  startPredicting: 'Start Predicting',
  landingBadge: 'Forecast market · ₾P',
  landingTitle1: "Georgia's forecast market.",
  landingTitle2: 'Trade on outcomes.',
  landingTagline: 'Politics · Economy · Sport',
  browseMarkets: 'Markets',
  sampleMarkets: 'Active markets',
  featureMechanics: 'Live probabilities',
  featureSoul: 'Institutional UI',
  featureRewards: 'Leaderboard prizes',
  footerTagline: 'Poolymarket.ge · Play-money only',
  partner: 'Partner',
  statusOpen: 'open',
  statusResolved: 'resolved',
  statusCancelled: 'cancelled',
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

export function marketStatus(locale: Locale, status: string): string {
  const map: Record<string, UIKey> = {
    open: 'statusOpen',
    resolved: 'statusResolved',
    cancelled: 'statusCancelled',
  };
  const key = map[status];
  return key ? t(locale, key) : status;
}

export function commentContent(
  locale: Locale,
  comment: { content: string; content_ka?: string | null }
): string {
  return locale === 'ka' && comment.content_ka ? comment.content_ka : comment.content;
}
