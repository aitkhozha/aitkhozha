import { availableQty } from '@/lib/availability';

export async function POST(req: Request) {
  const body = await req.json();
  const qty = await availableQty(body.equipmentId, new Date(body.startAt), new Date(body.endAt));
  return Response.json({ available: qty > 0, qty });
}
