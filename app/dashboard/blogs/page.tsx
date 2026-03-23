import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog-card"
import { getBlogs } from "@/lib/actions/blog"

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blogs</h2>
          <p className="text-muted-foreground">
            Manage and create your blog posts.
          </p>
        </div>
        <Link href="/dashboard/blogs/new">
          <Button>
            <Plus className="mr-2 size-4" />
            New Post
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">No posts yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Create your first blog post to get started.
          </p>
          <Link href="/dashboard/blogs/new">
            <Button>
              <Plus className="mr-2 size-4" />
              New Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}
