import type { MarketOutcome, Position } from '@/types';

const POINTS_PER_SHARE = 100;
const VOUCHER_THRESHOLD = 5000;

export interface SettlementPayout {
  userId: string;
  shares: number;
  payout: number;
  side: 'yes' | 'no';
  won: boolean;
}

export function calculatePayouts(
  positions: Position[],
  outcome: MarketOutcome
): SettlementPayout[] {
  if (!outcome || outcome === null) return [];

  return positions.map((pos) => {
    const won = pos.side === outcome;
    const payout = won ? pos.shares * POINTS_PER_SHARE : 0;
    return {
      userId: pos.user_id,
      shares: pos.shares,
      payout,
      side: pos.side,
      won,
    };
  });
}

export function qualifiesForVoucher(totalPayout: number, totalPnl: number): boolean {
  return totalPayout >= VOUCHER_THRESHOLD || totalPnl >= VOUCHER_THRESHOLD;
}

export function generateVoucherCode(): string {
  return `ASTRO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export interface CancelRefund {
  userId: string;
  refund: number;
}

export function calculateRefunds(
  positions: Position[]
): CancelRefund[] {
  return positions.map((pos) => ({
    userId: pos.user_id,
    refund: Math.floor(pos.shares * pos.avg_price * 100),
  }));
}
