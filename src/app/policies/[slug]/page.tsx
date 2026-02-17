import { notFound } from 'next/navigation';

const pages: Record<string, { title: string; body: string }> = {
  'rental-terms': { title: 'Rental terms summary', body: 'Equipment is supplied on agreed hire period. Late returns and missing items are chargeable. Prep and check-out must be signed by client.' },
  'insurance': { title: 'Insurance requirements', body: 'A valid COI with hired-in equipment cover is required before release. Excess and exclusions remain client responsibility.' },
  'privacy': { title: 'Privacy policy', body: 'We process enquiry data solely for booking, legal compliance, and operational communication.' },
  'cookies': { title: 'Cookies notice', body: 'Essential cookies are used for session handling and draft continuity. Optional analytics can be enabled with consent.' },
  'returns-damage': { title: 'Returns & damage policy', body: 'Damage or loss is assessed at replacement value less fair wear. Incident reporting required within 24 hours.' }
};

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const page = pages[params.slug];
  if (!page) return notFound();
  return <div className="container"><h1>{page.title}</h1><p>{page.body}</p></div>;
}
