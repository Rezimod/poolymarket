export function priceToPercent(price: number): number {
  return Math.round(price * 100);
}

export function percentToPrice(percent: number): number {
  return Math.min(0.99, Math.max(0.01, percent / 100));
}

export function complementPrice(price: number): number {
  return Math.round((1 - price) * 10000) / 10000;
}

export function estimatedPayout(shares: number, price: number): number {
  return Math.floor(shares * (1 / price));
}

export function sharesFromAmount(amount: number, price: number): number {
  if (price <= 0) return 0;
  return Math.floor(amount / price);
}
