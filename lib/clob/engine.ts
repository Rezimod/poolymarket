import type { Order, Trade, OrderSide } from '@/types';
import { updatePricesFromTrade } from './pricingEngine';

export interface MatchableOrder extends Order {
  marketId: string;
  userId: string;
  orderType: 'market' | 'limit';
  filledShares: number;
  createdAt: Date;
}

export interface MatchResult {
  trades: Omit<Trade, 'id' | 'created_at'>[];
  updatedOrders: Partial<Order>[];
  remainingShares: number;
  newYesPrice?: number;
}

function canMatch(
  incoming: MatchableOrder,
  opposite: MatchableOrder
): boolean {
  const incomingPrice =
    incoming.order_type === 'market'
      ? incoming.side === 'yes'
        ? 1
        : 1
      : (incoming.price ?? 0.5);
  const oppositePrice =
    opposite.order_type === 'market' ? 0 : (opposite.price ?? 0.5);

  if (incoming.side === 'yes') {
    return incomingPrice + oppositePrice >= 1;
  }
  return incomingPrice + oppositePrice >= 1;
}

function tradePrice(incoming: MatchableOrder, opposite: MatchableOrder): number {
  if (incoming.order_type === 'limit' && incoming.price) return incoming.price;
  if (opposite.order_type === 'limit' && opposite.price) return opposite.price;
  return 0.5;
}

export function matchOrdersLocally(
  newOrder: MatchableOrder,
  oppositeOrders: MatchableOrder[]
): MatchResult {
  const sorted = [...oppositeOrders]
    .filter((o) => o.status === 'open' && o.user_id !== newOrder.userId)
    .sort((a, b) => {
      const priceA = a.price ?? 0.5;
      const priceB = b.price ?? 0.5;
      if (priceB !== priceA) return priceB - priceA;
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

  const trades: MatchResult['trades'] = [];
  const updatedOrders: Partial<Order>[] = [];
  let remaining = newOrder.shares - newOrder.filled_shares;
  let lastPrice = 0.5;

  for (const opposite of sorted) {
    if (remaining <= 0) break;
    if (!canMatch(newOrder, opposite)) continue;

    const available = opposite.shares - opposite.filled_shares;
    const fillAmount = Math.min(remaining, available);
    const price = tradePrice(newOrder, opposite);
    lastPrice = price;

    trades.push({
      market_id: newOrder.market_id,
      buyer_id: newOrder.side === 'yes' ? newOrder.user_id : opposite.user_id,
      seller_id: newOrder.side === 'yes' ? opposite.user_id : newOrder.user_id,
      side: newOrder.side,
      price,
      shares: fillAmount,
      maker_order_id: opposite.id,
      taker_order_id: newOrder.id,
    });

    const oppositeFilled = opposite.filled_shares + fillAmount;
    updatedOrders.push({
      id: opposite.id,
      filled_shares: oppositeFilled,
      status: oppositeFilled >= opposite.shares ? 'filled' : 'partial',
    });

    remaining -= fillAmount;
  }

  const filled = newOrder.shares - remaining;
  updatedOrders.push({
    id: newOrder.id,
    filled_shares: filled,
    status:
      filled >= newOrder.shares ? 'filled' : filled > 0 ? 'partial' : newOrder.status,
  });

  const prices = updatePricesFromTrade(0.5, lastPrice, newOrder.side);

  return {
    trades,
    updatedOrders,
    remainingShares: remaining,
    newYesPrice: prices.yes_price,
  };
}

export function validateOrder(
  side: OrderSide,
  shares: number,
  price: number | null,
  balance: number,
  currentPrice: number
): { valid: boolean; error?: string; cost: number } {
  if (shares <= 0) return { valid: false, error: 'Shares must be positive', cost: 0 };
  const effectivePrice = price ?? currentPrice;
  const cost = Math.ceil(shares * effectivePrice * 100);
  if (cost > balance) return { valid: false, error: 'Insufficient ₾P balance', cost };
  if (price !== null && (price < 0.01 || price > 0.99)) {
    return { valid: false, error: 'Price must be between 0.01 and 0.99', cost };
  }
  return { valid: true, cost };
}
