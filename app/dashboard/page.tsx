import { BlogCard, type BlogPost } from "@/components/blog-card"

const recentPosts: BlogPost[] = [
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
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your recent blog posts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
