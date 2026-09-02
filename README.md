# Race Fuel

Nutrition planning for endurance athletes — running, cycling and triathlon.

## Week 1 — Generative Core Agent (current scope)

This week adds the "generative core": a live `/core` page where an athlete
describes their race and body in free text. An AI-powered extraction step
(Anthropic API) turns that into structured fields — sport, duration, weight,
carb target, sodium target — with a short rationale note. The result is
saved to Supabase and shown in a "Recent extractions" list.

**Out of scope this week:**
- The full hour-by-hour fueling timeline calculation
- Product selection
- Authentication
- Editing or deleting saved extractions

## Getting started

### Requirements

- [Node.js](https://nodejs.org) 18+
- A free [Supabase](https://supabase.com) project
- An [Anthropic API key](https://console.anthropic.com)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase
  Dashboard → Project Settings → API
- `ANTHROPIC_API_KEY` — console.anthropic.com (server-side only)

### 3. Set up the database

Run `supabase/migrations/0001_create_submissions.sql` (if not already run
from Week 0) and `supabase/migrations/0002_create_core_outputs.sql` in the
Supabase SQL editor.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Deploy

Deploys to [Vercel](https://vercel.com). Add all three environment
variables in the Vercel dashboard (Project Settings → Environment
Variables) — `ANTHROPIC_API_KEY` must NOT have the `NEXT_PUBLIC_` prefix.

## Tech stack

- [Next.js 14 (App Router)](https://nextjs.org) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) (Postgres)
- [Anthropic API](https://docs.claude.com) (core extraction)
- [Vercel](https://vercel.com) for deployment
