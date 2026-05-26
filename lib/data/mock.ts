import type { Category, Market, Profile, Trade, Position, PriceHistoryPoint, Comment, LeaderboardEntry } from '@/types';
import { SEED_CATEGORIES, SEED_MARKETS } from './markets-seed';

export const MOCK_CATEGORIES: Category[] = SEED_CATEGORIES;
export const MOCK_MARKETS: Market[] = SEED_MARKETS;

export const MOCK_USER: Profile = {
  id: 'demo-user',
  username: 'rezi_modebadze',
  avatar_url: null,
  lari_points: 8750,
  total_volume: 45200,
  total_pnl: 2340,
  rank: 'Predictor',
  created_at: '2025-01-01T00:00:00Z',
};

export const MOCK_TRADES: Trade[] = [
  { id: 't1', market_id: 'm11', buyer_id: 'u2', seller_id: 'u3', side: 'yes', price: 0.03, shares: 200, maker_order_id: null, taker_order_id: null, created_at: new Date(Date.now() - 60000).toISOString() },
  { id: 't2', market_id: 'm22', buyer_id: 'u4', seller_id: 'u2', side: 'no', price: 0.94, shares: 150, maker_order_id: null, taker_order_id: null, created_at: new Date(Date.now() - 180000).toISOString() },
  { id: 't3', market_id: 'm1', buyer_id: 'u5', seller_id: 'u6', side: 'yes', price: 0.46, shares: 80, maker_order_id: null, taker_order_id: null, created_at: new Date(Date.now() - 300000).toISOString() },
  { id: 't4', market_id: 'm26', buyer_id: 'u7', seller_id: 'u8', side: 'yes', price: 0.13, shares: 500, maker_order_id: null, taker_order_id: null, created_at: new Date(Date.now() - 420000).toISOString() },
  { id: 't5', market_id: 'm9', buyer_id: 'u9', seller_id: 'u2', side: 'no', price: 0.91, shares: 60, maker_order_id: null, taker_order_id: null, created_at: new Date(Date.now() - 600000).toISOString() },
];

export const MOCK_POSITIONS: Position[] = [
  { id: 'p1', user_id: 'demo-user', market_id: 'm1', side: 'yes', shares: 120, avg_price: 0.42, realized_pnl: 0, market: MOCK_MARKETS.find((m) => m.id === 'm1') },
  { id: 'p2', user_id: 'demo-user', market_id: 'm11', side: 'yes', shares: 300, avg_price: 0.03, realized_pnl: 0, market: MOCK_MARKETS.find((m) => m.id === 'm11') },
  { id: 'p3', user_id: 'demo-user', market_id: 'm4', side: 'yes', shares: 200, avg_price: 0.35, realized_pnl: 0, market: MOCK_MARKETS.find((m) => m.id === 'm4') },
  { id: 'p4', user_id: 'demo-user', market_id: 'm22', side: 'no', shares: 50, avg_price: 0.92, realized_pnl: 0, market: MOCK_MARKETS.find((m) => m.id === 'm22') },
];

function generatePriceHistory(marketId: string, basePrice: number): PriceHistoryPoint[] {
  const points: PriceHistoryPoint[] = [];
  let price = basePrice - 0.1;
  for (let i = 30; i >= 0; i--) {
    price = Math.min(0.95, Math.max(0.05, price + (Math.random() - 0.48) * 0.04));
    points.push({
      id: `ph-${marketId}-${i}`,
      market_id: marketId,
      yes_price: price,
      volume: Math.floor(Math.random() * 5000),
      recorded_at: new Date(Date.now() - i * 3600000 * 4).toISOString(),
    });
  }
  return points;
}

export function getMockPriceHistory(marketId: string): PriceHistoryPoint[] {
  const market = MOCK_MARKETS.find((m) => m.id === marketId);
  return generatePriceHistory(marketId, market?.yes_price ?? 0.5);
}

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    market_id: 'm11',
    user_id: 'u2',
    content: 'This market is my personal religion 🙏',
    content_ka: 'ეს ბაზარი ჩემი პირადი რელიგიაა 🙏',
    likes: 47,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    profile: { id: 'u2', username: 'tbilisi_trader', avatar_url: null, lari_points: 5000, total_volume: 20000, total_pnl: 1200, rank: 'Expert', created_at: '' },
  },
  {
    id: 'c2',
    market_id: 'm22',
    user_id: 'u3',
    content: 'If it works even once I am buying YES for 10,000',
    content_ka: 'თუ ერთხელ მაინც იმუშავებს, დიახ-ს 10,000-ს ვიყიდი',
    likes: 89,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    profile: { id: 'u3', username: 'caucasus_capital', avatar_url: null, lari_points: 12000, total_volume: 80000, total_pnl: 5600, rank: 'Master', created_at: '' },
  },
  {
    id: 'c3',
    market_id: 'm1',
    user_id: 'u4',
    content: 'Strong squad but a brutal group 🇬🇪',
    content_ka: 'ძლიერი შემადგენლობა, მაგრამ სასტიკო ჯგუფი 🇬🇪',
    likes: 12,
    created_at: new Date(Date.now() - 10800000).toISOString(),
    profile: { id: 'u4', username: 'kakhuri_bull', avatar_url: null, lari_points: 8000, total_volume: 45000, total_pnl: 2100, rank: 'Expert', created_at: '' },
  },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, profile: { id: 'l1', username: 'caucasus_capital', avatar_url: null, lari_points: 45200, total_volume: 890000, total_pnl: 34500, rank: 'Legend', created_at: '' }, volume: 890000, pnl: 34500, win_rate: 0.68 },
  { rank: 2, profile: { id: 'l2', username: 'tbilisi_trader', avatar_url: null, lari_points: 32100, total_volume: 654000, total_pnl: 28900, rank: 'Master', created_at: '' }, volume: 654000, pnl: 28900, win_rate: 0.64 },
  { rank: 3, profile: { id: 'l3', username: 'batumi_bull', avatar_url: null, lari_points: 28700, total_volume: 521000, total_pnl: 22100, rank: 'Master', created_at: '' }, volume: 521000, pnl: 22100, win_rate: 0.61 },
  { rank: 4, profile: { id: 'l4', username: 'poly_georgia', avatar_url: null, lari_points: 19800, total_volume: 412000, total_pnl: 18700, rank: 'Expert', created_at: '' }, volume: 412000, pnl: 18700, win_rate: 0.59 },
  { rank: 5, profile: MOCK_USER, volume: 45200, pnl: 2340, win_rate: 0.55 },
];
