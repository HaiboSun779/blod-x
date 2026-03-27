import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"

import { SiteHeader } from "@/components/header"
import { Button } from "@/components/ui/button"
import { getBlogBySlug } from "@/lib/actions/blog"

interface PublicBlogPageProps {
  params: Promise<{ slug: string }>
}

export default async function PublicBlogPage({ params }: PublicBlogPageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) notFound()

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[720px] px-4 py-12">
        {/* Back link */}
        <Link href="/blogs">
          <Button variant="ghost" size="sm" className="mb-8 -ml-2 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back to all posts
          </Button>
        </Link>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <time>
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <span className="text-muted-foreground/40">|</span>
            <span>{blog.author}</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {blog.title}
          </h1>

          {blog.subtitle && (
            <p className="text-xl text-muted-foreground">{blog.subtitle}</p>
          )}
        </header>

        {/* Cover image */}
        {blog.image && (
          <div className="mt-8 overflow-hidden rounded-xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        {/* Article body */}
        <article
          className="prose prose-lg dark:prose-invert mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
        />

        {/* Footer divider */}
        <div className="mt-16 border-t pt-8">
          <Link href="/blogs">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to all posts
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto max-w-[720px] px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Blog-X. All rights reserved.
        </div>
      </footer>
    </>
  )
}
