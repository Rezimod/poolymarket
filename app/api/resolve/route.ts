import { NextRequest, NextResponse } from 'next/server';
import { calculatePayouts, qualifiesForVoucher, generateVoucherCode } from '@/lib/clob/settlementEngine';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { marketId, outcome } = await request.json();
  if (!['yes', 'no', 'cancel'].includes(outcome)) {
    return NextResponse.json({ error: 'Invalid outcome' }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: true, demo: true, outcome });
  }

  const { createServiceClient } = await import('@/lib/supabase/server');
  const supabase = await createServiceClient();

  if (outcome === 'cancel') {
    await supabase
      .from('markets')
      .update({ status: 'cancelled', resolved_at: new Date().toISOString() })
      .eq('id', marketId);
    return NextResponse.json({ success: true, cancelled: true });
  }

  const { data: positions } = await supabase
    .from('positions')
    .select('*')
    .eq('market_id', marketId);

  const payouts = calculatePayouts(positions ?? [], outcome);

  for (const payout of payouts) {
    if (payout.payout > 0) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('lari_points, total_pnl')
        .eq('id', payout.userId)
        .single();

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            lari_points: profile.lari_points + payout.payout,
            total_pnl: profile.total_pnl + payout.payout,
          })
          .eq('id', payout.userId);

        if (qualifiesForVoucher(payout.payout, profile.total_pnl)) {
          await supabase.from('rewards').insert({
            user_id: payout.userId,
            type: 'astroman_voucher',
            value: generateVoucherCode(),
            reason: `Won market ${marketId}`,
          });
        }
      }

      await supabase.from('notifications').insert({
        user_id: payout.userId,
        type: 'market_resolved',
        title: payout.won ? 'You won!' : 'Market resolved',
        body: payout.won
          ? `You earned ${payout.payout} ₾P`
          : 'Your position did not win this market.',
        market_id: marketId,
      });
    }
  }

  await supabase
    .from('markets')
    .update({
      status: 'resolved',
      outcome,
      resolved_at: new Date().toISOString(),
    })
    .eq('id', marketId);

  return NextResponse.json({ success: true, payouts });
}
