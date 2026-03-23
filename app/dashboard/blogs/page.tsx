import { BlogCard, type BlogPost } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const allPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 16 and Supabase",
    excerpt: "Learn how to build a modern full-stack app using Next.js 16 with Supabase for authentication and database.",
    tag: "Tutorial",
    date: "Mar 18, 2026",
    readTime: "8 min read",
    status: "published",
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS v4: What's New",
    excerpt: "Explore the latest features in Tailwind CSS v4 including the new engine, CSS-first configuration, and more.",
    tag: "CSS",
    date: "Mar 15, 2026",
    readTime: "5 min read",
    status: "published",
  },
  {
    id: "3",
    title: "Building a Blog with shadcn/ui Components",
    excerpt: "A step-by-step guide to creating beautiful blog interfaces using the shadcn/ui component library.",
    tag: "Design",
    date: "Mar 12, 2026",
    readTime: "6 min read",
    status: "draft",
  },
  {
    id: "4",
    title: "Understanding React Server Components",
    excerpt: "Deep dive into how React Server Components work and when to use them in your applications.",
    tag: "React",
    date: "Mar 10, 2026",
    readTime: "10 min read",
    status: "published",
  },
  {
    id: "5",
    title: "PostgreSQL Row Level Security Explained",
    excerpt: "Secure your database at the row level using Supabase RLS policies for fine-grained access control.",
    tag: "Database",
    date: "Mar 8, 2026",
    readTime: "7 min read",
    status: "draft",
  },
  {
    id: "6",
    title: "Deploying to Vercel: The Complete Guide",
    excerpt: "Everything you need to know about deploying your Next.js application to Vercel with best practices.",
    tag: "DevOps",
    date: "Mar 5, 2026",
    readTime: "4 min read",
    status: "published",
  },
]

export default function BlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blogs</h2>
          <p className="text-muted-foreground">
            Manage and create your blog posts.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          New Post
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
