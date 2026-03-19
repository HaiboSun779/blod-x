create policy "Users can delete own profile"
  on public.profiles
  for delete
  to authenticated
  using ((select auth.uid()) = id);
