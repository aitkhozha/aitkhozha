import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/locales';
import { tours } from '@/data/tours';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({ url: `${base}/${locale}`, lastModified: now, priority: 1 });
    entries.push({ url: `${base}/${locale}/booking`, lastModified: now, priority: 0.8 });
    entries.push({ url: `${base}/${locale}/business-plan`, lastModified: now, priority: 0.6 });
    for (const tour of tours) {
      entries.push({ url: `${base}/${locale}/tours/${tour.slug}`, lastModified: now, priority: 0.7 });
    }
  }

  return entries;
}
