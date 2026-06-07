/**
 * Generates an editable Excel financial model that mirrors the on-site model.
 * The P&L uses live formulas referencing the "Допущения" (assumptions) and the
 * input rows, so the operator can change any number by hand and the workbook
 * recalculates automatically.
 *
 * Run: npm run financial-model
 */
import ExcelJS from 'exceljs';
import path from 'node:path';
import { years, seasonality, investmentBreakdown, assumptions, opexLabels, type YearModel } from '../src/data/businessPlan';

const MONEY = '#,##0 "₸"';
const PCT = '0.0%';

async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'JEEP.ALATAU';
  wb.created = new Date();

  // ---- Assumptions sheet ----
  const a = wb.addWorksheet('Допущения');
  a.columns = [
    { header: 'Допущение', key: 'k', width: 42 },
    { header: 'Значение', key: 'v', width: 18 }
  ];
  a.getRow(1).font = { bold: true, color: { argb: 'FFD97706' } };
  const aRows = [
    ['Переменные затраты на тур, ₸', assumptions.variableCostPerTour, MONEY],
    ['Комиссия эквайринга / онлайн-банкинг', assumptions.paymentFeePct, PCT],
    ['Стартовые инвестиции, ₸', assumptions.initialInvestment, MONEY],
    ['Размер автопарка', assumptions.fleetSize, '0'],
    ['Активный сезон, мес', assumptions.activeMonths, '0']
  ] as const;
  aRows.forEach(([k, v, fmt]) => {
    const r = a.addRow({ k, v });
    r.getCell('v').numFmt = fmt as string;
  });
  // Named cells for clarity (referenced from the P&L)
  const VAR = 'Допущения!$B$2';
  const FEE = 'Допущения!$B$3';

  // ---- P&L sheet ----
  const s = wb.addWorksheet('Финансовая модель');
  s.columns = [
    { header: 'Показатель', key: 'label', width: 34 },
    { header: 'Год 1', key: 'y1', width: 16 },
    { header: 'Год 2', key: 'y2', width: 16 },
    { header: 'Год 3', key: 'y3', width: 16 }
  ];
  s.getRow(1).font = { bold: true, color: { argb: 'FFD97706' } };
  s.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF111A2E' } };
  s.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  const cols = ['B', 'C', 'D'];
  const setMoney = (rowNum: number) => cols.forEach((c) => (s.getCell(`${c}${rowNum}`).numFmt = MONEY));

  // Row 2: tours (input)
  s.addRow(['Кол-во туров', ...years.map((y) => y.tours)]);
  // Row 3: avg check (input)
  const rAvg = s.addRow(['Средний чек, ₸', ...years.map((y) => y.avgCheck)]);
  cols.forEach((c) => (s.getCell(`${c}${rAvg.number}`).numFmt = MONEY));

  // Row 4: revenue = tours * avgCheck
  const rRev = s.addRow(['Выручка', null, null, null]);
  cols.forEach((c) => (s.getCell(`${c}${rRev.number}`).value = { formula: `${c}2*${c}3` }));
  setMoney(rRev.number);

  // Row 5: variable cost = tours*VAR + revenue*FEE
  const rVar = s.addRow(['Переменные затраты + эквайринг', null, null, null]);
  cols.forEach((c) => (s.getCell(`${c}${rVar.number}`).value = { formula: `${c}2*${VAR}+${c}${rRev.number}*${FEE}` }));
  setMoney(rVar.number);

  // Row 6: gross profit
  const rGross = s.addRow(['Валовая прибыль', null, null, null]);
  cols.forEach((c) => (s.getCell(`${c}${rGross.number}`).value = { formula: `${c}${rRev.number}-${c}${rVar.number}` }));
  setMoney(rGross.number);
  s.getRow(rGross.number).font = { bold: true };

  // OPEX input rows
  const opexKeys = Object.keys(years[0].opex) as (keyof YearModel['opex'])[];
  const firstOpexRow = rGross.number + 1;
  opexKeys.forEach((k) => {
    const r = s.addRow([opexLabels[k], ...years.map((y) => y.opex[k])]);
    setMoney(r.number);
  });
  const lastOpexRow = firstOpexRow + opexKeys.length - 1;

  // Total OPEX
  const rOpex = s.addRow(['Итого операционные расходы', null, null, null]);
  cols.forEach((c) => (s.getCell(`${c}${rOpex.number}`).value = { formula: `SUM(${c}${firstOpexRow}:${c}${lastOpexRow})` }));
  setMoney(rOpex.number);
  s.getRow(rOpex.number).font = { bold: true };

  // Net profit
  const rNet = s.addRow(['Чистая прибыль', null, null, null]);
  cols.forEach((c) => (s.getCell(`${c}${rNet.number}`).value = { formula: `${c}${rGross.number}-${c}${rOpex.number}` }));
  setMoney(rNet.number);
  s.getRow(rNet.number).font = { bold: true, color: { argb: 'FF16A34A' } };

  // Margin
  const rMargin = s.addRow(['Рентабельность по чистой прибыли', null, null, null]);
  cols.forEach((c) => (s.getCell(`${c}${rMargin.number}`).value = { formula: `${c}${rNet.number}/${c}${rRev.number}` }));
  cols.forEach((c) => (s.getCell(`${c}${rMargin.number}`).numFmt = PCT));

  // Cumulative
  const rCum = s.addRow(['Накопленная чистая прибыль', null, null, null]);
  s.getCell(`B${rCum.number}`).value = { formula: `B${rNet.number}` };
  s.getCell(`C${rCum.number}`).value = { formula: `B${rCum.number}+C${rNet.number}` };
  s.getCell(`D${rCum.number}`).value = { formula: `C${rCum.number}+D${rNet.number}` };
  setMoney(rCum.number);

  // ---- Seasonality sheet ----
  const se = wb.addWorksheet('Сезонность');
  se.columns = [
    { header: 'Месяц', key: 'm', width: 12 },
    { header: 'Доля, %', key: 'p', width: 12 },
    { header: 'Туров (Год 2)', key: 't', width: 16 }
  ];
  se.getRow(1).font = { bold: true, color: { argb: 'FFD97706' } };
  seasonality.forEach((row) => {
    const r = se.addRow({ m: row.month, p: row.share, t: Math.round(years[1].tours * row.share) });
    r.getCell('p').numFmt = PCT;
  });

  // ---- Investment sheet ----
  const inv = wb.addWorksheet('Инвестиции');
  inv.columns = [
    { header: 'Статья', key: 'i', width: 52 },
    { header: 'Сумма, ₸', key: 'a', width: 18 }
  ];
  inv.getRow(1).font = { bold: true, color: { argb: 'FFD97706' } };
  investmentBreakdown.forEach((row) => {
    const r = inv.addRow({ i: row.item, a: row.amount });
    r.getCell('a').numFmt = MONEY;
  });
  const totalRow = inv.addRow({ i: 'ИТОГО', a: null });
  totalRow.getCell('a').value = { formula: `SUM(B2:B${investmentBreakdown.length + 1})` };
  totalRow.getCell('a').numFmt = MONEY;
  totalRow.font = { bold: true };

  const out = path.join(process.cwd(), 'public', 'downloads', 'jeep-alatau-financial-model.xlsx');
  await wb.xlsx.writeFile(out);
  // eslint-disable-next-line no-console
  console.log('Wrote', out);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
