import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сура ан-Ниса | Коран',
  description: 'Первые 3 аята суры ан-Ниса с переводом на русский язык',
};

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
