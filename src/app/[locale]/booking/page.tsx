import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/locales';
import { getDictionary } from '@/i18n';
import { tours } from '@/data/tours';
import { vehicles } from '@/data/vehicles';
import { siteConfig } from '@/config/site';
import BookingForm from '@/components/BookingForm';
import { CardIcon, InstagramIcon, TikTokIcon } from '@/components/icons';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return { title: dict.sections.bookingTitle, description: dict.sections.bookingSubtitle };
}

export default function BookingPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  const tourOptions = tours.map((t) => ({ slug: t.slug, label: t.name[locale] }));
  const vehicleOptions = vehicles.map((v) => ({ slug: v.slug, label: v.name }));

  return (
    <section className="block">
      <div className="container">
        <div className="section-head">
          <h1 style={{ marginTop: 0 }}>{dict.sections.bookingTitle}</h1>
          <p>{dict.sections.bookingSubtitle}</p>
        </div>

        <div className="booking-wrap">
          <div className="aside-card">
            <Suspense fallback={null}>
              <BookingForm locale={locale} dict={dict} tourOptions={tourOptions} vehicleOptions={vehicleOptions} />
            </Suspense>
          </div>

          <aside style={{ display: 'grid', gap: 16 }}>
            <div className="aside-card">
              <h3 className="with-icon" style={{ marginTop: 0 }}><CardIcon size={20} /> {dict.nav.booking}</h3>
              <p className="note">{dict.booking.paymentNote}</p>
              <p className="note">{dict.currency.note}</p>
            </div>
            <div className="aside-card">
              <h3 style={{ marginTop: 0 }}>{dict.footer.contact}</h3>
              <p className="note">{siteConfig.city}</p>
              <p className="note">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
              <p className="note">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>
              </p>
              <div className="social" style={{ marginTop: 10 }}>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon size={18} /> Instagram
                </a>
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer">
                  <TikTokIcon size={18} /> TikTok
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
