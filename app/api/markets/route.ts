import { NextRequest, NextResponse } from 'next/server';
import { getMarkets } from '@/lib/data/markets';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const markets = await getMarkets({
    categorySlug: searchParams.get('category') ?? undefined,
    search: searchParams.get('q') ?? undefined,
    sort: (searchParams.get('sort') as 'trending' | 'volume' | 'closing' | 'new') ?? 'trending',
    featured: searchParams.get('featured') === 'true',
  });
  return NextResponse.json(markets);
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const body = await request.json();
  const { createServiceClient } = await import('@/lib/supabase/server');
  const supabase = await createServiceClient();

  const { data, error } = await supabase.from('markets').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
