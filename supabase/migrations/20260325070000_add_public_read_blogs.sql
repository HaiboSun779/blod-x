create policy "Anyone can view published blogs"
  on public.blogs
  for select
  to anon
  using (true);
