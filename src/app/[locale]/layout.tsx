import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, localeDir, isLocale, type Locale } from '@/i18n/locales';
import { getDictionary } from '@/i18n';
import { siteConfig } from '@/config/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}`]));
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: { default: dict.meta.title, template: `%s — ${siteConfig.brand}` },
    description: dict.meta.description,
    alternates: { canonical: `/${params.locale}`, languages },
    openGraph: { type: 'website', title: dict.meta.title, description: dict.meta.description, siteName: siteConfig.brand },
    twitter: { card: 'summary_large_image', title: dict.meta.title, description: dict.meta.description }
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} dir={localeDir[locale]}>
      <body>
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
