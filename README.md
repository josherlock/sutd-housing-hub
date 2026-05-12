# SUTD Housing Hub

A student-led proof of concept to replace the legacy StarRez housing portal.

Next.js 16 (App Router) on Tailwind v3, with the warm terracotta design system inherited from the Vitality Hub project. All data is mock-only at this stage; Supabase wiring lives behind `lib/supabase` for the next phase.

## Run

```bash
npm run dev
```

Open http://localhost:3000. The root redirects to `/dashboard`.

## Routes

- `/login` marketing-style sign in with magic link UX
- `/dashboard` alert banner, metrics, quick actions, three-up and two-up summary cards
- `/payments` invoice table, pay modal with PayNow QR and card placeholder, payment history
- `/maintenance` ticket list, status timeline, scheduled service treatment
- `/maintenance/new` category grid, photo upload placeholder
- `/facilities` and `/facilities/[slug]` calendar grid, side panel booking flow, QR confirmation
- `/events` and `/events/new` featured event header, RSVP, create flow
- `/community` channel sidebar, post composer, feed with reactions
- `/profile` editable about, housing details, notification preferences

## Design system

Mirrors the Vitality Hub palette and type system, no rounded corners on cards or inputs, terracotta as the only accent, Cormorant Garamond for display and Plus Jakarta Sans for UI.

## Mock data

Files in `lib/data/` drive every screen. Replace with Supabase queries when ready, keeping the same return shapes so components stay untouched.
