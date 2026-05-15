import { isSupabaseConfigured } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
import type { Market, Category, Trade, PriceHistoryPoint, Comment } from '@/types';
import { MOCK_MARKETS, MOCK_CATEGORIES, MOCK_TRADES, getMockPriceHistory, MOCK_COMMENTS } from './mock';

export type MarketSort = 'trending' | 'volume' | 'closing' | 'new';

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return MOCK_CATEGORIES;
  const supabase = createClient();
  const { data } = await supabase.from('categories').select('*').order('name');
  return data ?? MOCK_CATEGORIES;
}

export async function getMarkets(options?: {
  categorySlug?: string;
  search?: string;
  sort?: MarketSort;
  featured?: boolean;
}): Promise<Market[]> {
  if (!isSupabaseConfigured()) {
    let markets = [...MOCK_MARKETS];
    if (options?.categorySlug) {
      markets = markets.filter((m) => m.category?.slug === options.categorySlug);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      markets = markets.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.title_ka?.toLowerCase().includes(q) ?? false)
      );
    }
    if (options?.featured) markets = markets.filter((m) => m.is_featured);
    return sortMarkets(markets, options?.sort ?? 'trending');
  }

  const supabase = createClient();
  let query = supabase.from('markets').select('*, category:categories(*)').eq('status', 'open');

  if (options?.featured) query = query.eq('is_featured', true);
  if (options?.search) query = query.ilike('title', `%${options.search}%`);

  const { data } = await query;
  let markets = (data as Market[]) ?? [];

  if (options?.categorySlug) {
    markets = markets.filter((m) => m.category?.slug === options.categorySlug);
  }

  return sortMarkets(markets, options?.sort ?? 'trending');
}

function sortMarkets(markets: Market[], sort: MarketSort): Market[] {
  const copy = [...markets];
  switch (sort) {
    case 'volume':
      return copy.sort((a, b) => b.total_volume - a.total_volume);
    case 'closing':
      return copy.sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime());
    case 'new':
      return copy.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    default:
      return copy.sort((a, b) => b.total_volume * b.yes_price - a.total_volume * a.yes_price);
  }
}

export async function getMarketById(id: string): Promise<Market | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_MARKETS.find((m) => m.id === id) ?? null;
  }
  const supabase = createClient();
  const { data } = await supabase
    .from('markets')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single();
  return data as Market | null;
}

export async function getMarketTrades(marketId: string): Promise<Trade[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_TRADES.filter((t) => t.market_id === marketId);
  }
  const supabase = createClient();
  const { data } = await supabase
    .from('trades')
    .select('*')
    .eq('market_id', marketId)
    .order('created_at', { ascending: false })
    .limit(50);
  return data ?? [];
}

export async function getPriceHistory(marketId: string): Promise<PriceHistoryPoint[]> {
  if (!isSupabaseConfigured()) return getMockPriceHistory(marketId);
  const supabase = createClient();
  const { data } = await supabase
    .from('price_history')
    .select('*')
    .eq('market_id', marketId)
    .order('recorded_at', { ascending: true });
  return data ?? getMockPriceHistory(marketId);
}

export async function getMarketComments(marketId: string): Promise<Comment[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_COMMENTS.filter((c) => c.market_id === marketId);
  }
  const supabase = createClient();
  const { data } = await supabase
    .from('comments')
    .select('*, profile:profiles(*)')
    .eq('market_id', marketId)
    .order('created_at', { ascending: false });
  return data ?? [];
}
