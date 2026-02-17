import { enquirySchema } from '@/lib/validation';
import { prisma } from '@/lib/prisma';
import { availableQty } from '@/lib/availability';
import { estimateLine, applyPromo } from '@/lib/pricing';
import { sendEmail } from '@/lib/email';
import { hitLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'local';
  if (hitLimit(`enquiry-${ip}`)) return Response.json({ message: 'Too many requests' }, { status: 429 });

  const payload = enquirySchema.parse(await req.json());
  const startAt = new Date(payload.startAt);
  const endAt = new Date(payload.endAt);
  let subtotal = 0;

  for (const line of payload.items) {
    const available = await availableQty(line.equipmentId, startAt, endAt);
    if (line.qty > available) return Response.json({ message: 'Item no longer available for selected dates.' }, { status: 409 });
    const eq = await prisma.equipment.findUniqueOrThrow({ where: { id: line.equipmentId } });
    subtotal += estimateLine({ dayRate: eq.dayRate, weekendRate: eq.weekendRate, qty: line.qty, isWeekend: false });
  }

  const promo = applyPromo(subtotal, payload.promoCode);
  const vat = Math.round(promo.total * 0.2);

  const enquiry = await prisma.enquiry.create({
    data: {
      ...payload,
      startAt,
      endAt,
      resumeToken: crypto.randomUUID(),
      totalEstimate: promo.total,
      vatEstimate: vat,
      items: {
        create: await Promise.all(payload.items.map(async (line) => {
          const eq = await prisma.equipment.findUniqueOrThrow({ where: { id: line.equipmentId } });
          return { equipmentId: line.equipmentId, qty: line.qty, dayRate: eq.dayRate, weekendRate: eq.weekendRate };
        }))
      }
    }
  });

  await Promise.all(payload.items.map((line) => prisma.booking.create({ data: { equipmentId: line.equipmentId, enquiryId: enquiry.id, startAt, endAt, qty: line.qty, status: 'HOLD' } })));

  await sendEmail(payload.contactEmail, `Enquiry received #${enquiry.id}`, `Thanks ${payload.contactName}, your enquiry has been received.`);
  await sendEmail(process.env.ADMIN_EMAIL ?? 'admin@example.com', `New enquiry #${enquiry.id}`, `Review in admin dashboard.`);

  return Response.json({ message: 'Enquiry submitted', enquiryId: enquiry.id });
}
