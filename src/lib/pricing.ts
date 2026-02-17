export type PriceInput = { dayRate: number; weekendRate: number; qty: number; isWeekend: boolean };

export function estimateLine({ dayRate, weekendRate, qty, isWeekend }: PriceInput): number {
  return (isWeekend ? weekendRate : dayRate) * qty;
}

export function applyPromo(subtotal: number, code?: string): { total: number; discount: number } {
  if (!code) return { total: subtotal, discount: 0 };
  if (code.toUpperCase() === 'WRAP10') {
    const discount = Math.round(subtotal * 0.1);
    return { total: subtotal - discount, discount };
  }
  return { total: subtotal, discount: 0 };
}
