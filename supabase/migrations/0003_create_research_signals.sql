-- Week 2: Research + Benchmarking Dashboard
-- Unlike core_outputs (insert-only), this table also needs anon SELECT so
-- the page itself can read back the aggregate Yes/No tally live.
-- No personal data is stored (anonymous boolean + optional short note).

create table if not exists research_signals (
  id uuid primary key default gen_random_uuid(),
  struggled boolean not null,
  note text,
  created_at timestamptz not null default now()
);

alter table research_signals enable row level security;

create policy "Public can insert research_signals"
  on research_signals for insert
  to anon
  with check (true);

create policy "Public can read research_signals"
  on research_signals for select
  to anon
  using (true);
