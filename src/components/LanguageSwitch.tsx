'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeLabel, type Locale } from '@/i18n/locales';

export default function LanguageSwitch({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}`;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '';

  return (
    <div className="lang-switch" aria-label="Language">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}${rest}` as never}
          className={loc === current ? 'active' : ''}
          hrefLang={loc}
          aria-current={loc === current ? 'true' : undefined}
        >
          {localeLabel[loc]}
        </Link>
      ))}
    </div>
  );
}
