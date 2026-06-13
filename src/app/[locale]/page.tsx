import Link from 'next/link';
import { isLocale, type Locale } from '@/i18n/locales';
import { getDictionary } from '@/i18n';
import { tours } from '@/data/tours';
import { vehicles } from '@/data/vehicles';
import { priceInLocale, getDailyRates } from '@/lib/currency';
import TourCard from '@/components/TourCard';
import VehicleCard from '@/components/VehicleCard';
import {
  CompassIcon,
  CarIcon,
  GlobeIcon,
  TagIcon,
  CheckIcon,
  PinIcon,
  CalendarIcon,
  CpuIcon,
  MountainIcon,
  ChevronDownIcon
} from '@/components/icons';
import { notFound } from 'next/navigation';

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  const [prices, rates] = await Promise.all([
    Promise.all(tours.map((t) => priceInLocale(t.priceKzt, locale))),
    getDailyRates()
  ]);

  const whyIcons = [CompassIcon, CarIcon, GlobeIcon, TagIcon];
  const stepIcons = [PinIcon, CalendarIcon, CpuIcon, MountainIcon];

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
            <ul className="trust-row">
              {dict.trust.map((item, i) => (
                <li key={i}>
                  <CheckIcon size={15} /> {item}
                </li>
              ))}
            </ul>
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

      <section className="statband">
        <div className="container metrics">
          {dict.stats.map((s, i) => (
            <div className="metric" key={i}>
              <div className="metric-v">{s.value}</div>
              <div className="metric-k">{s.label}</div>
            </div>
          ))}
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
            {dict.why.items.map((item, i) => {
              const Ico = whyIcons[i] ?? CompassIcon;
              return (
                <div className="feature" key={i}>
                  <div className="ico">
                    <Ico size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="block" id="how" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="section-head">
            <h2>{dict.how.title}</h2>
            <p>{dict.how.subtitle}</p>
          </div>
          <div className="steps">
            {dict.how.steps.map((step, i) => {
              const Ico = stepIcons[i] ?? PinIcon;
              return (
                <div className="step" key={i}>
                  <span className="step-num">{i + 1}</span>
                  <div className="step-ico">
                    <Ico size={22} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="block" id="faq">
        <div className="container">
          <div className="section-head">
            <h2>{dict.faq.title}</h2>
            <p>{dict.faq.subtitle}</p>
          </div>
          <div className="faq">
            {dict.faq.items.map((item, i) => (
              <details className="faq-item" key={i}>
                <summary>
                  <span>{item.q}</span>
                  <ChevronDownIcon size={20} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="block cta-band" id="book">
        <div className="container cta-inner">
          <div className="section-head" style={{ margin: 0 }}>
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
