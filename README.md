# Race Fuel

Nutrition planning for endurance athletes — running, cycling and triathlon.
Race Fuel turns your weight, race duration and nutrition targets into a
precise, hour-by-hour fueling plan.

## Week 0 — Setup Sprint (current scope)

This week only ships the base infrastructure:

- Homepage with hero section
- Navbar (Home, Docs)
- Footer
- `/docs` placeholder page
- Supabase client connection (evidence only — no database schema yet)

The fueling calculator, product catalog, auth and saved plans are **out of
scope this week** and will be built in a future release.

## Getting started

### Requirements

- [Node.js](https://nodejs.org) 18 or later
- npm (comes with Node.js)
- A free [Supabase](https://supabase.com) project

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase project values
(found in Supabase Dashboard → Project Settings → API):

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Deploy

This project deploys to [Vercel](https://vercel.com). Connect the GitHub
repo to a new Vercel project and add the same environment variables from
`.env.example` in the Vercel dashboard (Project Settings → Environment
Variables).

## Tech stack

- [Next.js 14 (App Router)](https://nextjs.org) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) (Auth + Postgres — connection only this week)
- [Vercel](https://vercel.com) for deployment
