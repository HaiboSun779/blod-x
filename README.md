# Blog-X

A full-stack blogging platform built with Next.js, TypeScript, and Supabase. Authors sign up, write posts in a rich-text editor, upload cover images, and manage their posts from a dashboard. Anyone can read published posts.

**Live demo:** _add your Vercel URL here_

<!-- Add a screenshot: ![Blog-X screenshot](docs/screenshot.png) -->

## Features

- **Authentication:** email sign-up, login, logout, password reset, and email confirmation (Supabase Auth)
- **Rich-text editor:** write and format posts with Tiptap
- **Image uploads:** drag-and-drop cover images stored in Supabase Storage
- **Author dashboard:** create, edit, and delete your own posts
- **Public blog:** browse all posts and read them by URL slug, no login required
- **Route protection:** Next.js middleware redirects signed-out users away from private pages

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui |
| Backend | Next.js Server Actions, Supabase (PostgreSQL, Auth, Storage) |
| Editor | Tiptap |
| Deployment | Vercel |

## Architecture

```
Browser
  │
  ▼
Next.js (Vercel)
  ├── middleware.ts / proxy.ts   refreshes the session, guards private routes
  ├── app/                       pages (public blog, auth, dashboard)
  └── lib/actions/blog.ts        Server Actions for blog CRUD
  │
  ▼
Supabase
  ├── Auth                       users and sessions
  ├── PostgreSQL                 profiles and blogs tables, protected by RLS
  └── Storage                    blog-images bucket, one folder per user
```

## Database design

Schema changes live in versioned SQL migrations under `supabase/migrations/`.

- **profiles:** one row per user, created automatically by a trigger on `auth.users` when someone signs up
- **blogs:** posts with a unique slug, linked to their author by a foreign key with cascade delete; indexed on `slug` and `author_id`

Access control is enforced in the database with **Row Level Security**, not only in application code:

- Anyone can read posts
- Only the author can create, update, or delete their own posts
- Users can only read and edit their own profile
- Users can only upload, replace, or delete images inside their own storage folder (`{user_id}/...`)

## Getting started

### Prerequisites

- Node.js 20+
- A Supabase project (or the Supabase CLI for local development)

### Setup

```bash
git clone https://github.com/HaiboSun779/blog-x.git
cd blog-x
npm install
```

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Apply the database migrations:

```bash
npx supabase link --project-ref your-project-ref
npx supabase db push
```

Start the dev server:

```bash
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/                  routes: public blog, auth pages, dashboard
components/           UI components (editor, forms, cards, sidebar)
hooks/                client hooks (image upload, mobile detection)
lib/actions/          Server Actions for auth and blog CRUD
lib/supabase/         Supabase clients for server, browser, and middleware
supabase/migrations/  SQL schema, triggers, and RLS policies
types/                shared TypeScript types, including generated DB types
```
