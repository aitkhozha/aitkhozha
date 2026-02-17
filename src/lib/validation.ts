import { z } from 'zod';

export const kitItemSchema = z.object({
  equipmentId: z.string().min(5),
  qty: z.number().int().min(1).max(20)
});

export const enquirySchema = z.object({
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  timezone: z.string().min(2),
  pickupTime: z.string().min(3),
  returnTime: z.string().min(3),
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(8),
  productionName: z.string().min(2),
  productionType: z.string().min(2),
  logisticsMode: z.enum(['pickup', 'delivery']),
  logisticsAddress: z.string().optional(),
  onSetContact: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNo: z.string().optional(),
  notes: z.string().max(2000).optional(),
  promoCode: z.string().max(32).optional(),
  items: z.array(kitItemSchema).min(1)
});
