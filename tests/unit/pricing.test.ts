import { describe, expect, it } from 'vitest';
import { applyPromo, estimateLine } from '@/lib/pricing';

describe('pricing', () => {
  it('calculates day line estimate', () => {
    expect(estimateLine({ dayRate: 1000, weekendRate: 2000, qty: 3, isWeekend: false })).toBe(3000);
  });

  it('applies promo code', () => {
    const result = applyPromo(10000, 'WRAP10');
    expect(result.total).toBe(9000);
    expect(result.discount).toBe(1000);
  });
});
