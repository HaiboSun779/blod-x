import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Blog } from "@/types"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function getExcerpt(content: string | null, maxLen = 200) {
  if (!content) return "No content yet."
  const text = content.replace(/<[^>]*>/g, "")
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text
}

export function FeaturedBlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
        <div className="grid gap-0 md:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden bg-muted">
            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.title}
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 md:aspect-auto md:min-h-[360px]"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center md:aspect-auto md:min-h-[360px]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="size-20 text-muted-foreground/30"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </div>
            )}
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <span className="text-muted-foreground/40">|</span>
              <span>{blog.author}</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
              {blog.title}
            </h2>

            {blog.subtitle && (
              <p className="text-lg text-muted-foreground">{blog.subtitle}</p>
            )}

            <p className="leading-relaxed text-muted-foreground">
              {getExcerpt(blog.content)}
            </p>

            <div className="pt-2">
              <Button variant="outline" className="group/btn gap-2">
                Read article
                <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
