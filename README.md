# Race Fuel

Nutrition planning for endurance athletes — running, cycling and triathlon.

## Week 2 — Research + Benchmarking Dashboard (current scope)

This week adds `/research`: a live Yes/No poll asking visitors whether
they've struggled to know what/how much to fuel during a race (saved to
Supabase, with a live tally), plus a hand-researched, cited table of 8
real competitors/substitutes (global + Mexico/LatAm) compared against
Race Fuel on instant/free/no-signup/uses-your-products, and a gap-analysis
summary.

**Out of scope this week:** automated competitor scraping, a quantitative
TAM/SAM/SOM market model, and user accounts to prevent duplicate votes
(this is a directional signal, not a scientific survey).

## Getting started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` from
Supabase Dashboard → Project Settings → API.

### 3. Set up the database
Run, in order, in the Supabase SQL editor:
- `supabase/migrations/0001_create_submissions.sql`
- `supabase/migrations/0002_create_core_outputs.sql`
- `supabase/migrations/0003_create_research_signals.sql`

### 4. Run locally
```bash
npm run dev
```

### 5. Deploy
Deploys to Vercel. Add the two Supabase environment variables in the
Vercel dashboard (Project Settings → Environment Variables).

## Tech stack
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (Postgres) + Vercel.
