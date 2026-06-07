export const siteConfig = {
  brand: 'JEEP.ALATAU',
  legalName: 'JEEP.ALATAU',
  tagline: 'Jeep tours across the mountain locations of the Almaty region',
  email: 'aitkhozha@gmail.com',
  phone: '+7 700 000 0000',
  whatsapp: '+7 700 000 0000',
  city: 'Almaty, Kazakhstan',
  // Base currency in which all prices are stored. All other currencies are
  // converted from this base using the live daily average exchange rate.
  baseCurrency: 'KZT',
  social: {
    instagram: 'https://www.instagram.com/jeep.alatau',
    tiktok: 'https://www.tiktok.com/@jeep.alatau'
  },
  // Pricing is positioned ~20% below the reference operator's published rates.
  pricingDiscountVsReference: 0.2
} as const;

export type SiteConfig = typeof siteConfig;
