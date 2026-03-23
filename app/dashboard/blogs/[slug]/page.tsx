import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getBlogBySlug, deleteBlog } from "@/lib/actions/blog"

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) notFound()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/blogs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <h2 className="flex-1 text-2xl font-bold tracking-tight">
          {blog.title}
        </h2>
        <Link href={`/dashboard/blogs/${blog.slug}/edit`}>
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 size-3.5" />
            Edit
          </Button>
        </Link>
        <form
          action={async () => {
            "use server"
            await deleteBlog(blog.id)
          }}
        >
          <Button variant="destructive" size="sm" type="submit">
            <Trash2 className="mr-2 size-3.5" />
            Delete
          </Button>
        </form>
      </div>

      {blog.subtitle && (
        <p className="text-lg text-muted-foreground">{blog.subtitle}</p>
      )}

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>By {blog.author}</span>
        <span>
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <article
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
      />
    </div>
  )
}
