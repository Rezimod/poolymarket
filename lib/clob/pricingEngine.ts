export function lmsrPrice(qYes: number, qNo: number, b = 100): number {
  const eYes = Math.exp(qYes / b);
  const eNo = Math.exp(qNo / b);
  return eYes / (eYes + eNo);
}

export function lmsrCost(qYes: number, qNo: number, b = 100): number {
  return b * Math.log(Math.exp(qYes / b) + Math.exp(qNo / b));
}

export function lmsrBuyCost(
  qYes: number,
  qNo: number,
  side: 'yes' | 'no',
  shares: number,
  b = 100
): number {
  const costBefore = lmsrCost(qYes, qNo, b);
  const qYesAfter = side === 'yes' ? qYes + shares : qYes;
  const qNoAfter = side === 'no' ? qNo + shares : qNo;
  const costAfter = lmsrCost(qYesAfter, qNoAfter, b);
  return Math.ceil(costAfter - costBefore);
}

export function updatePricesFromTrade(yesPrice: number, tradePrice: number, side: 'yes' | 'no'): {
  yes_price: number;
  no_price: number;
} {
  const newYes = side === 'yes' ? tradePrice : 1 - tradePrice;
  const clamped = Math.min(0.99, Math.max(0.01, newYes));
  return { yes_price: clamped, no_price: 1 - clamped };
}
