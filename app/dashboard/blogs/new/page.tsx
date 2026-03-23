import { BlogForm } from "@/components/blog-form"

export default function NewBlogPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New Post</h2>
        <p className="text-muted-foreground">
          Write and publish a new blog post.
        </p>
      </div>
      <BlogForm />
    </div>
  )
}
