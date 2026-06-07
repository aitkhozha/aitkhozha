import Link from 'next/link';
import type { Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n';
import { siteConfig } from '@/config/site';

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="logo" style={{ fontSize: '1.3rem' }}>
            JEEP<span style={{ color: 'var(--brand)' }}>.ALATAU</span>
          </div>
          <p>{dict.footer.builtWith}</p>
          <div className="social" style={{ marginTop: 12 }}>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              📷 Instagram
            </a>
            <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              🎵 TikTok
            </a>
          </div>
        </div>
        <div>
          <h4>{dict.nav.tours}</h4>
          <Link href={`${base}#tours` as never} style={{ display: 'block' }}>
            {dict.sections.toursTitle}
          </Link>
          <Link href={`${base}#fleet` as never} style={{ display: 'block' }}>
            {dict.nav.fleet}
          </Link>
          <Link href={`${base}/booking` as never} style={{ display: 'block' }}>
            {dict.nav.booking}
          </Link>
          <Link href={`${base}/business-plan` as never} style={{ display: 'block' }}>
            {dict.nav.businessPlan}
          </Link>
        </div>
        <div>
          <h4>{dict.footer.contact}</h4>
          <p>{siteConfig.city}</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>
        </div>
      </div>
      <div className="foot-bottom">
        © {new Date().getFullYear()} {siteConfig.brand}. {dict.footer.rights}
      </div>
    </footer>
  );
}
