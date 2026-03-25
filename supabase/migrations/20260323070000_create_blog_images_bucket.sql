insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true);

create policy "Anyone can view blog images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'blog-images');

create policy "Authenticated users can upload blog images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'blog-images');

create policy "Users can update own blog images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'blog-images' and (select auth.uid())::text = (storage.foldername(name))[1]);

create policy "Users can delete own blog images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'blog-images' and (select auth.uid())::text = (storage.foldername(name))[1]);
