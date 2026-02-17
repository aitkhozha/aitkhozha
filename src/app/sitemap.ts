import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return ['/', '/build-kit', '/enquiry', '/policies/rental-terms', '/policies/insurance', '/policies/privacy', '/policies/cookies', '/policies/returns-damage'].map((path) => ({ url: `${base}${path}` }));
}
