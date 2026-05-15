import { NextRequest, NextResponse } from 'next/server';
import { matchOrdersLocally, validateOrder } from '@/lib/clob/engine';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { marketId, userId, side, orderType, shares, price, balance, currentPrice } = body;

    const validation = validateOrder(side, shares, price, balance, currentPrice);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        demo: true,
        trades: [],
        cost: validation.cost,
      });
    }

    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = await createServiceClient();

    const { data: oppositeOrders } = await supabase
      .from('orders')
      .select('*')
      .eq('market_id', marketId)
      .neq('side', side)
      .eq('status', 'open')
      .order('price', { ascending: false });

    const newOrder = {
      id: crypto.randomUUID(),
      market_id: marketId,
      user_id: userId,
      side,
      order_type: orderType,
      price,
      shares,
      filled_shares: 0,
      status: 'open' as const,
      created_at: new Date().toISOString(),
    };

    const result = matchOrdersLocally(
      { ...newOrder, marketId, userId, orderType, filledShares: 0, createdAt: new Date() },
      (oppositeOrders ?? []).map((o) => ({
        ...o,
        marketId: o.market_id,
        userId: o.user_id,
        orderType: o.order_type,
        filledShares: o.filled_shares,
        createdAt: new Date(o.created_at),
      }))
    );

    await supabase.from('orders').insert(newOrder);

    if (result.trades.length > 0) {
      await supabase.from('trades').insert(result.trades);
      if (result.newYesPrice) {
        await supabase
          .from('markets')
          .update({ yes_price: result.newYesPrice, no_price: 1 - result.newYesPrice })
          .eq('id', marketId);
      }
    }

    await supabase
      .from('profiles')
      .update({ lari_points: balance - validation.cost })
      .eq('id', userId);

    return NextResponse.json({ success: true, trades: result.trades, cost: validation.cost });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Order failed' }, { status: 500 });
  }
}
