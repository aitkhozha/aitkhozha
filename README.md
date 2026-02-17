# Film equipment rental platform

Next.js + Prisma + PostgreSQL application for rapid film equipment enquiries, availability checks, and admin triage.

## Highlights
- SEO-friendly server-rendered catalogue and equipment details
- Build-a-kit page with pricing estimate
- Multi-step enquiry wizard with local autosave
- Availability conflict checking and booking hold creation
- Stripe Checkout integration and verified webhook endpoint
- Admin dashboard with enquiry status controls
- Policy pages, robots.txt and sitemap

## Runbook
### Open a local preview
Option A (Docker, recommended)
1. Copy `.env.example` to `.env`.
2. Start services: `docker compose up --build`.
3. Open `http://localhost:3000` in your browser.

Option B (Node)
1. Copy `.env.example` to `.env`.
2. Install deps: `npm install`.
3. Run database migrations: `npx prisma migrate dev --name init`.
4. Seed inventory/admin user: `npm run prisma:seed`.
5. Start dev server: `npm run dev`.
6. Open `http://localhost:3000` in your browser.

### Local development
1. Copy `.env.example` to `.env` and adjust values.
2. Start PostgreSQL and app: `docker compose up --build`.
3. In a second shell run migrations and seed:
   - `npm install`
   - `npx prisma migrate dev --name init`
   - `npm run prisma:seed`
4. Open `http://localhost:3000`.

### Tests
- Unit + integration: `npm test`
- E2E: run app then `npm run test:e2e`

### Docker
- Build production image: `docker build -t film-rental-house .`
- Run image: `docker run --env-file .env -p 3000:3000 film-rental-house`

### Deployment
1. Provision PostgreSQL and set `DATABASE_URL`.
2. Set all env vars from `.env.example`.
3. Run `npx prisma migrate deploy` in release pipeline.
4. Deploy container to your platform (Fly, Render, ECS, Kubernetes, etc.).
5. Configure Stripe webhook endpoint `/api/payments/webhook` with secret.
