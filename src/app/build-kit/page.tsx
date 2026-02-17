import { prisma } from '@/lib/prisma';
import { KitBuilder } from '@/components/KitBuilder';

export default async function BuildKitPage() {
  const equipment = await prisma.equipment.findMany({ select: { id: true, name: true, dayRate: true } });
  return (
    <div className="container">
      <h1>Build your kit</h1>
      <KitBuilder equipment={equipment} />
    </div>
  );
}
