import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlogForm } from "@/components/blog-form"
import { getBlogBySlug } from "@/lib/actions/blog"

interface EditBlogPageProps {
  params: Promise<{ slug: string }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) notFound()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/blogs/${blog.slug}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Edit Post</h2>
      </div>
      <BlogForm blog={blog} />
    </div>
  )
}
