-- ============================================================
-- Migration 002: Row-Level Security for the schools table
-- Allows self-service signup: any authenticated user can
-- insert a school; users can only SELECT schools they belong to.
-- ============================================================

alter table public.schools enable row level security;

-- Users can read schools they have a membership for
drop policy if exists "schools_select" on public.schools;
create policy "schools_select" on public.schools
  for select using (
    id in (
      select school_id from public.user_schools
      where user_id = auth.uid()
    )
  );

-- Any authenticated user can create a new school (self-service signup)
drop policy if exists "schools_insert" on public.schools;
create policy "schools_insert" on public.schools
  for insert with check (auth.uid() is not null);

-- Admin/editor members can update their school's record
drop policy if exists "schools_update" on public.schools;
create policy "schools_update" on public.schools
  for update using (
    id in (
      select school_id from public.user_schools
      where user_id = auth.uid()
        and role in ('admin', 'editor')
    )
  );
