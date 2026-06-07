import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Lightweight, dependency-free booking store. Requests are appended as JSON
 * lines to `data/bookings.jsonl`. This keeps the MVP self-contained; for
 * production the same `saveBooking` interface can be swapped for a database
 * (e.g. Supabase/Postgres) or a CRM webhook without touching the API route.
 *
 * Note: on read-only/serverless filesystems the write is best-effort and the
 * request is still acknowledged (and, in production, would be emailed/queued).
 */

export type BookingRecord = {
  id: string;
  createdAt: string;
  locale: string;
  name: string;
  phone: string;
  email?: string;
  tourSlug?: string;
  vehicleSlug?: string;
  date?: string;
  guests: number;
  message?: string;
  messageRussian?: string;
  aiProvider?: string;
  status: 'NEW';
};

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'bookings.jsonl');

export async function saveBooking(record: BookingRecord): Promise<{ persisted: boolean }> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(FILE, JSON.stringify(record) + '\n', 'utf8');
    return { persisted: true };
  } catch {
    return { persisted: false };
  }
}
