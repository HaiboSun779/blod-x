-- 1. Public read access for everyone.
-- Before: anon could read all blogs, but authenticated users could only read
-- their own, so logged-in users saw only their own posts on /blogs.
drop policy if exists "Users can view own blogs" on public.blogs;
drop policy if exists "Anyone can view published blogs" on public.blogs;

create policy "Anyone can view blogs"
  on public.blogs
  for select
  to anon, authenticated
  using (true);

-- 2. Restrict image uploads to the uploader's own folder ({user_id}/...),
-- matching the existing update and delete policies.
drop policy if exists "Authenticated users can upload blog images" on storage.objects;

create policy "Users can upload blog images to own folder"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'blog-images'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

-- 3. Stop exposing author emails on public posts.
-- Replace stored emails with the author's display name.
update public.blogs as b
set author = coalesce(nullif(trim(p.first_name), ''), 'Anonymous')
from public.profiles as p
where p.id = b.author_id;
