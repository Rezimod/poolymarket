export type MarketStatus = 'open' | 'resolved' | 'cancelled';
export type MarketOutcome = 'yes' | 'no' | null;
export type OrderSide = 'yes' | 'no';
export type OrderType = 'market' | 'limit';
export type OrderStatus = 'open' | 'filled' | 'cancelled' | 'partial';

export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  lari_points: number;
  total_volume: number;
  total_pnl: number;
  rank: string;
  is_admin?: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  name_ka: string;
  slug: string;
  icon: string;
  color: string;
}

export interface Market {
  id: string;
  title: string;
  title_ka: string | null;
  description: string;
  resolution_criteria: string;
  category_id: string | null;
  category?: Category;
  creator_id: string | null;
  status: MarketStatus;
  outcome: MarketOutcome;
  yes_price: number;
  no_price: number;
  total_volume: number;
  liquidity: number;
  end_date: string;
  resolved_at: string | null;
  resolution_source: string | null;
  image_url: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  market_id: string;
  user_id: string;
  side: OrderSide;
  order_type: OrderType;
  price: number | null;
  shares: number;
  filled_shares: number;
  status: OrderStatus;
  created_at: string;
}

export interface Trade {
  id: string;
  market_id: string;
  buyer_id: string;
  seller_id: string;
  side: OrderSide;
  price: number;
  shares: number;
  maker_order_id: string | null;
  taker_order_id: string | null;
  created_at: string;
  buyer?: Profile;
}

export interface Position {
  id: string;
  user_id: string;
  market_id: string;
  side: OrderSide;
  shares: number;
  avg_price: number;
  realized_pnl: number;
  market?: Market;
}

export interface PriceHistoryPoint {
  id: string;
  market_id: string;
  yes_price: number;
  volume: number;
  recorded_at: string;
}

export interface Comment {
  id: string;
  market_id: string;
  user_id: string;
  content: string;
  likes: number;
  created_at: string;
  profile?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  market_id: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Reward {
  id: string;
  user_id: string;
  type: string;
  value: string;
  reason: string;
  claimed_at: string | null;
  created_at: string;
}

export interface MarketSuggestion {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  submitted_by: string | null;
  status: string;
  votes: number;
  created_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  profile: Profile;
  volume: number;
  pnl: number;
  win_rate: number;
}
