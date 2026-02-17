import { prisma } from './prisma';

export async function availableQty(equipmentId: string, startAt: Date, endAt: Date): Promise<number> {
  const equipment = await prisma.equipment.findUniqueOrThrow({ where: { id: equipmentId } });
  const booked = await prisma.booking.aggregate({
    _sum: { qty: true },
    where: {
      equipmentId,
      status: { in: ['HOLD', 'CONFIRMED'] },
      startAt: { lt: endAt },
      endAt: { gt: startAt }
    }
  });

  const blackout = await prisma.blackoutWindow.count({
    where: {
      OR: [{ equipmentId }, { equipmentId: null }],
      startAt: { lt: endAt },
      endAt: { gt: startAt }
    }
  });

  return blackout > 0 ? 0 : equipment.quantityTotal - (booked._sum.qty ?? 0);
}
