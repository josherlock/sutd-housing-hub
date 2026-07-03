# Contributing

## Setup

```bash
npm install
npm run dev
```

The app runs fully on mock data with no configuration. To work against a real
database, copy `.env.example` to `.env.local` with your own Supabase project's
credentials and run `supabase/migrations/0001_maintenance_tickets.sql` in its
SQL Editor.

## Architecture in one minute

Each feature is a vertical slice:

- `app/(app)/<feature>/` — the route (Server Component, fetches data)
- `components/<feature>/` — UI, client components take data as props
- `lib/data/mock-<feature>.ts` — mock data (being replaced feature by feature)
- `lib/supabase/queries/<feature>.ts` — server-side reads
- `lib/actions/<feature>.ts` — validated Server Functions for writes
- `supabase/migrations/` — schema, RLS policies, triggers

**Maintenance is the reference implementation** — read
`lib/supabase/queries/maintenance.ts`, `lib/actions/maintenance.ts` and the
migration before converting another feature. Keep the same return shapes as the
mock files so components stay untouched, and keep the mock fallback when env
vars are missing.

## Ground rules

- Read `AGENTS.md` first — this Next.js version has breaking changes; the
  bundled docs in `node_modules/next/dist/docs/` are the source of truth.
- `npm run lint` and `npm run build` must pass. The lint slate is clean; keep
  it that way.
- Design system: tokens only (no hardcoded colours), no rounded corners on
  cards/inputs, terracotta as the single accent. See `tailwind.config.ts`.
- Validate everything inside Server Functions — they are reachable by direct
  POST.
