create table public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  subtitle text,
  image text,
  content text,
  author_id uuid not null references auth.users(id) on delete cascade,
  author text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index blogs_slug_idx on public.blogs (slug);
create index blogs_author_id_idx on public.blogs (author_id);

alter table public.blogs enable row level security;

create policy "Users can view own blogs"
  on public.blogs
  for select
  to authenticated
  using ((select auth.uid()) = author_id);

create policy "Users can insert own blogs"
  on public.blogs
  for insert
  to authenticated
  with check ((select auth.uid()) = author_id);

create policy "Users can update own blogs"
  on public.blogs
  for update
  to authenticated
  using ((select auth.uid()) = author_id)
  with check ((select auth.uid()) = author_id);

create policy "Users can delete own blogs"
  on public.blogs
  for delete
  to authenticated
  using ((select auth.uid()) = author_id);
