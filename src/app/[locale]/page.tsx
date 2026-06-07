import Link from 'next/link';
import { isLocale, type Locale } from '@/i18n/locales';
import { getDictionary } from '@/i18n';
import { tours } from '@/data/tours';
import { vehicles } from '@/data/vehicles';
import { priceInLocale, getDailyRates } from '@/lib/currency';
import TourCard from '@/components/TourCard';
import VehicleCard from '@/components/VehicleCard';
import { notFound } from 'next/navigation';

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  const [prices, rates] = await Promise.all([
    Promise.all(tours.map((t) => priceInLocale(t.priceKzt, locale))),
    getDailyRates()
  ]);

  const icons = ['🧭', '🚙', '🌍', '💰'];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">{dict.hero.eyebrow}</span>
            <h1>{dict.hero.title}</h1>
            <p className="lead">{dict.hero.subtitle}</p>
            <div className="hero-cta">
              <Link href={`/${locale}/booking` as never} className="btn btn-primary">
                {dict.hero.ctaPrimary}
              </Link>
              <Link href={`/${locale}#tours` as never} className="btn btn-ghost">
                {dict.hero.ctaSecondary}
              </Link>
            </div>
            <div className="fx-currency">
              <span className={`fx-dot ${rates.source === 'fallback' ? 'fallback' : ''}`} />
              {dict.currency.note}
            </div>
          </div>
          <div className="hero-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/tours/hero.svg" alt={dict.hero.title} />
          </div>
        </div>
      </section>

      <section className="block" id="tours">
        <div className="container">
          <div className="section-head">
            <h2>{dict.sections.toursTitle}</h2>
            <p>{dict.sections.toursSubtitle}</p>
          </div>
          <div className="grid grid-3">
            {tours.map((tour, i) => (
              <TourCard key={tour.slug} tour={tour} dict={dict} locale={locale} priceFormatted={prices[i].formatted} />
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="fleet" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="section-head">
            <h2>{dict.sections.fleetTitle}</h2>
            <p>{dict.sections.fleetSubtitle}</p>
          </div>
          <div className="grid grid-4">
            {vehicles.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} dict={dict} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="why">
        <div className="container">
          <div className="section-head">
            <h2>{dict.sections.whyTitle}</h2>
            <p>{dict.sections.whySubtitle}</p>
          </div>
          <div className="features">
            {dict.why.items.map((item, i) => (
              <div className="feature" key={i}>
                <div className="ico">{icons[i]}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="book" style={{ background: 'var(--bg-soft)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-head" style={{ margin: '0 auto 28px' }}>
            <h2>{dict.sections.bookingTitle}</h2>
            <p>{dict.sections.bookingSubtitle}</p>
          </div>
          <Link href={`/${locale}/booking` as never} className="btn btn-primary">
            {dict.hero.ctaPrimary}
          </Link>
        </div>
      </section>
    </>
  );
}
