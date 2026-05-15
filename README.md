# Poolymarket 🇬🇪

Georgia's first prediction market platform — play-money trading on politics, sports, economy, and culture.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + Framer Motion
- **Supabase** (PostgreSQL, Auth, Realtime)
- **Zustand** + React Query
- **Recharts** for price history

## Quick Start

```bash
cd poolymarket
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs in **demo mode** with mock data when Supabase env vars are not set.

Click **Start Trading** to get a demo account with 8,750 ₾P.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor
3. Run `supabase/seed.sql` for launch markets
4. Add credentials to `.env.local`
5. Enable Realtime on `trades` and `markets` tables

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/markets` | Market discovery feed |
| `/markets/[id]` | Market detail + trading |
| `/portfolio` | Positions + PnL |
| `/leaderboard` | Rankings |
| `/suggest` | Suggest a market |
| `/profile/[username]` | Public profile |
| `/admin/markets` | Create markets |
| `/admin/resolve` | Resolve markets |
| `/admin/users` | User management |

## API

- `POST /api/orders` — Place order (CLOB matching)
- `GET/POST /api/markets` — List/create markets
- `POST /api/resolve` — Resolve market (requires `x-admin-key` header)
- `POST /api/webhooks` — External oracle webhooks

## Design

- Dark-first UI: `#0B0E1A` base, `#00D4AA` teal accent
- Fonts: Sora (headings) + Inter (body)
- Play-money only — LARI Points (₾P), no real money

Built for [Poolymarket.ge](https://poolymarket.ge) · Partnership with [Astroman.ge](https://astroman.ge)
