import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: siteConfig.businessName, template: `%s | ${siteConfig.businessName}` },
  description: 'Professional filming equipment rental for commercials, drama, docs and branded content.',
  openGraph: { type: 'website', title: siteConfig.businessName, description: 'Build your camera, lighting and grip package in minutes.' },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <header className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/">{siteConfig.businessName}</Link>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/build-kit">Build a kit</Link>
            <Link href="/enquiry">Enquiry wizard</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
