import Link from 'next/link';
import type { Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n';
import type { Tour } from '@/data/tours';

export default function TourCard({
  tour,
  dict,
  locale,
  priceFormatted
}: {
  tour: Tour;
  dict: Dictionary;
  locale: Locale;
  priceFormatted: string;
}) {
  const days = tour.durationHours >= 24 ? Math.round(tour.durationHours / 24) : null;
  const duration = days ? `${days}×24${dict.tour.hours}` : `${tour.durationHours} ${dict.tour.hours}`;

  return (
    <article className="card">
      <Link href={`/${locale}/tours/${tour.slug}` as never} className="media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tour.image} alt={tour.name[locale]} loading="lazy" />
      </Link>
      <div className="body">
        <div className="tags">
          {tour.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">
              {dict.tags[t]}
            </span>
          ))}
        </div>
        <h3>{tour.name[locale]}</h3>
        <p className="summary">{tour.summary[locale]}</p>
        <div className="meta">
          <span>⏱ {duration}</span>
          <span>📍 {tour.distanceKm} {dict.tour.km}</span>
          <span>👥 {dict.tour.upToGuests.replace('{n}', String(tour.maxGuests))}</span>
        </div>
        <div className="price-row">
          <div className="price">
            {priceFormatted} <small>/ {dict.tour.perJeep}</small>
          </div>
          <Link href={`/${locale}/tours/${tour.slug}` as never} className="btn btn-ghost" style={{ padding: '8px 16px' }}>
            {dict.tour.details}
          </Link>
        </div>
      </div>
    </article>
  );
}
