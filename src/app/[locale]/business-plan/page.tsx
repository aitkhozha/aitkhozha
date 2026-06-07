import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/locales';
import {
  years,
  seasonality,
  investmentBreakdown,
  assumptions,
  opexLabels,
  breakEvenToursMonth,
  cumulativeNet,
  contributionPerTour,
  type YearModel
} from '@/data/businessPlan';
import { BarChart, LineChart, PieChart, ColumnChart, Legend, CHART_COLORS } from '@/components/charts';

export const metadata: Metadata = {
  title: 'Бизнес-план',
  description: 'Подробный бизнес-план проекта JEEP.ALATAU: джип-туры по горам Алматинской области.'
};

const fmt = (v: number) => `${Math.round(v).toLocaleString('ru-RU')} ₸`;

export default function BusinessPlanPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const revenueData = years.map((y) => ({ label: y.year, value: y.revenue }));
  const netData = years.map((y) => ({ label: y.year, value: y.netProfit }));
  const seasonData = seasonality.map((s) => ({ label: s.month, value: Math.round(years[1].tours * s.share) }));

  const y2 = years[1];
  const costStructure = [
    { label: 'Переменные затраты + эквайринг', value: y2.cogsVariable },
    ...(Object.keys(y2.opex) as (keyof YearModel['opex'])[]).map((k) => ({ label: opexLabels[k], value: y2.opex[k] }))
  ];
  const costTotal = costStructure.reduce((a, b) => a + b.value, 0);

  const investData = investmentBreakdown.map((i) => ({ label: i.item, value: i.amount }));

  const aiAutomation = [
    ['Обработка и перевод заявок', 'ИИ автоматически извлекает данные из заявки на любом из 7 языков и переводит её на русский для команды.'],
    ['Чат-бот бронирования 24/7', 'Мультиязычный ассистент отвечает на вопросы, подбирает тур и оформляет бронь без участия оператора.'],
    ['Динамическое ценообразование', 'Прогноз спроса по сезонности и загрузке автопарка для оптимальных цен и акций.'],
    ['Планирование маршрутов и логистика', 'Автоматическое распределение машин и водителей-гидов, оптимизация графиков.'],
    ['Контент и SMM', 'Генерация постов для Instagram/TikTok, описаний туров и рассылок на нужном языке.'],
    ['Анализ отзывов', 'Оценка тональности отзывов и автоматические рекомендации по улучшению сервиса.'],
    ['Погода и риски', 'Мониторинг погоды/лавинной обстановки и автоуведомления клиентам об изменениях.'],
    ['Документооборот и учёт', 'Автозаполнение договоров, счетов и первичной бухгалтерии.']
  ];

  const toc = [
    ['summary', '1. Резюме'],
    ['market', '2. Рынок'],
    ['audience', '3. Аудитория'],
    ['advantages', '4. Преимущества'],
    ['marketing', '5. Маркетинг'],
    ['operations', '6. Операции'],
    ['finance', '7. Финансовая модель'],
    ['ai', '8. Автоматизация и ИИ'],
    ['risks', '9. Риски']
  ];

  return (
    <section className="block">
      <div className="container">
        <span className="eyebrow">JEEP.ALATAU</span>
        <h1 style={{ marginTop: 6 }}>Бизнес-план: джип-туры по горам Алматинской области</h1>
        <p className="lead" style={{ color: 'var(--muted)', maxWidth: 760 }}>
          Запуск операторского бизнеса премиальных джип-туров по горным локациям Алматинской области под брендом
          JEEP.ALATAU: автопарк из 4 внедорожников, мультиязычный сайт, онлайн-бронирование и автоматизация процессов с
          помощью искусственного интеллекта.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '18px 0' }}>
          <a className="btn btn-primary" href="/downloads/jeep-alatau-financial-model.xlsx" download>
            ⬇ Скачать финансовую модель (Excel)
          </a>
          <a className="btn btn-ghost" href="/downloads/jeep-alatau-business-plan.md" download>
            ⬇ Текст бизнес-плана (Markdown)
          </a>
        </div>

        <div className="bp-toc">
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>

        {/* KPIs */}
        <div className="kpis">
          <div className="kpi">
            <div className="v">{fmt(assumptions.initialInvestment)}</div>
            <div className="k">Стартовые инвестиции</div>
          </div>
          <div className="kpi">
            <div className="v">{breakEvenToursMonth}</div>
            <div className="k">Точка безубыточности, туров/мес</div>
          </div>
          <div className="kpi">
            <div className="v">{fmt(cumulativeNet)}</div>
            <div className="k">Накопленная прибыль за 3 года</div>
          </div>
          <div className="kpi">
            <div className="v">{assumptions.fleetSize}</div>
            <div className="k">Внедорожника в автопарке</div>
          </div>
        </div>

        {/* 1. Summary */}
        <div className="bp-section" id="summary">
          <h2>1. Резюме проекта</h2>
          <div className="prose">
            <p>
              JEEP.ALATAU — оператор авторских джип-туров по горам Алматинской области. Целевые локации: Большое
              Алматинское озеро, Чарынский каньон, Кольсайские озёра и Каинды, плато Ассы, Тургенское ущелье,
              Тамгалы-Тас. Бизнес ориентирован на иностранных и внутренних туристов и работает на семи языках с ценами в
              местных валютах.
            </p>
            <p>
              Конкурентное позиционирование — премиальный сервис по цене на 20% ниже среднерыночной. Прибыльность
              достигается за счёт высокой маржинальности туров, автоматизации продаж и обработки заявок с помощью ИИ, а
              также сильного присутствия в Instagram и TikTok.
            </p>
          </div>
        </div>

        {/* 2. Market */}
        <div className="bp-section" id="market">
          <h2>2. Анализ рынка</h2>
          <div className="prose">
            <p>
              Алматы — главный туристический хаб Казахстана и «ворота» в горы Заилийского Алатау. Въездной туризм растёт
              двузначными темпами, увеличивается поток из Кореи, Китая, Малайзии и стран Залива. Горные джип-туры —
              один из самых востребованных активных форматов, при этом рынок фрагментирован: преобладают частные
              водители без брендинга и онлайн-сервиса.
            </p>
          </div>
          <div className="chart-card">
            <h3>Выручка по годам</h3>
            <BarChart data={revenueData} />
          </div>
        </div>

        {/* 3. Audience */}
        <div className="bp-section" id="audience">
          <h2>3. Целевая аудитория</h2>
          <div className="grid grid-2">
            <div className="aside-card">
              <ul className="checklist">
                <li>Иностранные туристы (Корея, Китай, Малайзия, ОАЭ, англоязычные рынки)</li>
                <li>Внутренние туристы из Казахстана и стран СНГ</li>
                <li>Корпоративные клиенты и тимбилдинги</li>
                <li>Фотографы, блогеры и съёмочные группы</li>
              </ul>
            </div>
            <div className="chart-card" style={{ margin: 0 }}>
              <h3>Сезонность загрузки (туров в месяц, Год 2)</h3>
              <ColumnChart data={seasonData} />
            </div>
          </div>
        </div>

        {/* 4. Advantages */}
        <div className="bp-section" id="advantages">
          <h2>4. Конкурентные преимущества</h2>
          <div className="features">
            <div className="feature"><div className="ico">🚙</div><h3>Надёжный автопарк</h3><p>Nissan Patrol Y61, Land Cruiser Prado 150, Honda Pilot, Hyundai Santa Fe.</p></div>
            <div className="feature"><div className="ico">🌍</div><h3>7 языков и валют</h3><p>Сайт и поддержка на 7 языках с автоконвертацией цен.</p></div>
            <div className="feature"><div className="ico">🤖</div><h3>ИИ-автоматизация</h3><p>Обработка, перевод заявок и бронирование с помощью ИИ.</p></div>
            <div className="feature"><div className="ico">💰</div><h3>Цена ниже на 20%</h3><p>Прозрачные тарифы ниже среднерыночных без потери маржи.</p></div>
          </div>
        </div>

        {/* 5. Marketing */}
        <div className="bp-section" id="marketing">
          <h2>5. Маркетинговая стратегия</h2>
          <div className="prose">
            <ul>
              <li>SMM и контент в Instagram и TikTok (@jeep.alatau), UGC и видео с туров.</li>
              <li>SEO-сайт на 7 языках, посадочные под каждый рынок и валюту.</li>
              <li>Партнёрства с отелями, гостевыми домами и турагентствами.</li>
              <li>Площадки: GetYourGuide, Viator, TripAdvisor, 2GIS, Google Business.</li>
              <li>Реферальная программа и работа с блогерами-путешественниками.</li>
            </ul>
          </div>
        </div>

        {/* 6. Operations */}
        <div className="bp-section" id="operations">
          <h2>6. Операционная модель</h2>
          <div className="chart-card">
            <h3>Структура затрат (Год 2)</h3>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <PieChart data={costStructure} />
              <div style={{ flex: 1, minWidth: 240 }}>
                <Legend
                  data={costStructure.map((c, i) => ({
                    label: c.label,
                    value: `${Math.round((c.value / costTotal) * 100)}%`,
                    color: CHART_COLORS[i % CHART_COLORS.length]
                  }))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 7. Finance */}
        <div className="bp-section" id="finance">
          <h2>7. Финансовая модель</h2>
          <p className="note">
            Базовые допущения: {assumptions.fleetSize} авто, активный сезон {assumptions.activeMonths} мес.,
            переменные затраты {fmt(assumptions.variableCostPerTour)} на тур, эквайринг{' '}
            {Math.round(assumptions.paymentFeePct * 100)}%. Маржинальная прибыль с тура ≈ {fmt(contributionPerTour)}.
          </p>

          <div className="chart-card">
            <h3>Чистая прибыль по годам</h3>
            <LineChart data={netData} />
          </div>

          <div className="chart-card">
            <h3>Отчёт о прибылях и убытках (КZT)</h3>
            <div className="table-wrap">
              <table className="fin">
                <thead>
                  <tr>
                    <th>Показатель</th>
                    {years.map((y) => (
                      <th key={y.year}>{y.year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Кол-во туров</td>
                    {years.map((y) => (
                      <td key={y.year}>{y.tours.toLocaleString('ru-RU')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Средний чек</td>
                    {years.map((y) => (
                      <td key={y.year}>{fmt(y.avgCheck)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Выручка</td>
                    {years.map((y) => (
                      <td key={y.year}>{fmt(y.revenue)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Переменные затраты</td>
                    {years.map((y) => (
                      <td key={y.year}>−{fmt(y.cogsVariable)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Валовая прибыль</td>
                    {years.map((y) => (
                      <td key={y.year}>{fmt(y.grossProfit)}</td>
                    ))}
                  </tr>
                  {(Object.keys(years[0].opex) as (keyof YearModel['opex'])[]).map((k) => (
                    <tr key={k}>
                      <td>{opexLabels[k]}</td>
                      {years.map((y) => (
                        <td key={y.year}>−{fmt(y.opex[k])}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td>Итого операционные расходы</td>
                    {years.map((y) => (
                      <td key={y.year}>−{fmt(y.totalOpex)}</td>
                    ))}
                  </tr>
                  <tr className="total">
                    <td>Чистая прибыль</td>
                    {years.map((y) => (
                      <td key={y.year}>{fmt(y.netProfit)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="chart-card">
            <h3>Стартовые инвестиции — {fmt(assumptions.initialInvestment)}</h3>
            <BarChart data={investData} height={300} />
            <div className="table-wrap" style={{ marginTop: 16 }}>
              <table className="fin">
                <tbody>
                  {investmentBreakdown.map((i) => (
                    <tr key={i.item}>
                      <td>{i.item}</td>
                      <td>{fmt(i.amount)}</td>
                    </tr>
                  ))}
                  <tr className="total">
                    <td>Итого</td>
                    <td>{fmt(assumptions.initialInvestment)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 8. AI */}
        <div className="bp-section" id="ai">
          <h2>8. Автоматизация бизнес-процессов с помощью ИИ</h2>
          <div className="grid grid-2">
            {aiAutomation.map(([title, text]) => (
              <div className="aside-card" key={title}>
                <h3 style={{ marginTop: 0 }}>🤖 {title}</h3>
                <p className="note">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Risks */}
        <div className="bp-section" id="risks">
          <h2>9. Риски и их снижение</h2>
          <div className="table-wrap">
            <table className="fin">
              <thead>
                <tr>
                  <th>Риск</th>
                  <th>Меры снижения</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ textAlign: 'left' }}>Сезонность спроса</td><td style={{ textAlign: 'left' }}>Зимние программы, корпоративы, диверсификация рынков</td></tr>
                <tr><td style={{ textAlign: 'left' }}>Погодные и дорожные риски</td><td style={{ textAlign: 'left' }}>Гибкий перенос, страхование, мониторинг погоды через ИИ</td></tr>
                <tr><td style={{ textAlign: 'left' }}>Износ автопарка</td><td style={{ textAlign: 'left' }}>Плановое ТО, резервный автомобиль, лизинг с обновлением</td></tr>
                <tr><td style={{ textAlign: 'left' }}>Колебания валютных курсов</td><td style={{ textAlign: 'left' }}>Автообновление курса, цены в валюте клиента</td></tr>
                <tr><td style={{ textAlign: 'left' }}>Конкуренция</td><td style={{ textAlign: 'left' }}>Бренд, сервис, цена ниже на 20%, сильный SMM</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
