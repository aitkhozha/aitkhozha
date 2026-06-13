import { localeCurrency, localeIntlTag, type Locale } from '@/i18n/locales';

// All catalogue prices are stored in the base currency (KZT). At render time we
// convert to the visitor's currency using the daily average exchange rate.
//
// Rates express "how many units of the target currency 1 KZT buys".
// Example: 1 KZT ≈ 0.0021 USD.

export const BASE_CURRENCY = 'KZT';

// Conservative offline fallback (approx. mid-2026 averages). Used only when the
// live rate provider is unreachable so the site never renders without a price.
const FALLBACK_RATES: Record<string, number> = {
  KZT: 1,
  USD: 0.00194,
  KRW: 2.62,
  CNY: 0.0139,
  MYR: 0.0086,
  AED: 0.0071
};

type RatesPayload = {
  base: string;
  rates: Record<string, number>;
  fetchedAt: string; // ISO date
  source: 'live' | 'fallback';
};

let cache: RatesPayload | null = null;

const todayKey = () => new Date().toISOString().slice(0, 10);

/**
 * Returns daily exchange rates relative to KZT. Cached per calendar day so the
 * "average rate of the conversion day" is applied consistently across the site.
 */
export async function getDailyRates(): Promise<RatesPayload> {
  if (cache && cache.fetchedAt.slice(0, 10) === todayKey()) {
    return cache;
  }

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${BASE_CURRENCY}`, {
      // Revalidate once per day; the provider publishes a daily average.
      next: { revalidate: 60 * 60 * 24 }
    });
    if (res.ok) {
      const data = (await res.json()) as { result?: string; rates?: Record<string, number> };
      if (data.result === 'success' && data.rates) {
        cache = {
          base: BASE_CURRENCY,
          rates: { ...FALLBACK_RATES, ...data.rates },
          fetchedAt: new Date().toISOString(),
          source: 'live'
        };
        return cache;
      }
    }
  } catch {
    // fall through to fallback rates
  }

  cache = {
    base: BASE_CURRENCY,
    rates: FALLBACK_RATES,
    fetchedAt: new Date().toISOString(),
    source: 'fallback'
  };
  return cache;
}

export function convertFromBase(amountKzt: number, targetCurrency: string, rates: Record<string, number>): number {
  const rate = rates[targetCurrency] ?? FALLBACK_RATES[targetCurrency] ?? 1;
  return amountKzt * rate;
}

const zeroDecimalCurrencies = new Set(['KZT', 'KRW']);

export function formatMoney(amount: number, currency: string, locale: Locale): string {
  const intlTag = localeIntlTag[locale];
  const maximumFractionDigits = zeroDecimalCurrencies.has(currency) ? 0 : 2;
  try {
    return new Intl.NumberFormat(intlTag, {
      style: 'currency',
      currency,
      maximumFractionDigits,
      minimumFractionDigits: 0
    }).format(amount);
  } catch {
    return `${Math.round(amount).toLocaleString()} ${currency}`;
  }
}

/**
 * Converts a base (KZT) price and formats it in the locale's currency.
 */
export async function priceInLocale(amountKzt: number, locale: Locale) {
  const { rates, source, fetchedAt } = await getDailyRates();
  const currency = localeCurrency[locale];
  const converted = convertFromBase(amountKzt, currency, rates);
  // Round nicely: zero-decimal currencies to nearest unit, others to 2dp.
  const rounded = zeroDecimalCurrencies.has(currency) ? Math.round(converted) : Math.round(converted * 100) / 100;
  return {
    currency,
    amount: rounded,
    formatted: formatMoney(rounded, currency, locale),
    source,
    fetchedAt
  };
}
