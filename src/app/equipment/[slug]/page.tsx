import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EquipmentDetail({ params }: { params: { slug: string } }) {
  const item = await prisma.equipment.findUnique({ where: { slug: params.slug } });
  if (!item) return notFound();

  return (
    <div className="container">
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <ul>
        <li>Day rate: £{(item.dayRate / 100).toFixed(2)}</li>
        <li>Weekend rate: £{(item.weekendRate / 100).toFixed(2)}</li>
        <li>Deposit: £{(item.deposit / 100).toFixed(2)}</li>
        <li>Replacement value: £{(item.replacementValue / 100).toFixed(2)}</li>
        <li>Insurance required: {item.insuranceRequired ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  );
}
