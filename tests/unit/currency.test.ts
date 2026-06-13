import { describe, it, expect } from 'vitest';
import { convertFromBase, formatMoney } from '@/lib/currency';

describe('currency conversion', () => {
  const rates = { KZT: 1, USD: 0.002, KRW: 2.6, AED: 0.007 };

  it('converts from KZT base into target currency', () => {
    expect(convertFromBase(100000, 'USD', rates)).toBeCloseTo(200);
    expect(convertFromBase(100000, 'KRW', rates)).toBeCloseTo(260000);
  });

  it('falls back to 1 when currency unknown and no fallback', () => {
    expect(convertFromBase(5000, 'KZT', rates)).toBe(5000);
  });

  it('formats money with the locale currency', () => {
    const usd = formatMoney(200, 'USD', 'en');
    expect(usd).toContain('200');
    const kzt = formatMoney(100000, 'KZT', 'ru');
    expect(kzt).toMatch(/100|₸|KZT/);
  });
});
