# JEEP.ALATAU

Multilingual website + business plan for **JEEP.ALATAU** — jeep tours across the
mountain locations of the Almaty region (Big Almaty Lake, Charyn Canyon, Kolsai &
Kaindy Lakes, Assy Plateau, Turgen Gorge, Tamgaly-Tas).

Built with **Next.js 14 (App Router)** + **TypeScript**.

## Features

- **7 languages**: Russian, Kazakh, English, Korean, Chinese, Malay, Arabic
  (with full RTL support for Arabic). Locale routing under `/[locale]`.
- **Multi-currency with live FX**: prices are stored in KZT and auto-converted to
  the locale's currency (RU/KK → KZT, EN → USD, KO → KRW, ZH → CNY, MS → MYR,
  AR → AED) using the **daily average rate** against the tenge, cached per day,
  with an offline fallback. See `src/lib/currency.ts`.
- **Pricing ~20% below the reference operator** (`src/config/site.ts`).
- **Online booking** (`/[locale]/booking`) with an API (`/api/booking`) that
  validates input, **translates every enquiry to Russian** via the Claude API
  (optional `ANTHROPIC_API_KEY`; degrades gracefully) and stores it.
- **AI automation** hooks and roadmap documented in the business plan.
- **Online-payment ready**: env placeholders for a future internet-banking /
  acquiring integration; bookings already carry a payment-fee assumption.
- **Fleet showcase**: Nissan Patrol Y61, Toyota Land Cruiser Prado 150, Honda
  Pilot, Hyundai Santa Fe — on Almaty mountain backdrops.
- **Social links**: Instagram & TikTok (`@jeep.alatau`).
- **Business plan** page (`/[locale]/business-plan`) with colourful charts
  (revenue, net profit, cost structure, seasonality, investments) and a full P&L.
- **Editable Excel financial model** generated with formulas
  (`public/downloads/jeep-alatau-financial-model.xlsx`).

## Getting started

```bash
npm install
npm run financial-model   # (re)generate the Excel model
npm run dev               # http://localhost:3000  → redirects to /ru
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` / `npm run typecheck` | Quality gates |
| `npm test` | Unit tests (Vitest) |
| `npm run financial-model` | Regenerate the Excel financial model |
| `node scripts/generate-images.mjs` | Regenerate SVG scene placeholders |

## Replacing placeholder photos

The site ships with branded SVG scene placeholders in `public/images/tours` and
`public/images/fleet`. Drop **real photos** of the vehicles on Almaty mountain
backgrounds using the same filenames to replace them (e.g.
`public/images/fleet/nissan-patrol-y61.svg` → `.jpg` and update the path in
`src/data/vehicles.ts`).

## Configuration

Copy `.env.example` to `.env`. All variables are optional for local use; set
`ANTHROPIC_API_KEY` to enable AI translation of enquiries, and the `PAYMENT_*`
variables when wiring up online banking.

## Deployment

Standalone Next.js app — deploy to Vercel, Fly, Render, a container, etc.
On read-only/serverless filesystems the file-based booking store is best-effort;
swap `src/lib/bookingStore.ts` for a database (e.g. Supabase/Postgres) or a CRM
webhook in production.
