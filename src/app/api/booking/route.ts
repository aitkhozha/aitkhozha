import { NextResponse } from 'next/server';
import { z } from 'zod';
import { translateToRussian } from '@/lib/ai';
import { saveBooking, type BookingRecord } from '@/lib/bookingStore';

export const runtime = 'nodejs';

const schema = z.object({
  locale: z.string().min(2).max(5),
  name: z.string().min(1).max(120),
  phone: z.string().min(3).max(40),
  email: z.string().email().optional().or(z.literal('')),
  tourSlug: z.string().max(80).optional().or(z.literal('')),
  vehicleSlug: z.string().max(80).optional().or(z.literal('')),
  date: z.string().max(20).optional().or(z.literal('')),
  guests: z.coerce.number().int().min(1).max(20).default(1),
  message: z.string().max(2000).optional().or(z.literal(''))
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation', issues: parsed.error.flatten() }, { status: 422 });
  }
  const data = parsed.data;

  // Automate enquiry handling: every request is translated to Russian for the team.
  const translation = await translateToRussian(data.message ?? '', data.locale);

  const record: BookingRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    locale: data.locale,
    name: data.name,
    phone: data.phone,
    email: data.email || undefined,
    tourSlug: data.tourSlug || undefined,
    vehicleSlug: data.vehicleSlug || undefined,
    date: data.date || undefined,
    guests: data.guests,
    message: data.message || undefined,
    messageRussian: translation.russian || undefined,
    aiProvider: translation.provider,
    status: 'NEW'
  };

  const { persisted } = await saveBooking(record);

  return NextResponse.json({ ok: true, id: record.id, persisted, aiProvider: translation.provider });
}
