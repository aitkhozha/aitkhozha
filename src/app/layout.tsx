import './globals.css';

// The real <html>/<body> wrapper lives in app/[locale]/layout.tsx so that the
// document language and direction follow the active locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
