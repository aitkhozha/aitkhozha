import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.enquiry.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } });
  return Response.json(data);
}

export async function PATCH(req: Request) {
  const { enquiryId, status } = await req.json();
  const enquiry = await prisma.enquiry.update({ where: { id: enquiryId }, data: { status } });
  return Response.json(enquiry);
}
