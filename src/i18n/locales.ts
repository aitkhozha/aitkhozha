export const locales = ['ru', 'kk', 'en', 'ko', 'zh', 'ms', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Currency assigned to each locale per the technical specification.
// - Russian & Kazakh ......... KZT (Kazakhstani tenge)
// - English .................. USD (US dollar)
// - Korean .................. KRW (South Korean won)
// - Chinese ................. CNY (Chinese yuan)
// - Malay ................... MYR (Malaysian ringgit)
// - Arabic .................. AED (UAE dirham)
export const localeCurrency: Record<Locale, string> = {
  ru: 'KZT',
  kk: 'KZT',
  en: 'USD',
  ko: 'KRW',
  zh: 'CNY',
  ms: 'MYR',
  ar: 'AED'
};

// BCP-47 tag used for number/currency formatting.
export const localeIntlTag: Record<Locale, string> = {
  ru: 'ru-RU',
  kk: 'kk-KZ',
  en: 'en-US',
  ko: 'ko-KR',
  zh: 'zh-CN',
  ms: 'ms-MY',
  ar: 'ar-AE'
};

export const localeDir: Record<Locale, 'ltr' | 'rtl'> = {
  ru: 'ltr',
  kk: 'ltr',
  en: 'ltr',
  ko: 'ltr',
  zh: 'ltr',
  ms: 'ltr',
  ar: 'rtl'
};

export const localeLabel: Record<Locale, string> = {
  ru: 'Русский',
  kk: 'Қазақша',
  en: 'English',
  ko: '한국어',
  zh: '中文',
  ms: 'Bahasa Melayu',
  ar: 'العربية'
};

// Compact 2-letter codes used in the language switcher alongside the native
// language name. (Replaces the previous emoji flags.)
export const localeShort: Record<Locale, string> = {
  ru: 'RU',
  kk: 'KZ',
  en: 'EN',
  ko: 'KO',
  zh: 'ZH',
  ms: 'MS',
  ar: 'AR'
};
