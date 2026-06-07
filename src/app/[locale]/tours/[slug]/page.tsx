import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, isLocale, type Locale } from '@/i18n/locales';
import { getDictionary } from '@/i18n';
import { tours, getTour } from '@/data/tours';
import { priceInLocale } from '@/lib/currency';

export function generateStaticParams() {
  return locales.flatMap((locale) => tours.map((t) => ({ locale, slug: t.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const tour = getTour(params.slug);
  if (!tour) return {};
  return { title: tour.name[params.locale], description: tour.summary[params.locale] };
}

export default async function TourPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const tour = getTour(params.slug);
  if (!tour) notFound();

  const price = await priceInLocale(tour.priceKzt, locale);
  const days = tour.durationHours >= 24 ? Math.round(tour.durationHours / 24) : null;
  const duration = days ? `${days}×24 ${dict.tour.hours}` : `${tour.durationHours} ${dict.tour.hours}`;

  return (
    <section className="block">
      <div className="container">
        <Link href={`/${locale}#tours` as never} className="note" style={{ display: 'inline-block', marginBottom: 18 }}>
          {dict.tour.backToTours}
        </Link>

        <div className="detail-hero">
          <div className="media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tour.image} alt={tour.name[locale]} />
          </div>
          <div>
            <div className="tags" style={{ marginBottom: 12 }}>
              {tour.tags.map((t) => (
                <span key={t} className="tag">
                  {dict.tags[t]}
                </span>
              ))}
            </div>
            <h1 style={{ marginTop: 0 }}>{tour.name[locale]}</h1>
            <p className="lead" style={{ color: 'var(--muted)' }}>
              {tour.summary[locale]}
            </p>

            <div className="detail-stats">
              <div className="stat">
                <div className="k">{dict.tour.duration}</div>
                <div className="v">⏱ {duration}</div>
              </div>
              <div className="stat">
                <div className="k">{dict.tour.distance}</div>
                <div className="v">📍 {tour.distanceKm} {dict.tour.km}</div>
              </div>
              <div className="stat">
                <div className="k">👥</div>
                <div className="v">{dict.tour.upToGuests.replace('{n}', String(tour.maxGuests))}</div>
              </div>
              <div className="stat">
                <div className="k">{dict.tour.difficulty}</div>
                <div className="v">⛰ {dict.tour.difficultyLevels[tour.difficulty]}</div>
              </div>
            </div>

            <div className="price-row">
              <div className="price" style={{ fontSize: '2rem' }}>
                {price.formatted} <small>/ {dict.tour.perJeep}</small>
              </div>
            </div>
            <Link
              href={`/${locale}/booking?tour=${tour.slug}` as never}
              className="btn btn-primary btn-block"
              style={{ marginTop: 16 }}
            >
              {dict.tour.bookNow}
            </Link>
          </div>
        </div>

        <div className="grid grid-2" style={{ marginTop: 40 }}>
          <div className="aside-card">
            <h3 style={{ marginTop: 0 }}>{dict.tour.includedTitle}</h3>
            <ul className="checklist">
              {dict.tour.included.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="aside-card">
            <h3 style={{ marginTop: 0 }}>{dict.tour.bringTitle}</h3>
            <ul className="checklist">
              {dict.tour.bring.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
