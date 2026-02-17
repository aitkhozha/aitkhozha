import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

export async function POST(req: Request) {
  const { enquiryId, amount } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price_data: { currency: 'gbp', unit_amount: amount, product_data: { name: `Deposit for enquiry ${enquiryId}` } }, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/enquiry?paid=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/enquiry?paid=0`,
    metadata: { enquiryId }
  });
  return Response.json({ url: session.url });
}
