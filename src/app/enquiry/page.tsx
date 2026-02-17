import { EnquiryWizard } from '@/components/EnquiryWizard';
import { prisma } from '@/lib/prisma';

export default async function EnquiryPage() {
  const equipment = await prisma.equipment.findMany({ select: { id: true, name: true } });
  return <div className="container"><h1>Rental enquiry wizard</h1><EnquiryWizard equipment={equipment} /></div>;
}
