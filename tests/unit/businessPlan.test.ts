import { describe, it, expect } from 'vitest';
import { years, breakEvenToursMonth, cumulativeNet } from '@/data/businessPlan';

describe('financial model', () => {
  it('computes revenue as tours * average check', () => {
    for (const y of years) {
      expect(y.revenue).toBe(y.tours * y.avgCheck);
    }
  });

  it('derives net profit = gross profit - total opex', () => {
    for (const y of years) {
      expect(y.netProfit).toBe(y.grossProfit - y.totalOpex);
    }
  });

  it('reaches profitability after year 1 and grows', () => {
    expect(years[0].netProfit).toBeLessThan(0);
    expect(years[1].netProfit).toBeGreaterThan(0);
    expect(years[2].netProfit).toBeGreaterThan(years[1].netProfit);
  });

  it('exposes positive KPIs', () => {
    expect(breakEvenToursMonth).toBeGreaterThan(0);
    expect(cumulativeNet).toBe(years.reduce((a, y) => a + y.netProfit, 0));
  });
});
