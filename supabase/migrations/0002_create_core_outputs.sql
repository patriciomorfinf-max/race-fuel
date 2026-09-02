-- Week 1: Generative Core Agent
-- No auth yet, so policies are permissive (public read/insert) — same
-- approach as Week 0's plan for adding auth in a later week.

create table if not exists core_outputs (
  id uuid primary key default gen_random_uuid(),
  raw_description text not null,
  sport text,
  duration_min integer,
  weight_kg numeric,
  carb_target_g_h numeric,
  sodium_target_mg_h numeric,
  context_note text,
  created_at timestamptz not null default now()
);

alter table core_outputs enable row level security;

create policy "Public can insert core_outputs"
  on core_outputs for insert
  to anon
  with check (true);

create policy "Public can read core_outputs"
  on core_outputs for select
  to anon
  using (true);
