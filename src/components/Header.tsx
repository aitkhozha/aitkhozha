import Link from 'next/link';
import type { Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n';
import LanguageSwitch from './LanguageSwitch';

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  return (
    <header className="site-header">
      <div className="bar">
        <Link href={base as never} className="logo">
          JEEP<b>.ALATAU</b>
        </Link>
        <nav className="nav">
          <Link href={`${base}#tours` as never}>{dict.nav.tours}</Link>
          <Link href={`${base}#fleet` as never}>{dict.nav.fleet}</Link>
          <Link href={`${base}/booking` as never}>{dict.nav.booking}</Link>
          <Link href={`${base}/business-plan` as never}>{dict.nav.businessPlan}</Link>
          <Link href={`${base}/booking` as never} className="btn btn-primary" style={{ padding: '8px 16px' }}>
            {dict.hero.ctaPrimary}
          </Link>
        </nav>
        <LanguageSwitch current={locale} />
      </div>
    </header>
  );
}
