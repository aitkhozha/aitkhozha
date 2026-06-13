/**
 * Single source of truth for the JEEP.ALATAU financial model.
 * All figures are in KZT. This module has no framework imports so it can be
 * consumed both by the React business-plan page and by the Excel generator
 * (scripts/generate-financial-model.ts).
 */

export const currencyLabel = 'KZT';

export const assumptions = {
  fleetSize: 4,
  activeMonths: 9,
  variableCostPerTour: 17000, // fuel + supplies + park/entry fees
  paymentFeePct: 0.03, // online banking / card acquiring
  initialInvestment: 17_000_000
};

export type YearModel = {
  year: string;
  tours: number;
  avgCheck: number; // KZT per jeep tour
  revenue: number;
  cogsVariable: number; // variable cost incl. payment fees
  grossProfit: number;
  opex: {
    drivers: number;
    admin: number;
    marketing: number;
    vehicleLease: number;
    maintenance: number;
    insurance: number;
    softwareAi: number;
    office: number;
  };
  totalOpex: number;
  netProfit: number;
};

function buildYear(year: string, tours: number, avgCheck: number, opex: YearModel['opex']): YearModel {
  const revenue = tours * avgCheck;
  const variable = tours * assumptions.variableCostPerTour;
  const fees = Math.round(revenue * assumptions.paymentFeePct);
  const cogsVariable = variable + fees;
  const grossProfit = revenue - cogsVariable;
  const totalOpex = Object.values(opex).reduce((a, b) => a + b, 0);
  const netProfit = grossProfit - totalOpex;
  return { year, tours, avgCheck, revenue, cogsVariable, grossProfit, opex, totalOpex, netProfit };
}

export const years: YearModel[] = [
  buildYear('Год 1', 420, 80000, {
    drivers: 9_600_000,
    admin: 3_000_000,
    marketing: 3_600_000,
    vehicleLease: 7_200_000,
    maintenance: 2_400_000,
    insurance: 1_200_000,
    softwareAi: 1_200_000,
    office: 1_800_000
  }),
  buildYear('Год 2', 720, 88000, {
    drivers: 17_280_000,
    admin: 6_720_000,
    marketing: 4_800_000,
    vehicleLease: 8_400_000,
    maintenance: 3_000_000,
    insurance: 1_500_000,
    softwareAi: 1_500_000,
    office: 2_400_000
  }),
  buildYear('Год 3', 1040, 95000, {
    drivers: 24_480_000,
    admin: 10_800_000,
    marketing: 6_000_000,
    vehicleLease: 10_800_000,
    maintenance: 3_600_000,
    insurance: 1_800_000,
    softwareAi: 1_800_000,
    office: 3_000_000
  })
];

// Monthly seasonality for tour volume (sums to 1.0). Almaty mountain season
// peaks May–September.
export const seasonality: { month: string; share: number }[] = [
  { month: 'Янв', share: 0.02 },
  { month: 'Фев', share: 0.02 },
  { month: 'Мар', share: 0.04 },
  { month: 'Апр', share: 0.07 },
  { month: 'Май', share: 0.12 },
  { month: 'Июн', share: 0.14 },
  { month: 'Июл', share: 0.15 },
  { month: 'Авг', share: 0.15 },
  { month: 'Сен', share: 0.12 },
  { month: 'Окт', share: 0.09 },
  { month: 'Ноя', share: 0.05 },
  { month: 'Дек', share: 0.03 }
];

export const investmentBreakdown: { item: string; amount: number }[] = [
  { item: 'Авансы/депозиты по лизингу автопарка', amount: 6_000_000 },
  { item: 'Оборудование (трос, лебёдки, палатки, связь, аптечки)', amount: 3_000_000 },
  { item: 'Брендинг, сайт, ИИ и система бронирования', amount: 2_500_000 },
  { item: 'Лицензии, разрешения, юридическое оформление', amount: 1_500_000 },
  { item: 'Стартовый маркетинг и запуск', amount: 4_000_000 }
];

// Derived KPIs
const y2 = years[1];
export const contributionPerTour =
  y2.avgCheck - assumptions.variableCostPerTour - Math.round(y2.avgCheck * assumptions.paymentFeePct);
export const breakEvenToursMonth = Math.ceil(y2.totalOpex / 12 / contributionPerTour);
export const cumulativeNet = years.reduce((acc, y) => acc + y.netProfit, 0);

export const opexLabels: Record<keyof YearModel['opex'], string> = {
  drivers: 'Водители-гиды',
  admin: 'Администрация',
  marketing: 'Маркетинг',
  vehicleLease: 'Лизинг автопарка',
  maintenance: 'Обслуживание авто',
  insurance: 'Страхование',
  softwareAi: 'ПО и ИИ',
  office: 'Офис и прочее'
};
