import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const payload = await req.json();
  const blackout = await prisma.blackoutWindow.create({ data: { ...payload, startAt: new Date(payload.startAt), endAt: new Date(payload.endAt) } });
  return Response.json(blackout, { status: 201 });
}
