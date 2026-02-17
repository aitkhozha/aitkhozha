import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/rateLimit', () => ({ hitLimit: () => false }));
vi.mock('@/lib/availability', () => ({ availableQty: vi.fn().mockResolvedValue(3) }));
vi.mock('@/lib/email', () => ({ sendEmail: vi.fn().mockResolvedValue(undefined) }));
vi.mock('@/lib/prisma', () => ({
  prisma: {
    equipment: { findUniqueOrThrow: vi.fn().mockResolvedValue({ dayRate: 1000, weekendRate: 2000 }) },
    enquiry: { create: vi.fn().mockResolvedValue({ id: 'enq1' }) },
    booking: { create: vi.fn().mockResolvedValue({}) }
  }
}));

import { POST } from '@/app/api/enquiry/submit/route';

describe('enquiry submission', () => {
  it('creates enquiry', async () => {
    const req = new Request('http://localhost/api/enquiry/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        startAt: new Date().toISOString(), endAt: new Date(Date.now()+86400000).toISOString(), timezone: 'Europe/London', pickupTime: '08:00', returnTime: '10:00',
        contactName: 'Alex Unit', contactEmail: 'alex@example.com', contactPhone: '07123456789', productionName: 'Test Spot', productionType: 'Commercial', logisticsMode: 'pickup', items: [{ equipmentId: 'eq1', qty: 1 }]
      })
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
