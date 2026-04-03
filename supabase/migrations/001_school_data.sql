-- ============================================================
-- Migration 001: school_data + user_schools tables
-- Assumes: public.schools table already exists
-- ============================================================

-- 1. school_data: one JSON blob per school, storing all BSIS sections
create table if not exists public.school_data (
  id          uuid        default gen_random_uuid() primary key,
  school_id   uuid        not null references public.schools(id) on delete cascade,
  data        jsonb       not null default '{}',
  updated_at  timestamptz not null default now(),
  updated_by  uuid        references auth.users(id),
  unique(school_id)
);

-- Auto-update updated_at on every row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists school_data_updated_at on public.school_data;
create trigger school_data_updated_at
  before update on public.school_data
  for each row execute procedure public.set_updated_at();

-- 2. user_schools: maps auth users to schools with a role
create table if not exists public.user_schools (
  user_id    uuid not null references auth.users(id) on delete cascade,
  school_id  uuid not null references public.schools(id) on delete cascade,
  role       text not null default 'editor'
             check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  primary key (user_id, school_id)
);

-- ============================================================
-- Row-Level Security
-- ============================================================

alter table public.school_data  enable row level security;
alter table public.user_schools enable row level security;

-- school_data: users can only see data for schools they belong to
drop policy if exists "school_data_select" on public.school_data;
create policy "school_data_select" on public.school_data
  for select using (
    school_id in (
      select school_id from public.user_schools
      where user_id = auth.uid()
    )
  );

-- school_data: admin/editor can insert
drop policy if exists "school_data_insert" on public.school_data;
create policy "school_data_insert" on public.school_data
  for insert with check (
    school_id in (
      select school_id from public.user_schools
      where user_id = auth.uid()
        and role in ('admin', 'editor')
    )
  );

-- school_data: admin/editor can update
drop policy if exists "school_data_update" on public.school_data;
create policy "school_data_update" on public.school_data
  for update using (
    school_id in (
      select school_id from public.user_schools
      where user_id = auth.uid()
        and role in ('admin', 'editor')
    )
  );

-- user_schools: users can see their own memberships
drop policy if exists "user_schools_select" on public.user_schools;
create policy "user_schools_select" on public.user_schools
  for select using (user_id = auth.uid());

-- ============================================================
-- Helpful indexes
-- ============================================================

create index if not exists idx_school_data_school_id  on public.school_data(school_id);
create index if not exists idx_user_schools_user_id   on public.user_schools(user_id);
create index if not exists idx_user_schools_school_id on public.user_schools(school_id);
