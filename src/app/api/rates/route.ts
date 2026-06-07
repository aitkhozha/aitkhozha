import { NextResponse } from 'next/server';
import { getDailyRates } from '@/lib/currency';

export const runtime = 'nodejs';
export const revalidate = 86400; // once per day

// Exposes the daily KZT exchange rates used across the site.
export async function GET() {
  const rates = await getDailyRates();
  return NextResponse.json(rates);
}
