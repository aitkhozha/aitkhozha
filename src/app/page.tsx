import { prisma } from '@/lib/prisma';
import { EquipmentCard } from '@/components/EquipmentCard';
import { siteConfig } from '@/config/site';

export default async function HomePage() {
  const items = await prisma.equipment.findMany({ orderBy: [{ category: 'asc' }, { name: 'asc' }] });
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.businessName,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: 'United Kingdom'
  };

  return (
    <div className="container">
      <h1>Production-ready equipment rental</h1>
      <p>Browse by category, build a kit, and send a complete enquiry with dates and logistics in minutes.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }} aria-label="Catalogue">
        {items.map((item) => <EquipmentCard key={item.id} {...item} />)}
      </section>
    </div>
  );
}
