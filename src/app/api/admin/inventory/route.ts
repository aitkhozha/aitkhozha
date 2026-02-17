import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
  const { equipmentId, quantityTotal } = await req.json();
  const updated = await prisma.equipment.update({ where: { id: equipmentId }, data: { quantityTotal } });
  return Response.json(updated);
}
