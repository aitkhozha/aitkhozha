import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    equipment: { findUniqueOrThrow: vi.fn().mockResolvedValue({ quantityTotal: 3 }) },
    booking: { aggregate: vi.fn().mockResolvedValue({ _sum: { qty: 1 } }) },
    blackoutWindow: { count: vi.fn().mockResolvedValue(0) }
  }
}));

import { availableQty } from '@/lib/availability';

describe('availability', () => {
  it('returns remaining quantity', async () => {
    const qty = await availableQty('eq1', new Date(), new Date(Date.now() + 10000));
    expect(qty).toBe(2);
  });
});
