import { describe, expect, it } from 'vitest';
import { enquirySchema } from '@/lib/validation';

describe('validation', () => {
  it('rejects empty kit', () => {
    const parsed = enquirySchema.safeParse({
      startAt: new Date().toISOString(), endAt: new Date(Date.now() + 86400000).toISOString(), timezone: 'Europe/London', pickupTime: '08:00', returnTime: '10:00',
      contactName: 'A', contactEmail: 'bad', contactPhone: '123', productionName: '', productionType: '', logisticsMode: 'pickup', items: []
    });
    expect(parsed.success).toBe(false);
  });
});
