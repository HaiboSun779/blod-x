import Link from "next/link"

import { BlogCard } from "@/components/blog-card"
import { getBlogs } from "@/lib/actions/blog"

export default async function DashboardPage() {
  const blogs = await getBlogs()
  const recent = blogs.slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your recent blog posts.
        </p>
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No posts yet.{" "}
          <Link href="/dashboard/blogs/new" className="text-primary underline">
            Create your first post
          </Link>
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}
