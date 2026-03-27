import Link from "next/link"
import { Calendar } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Blog } from "@/types"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getExcerpt(content: string | null, maxLen = 120) {
  if (!content) return "No content yet."
  const text = content.replace(/<[^>]*>/g, "")
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text
}

interface BlogCardProps {
  blog: Blog
  basePath?: string
}

export function BlogCard({ blog, basePath = "/dashboard/blogs" }: BlogCardProps) {
  return (
    <Card className="group transition-all hover:shadow-md">
      {blog.image && (
        <Link href={`${basePath}/${blog.slug}`}>
          <div className="overflow-hidden rounded-t-lg">
            <img
              src={blog.image}
              alt={blog.title}
              className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      )}
      <CardHeader className={blog.image ? "pt-4" : ""}>
        <CardTitle className="line-clamp-2 text-lg">
          <Link href={`${basePath}/${blog.slug}`} className="hover:underline">
            {blog.title}
          </Link>
        </CardTitle>
        {blog.subtitle && (
          <CardDescription className="line-clamp-1">
            {blog.subtitle}
          </CardDescription>
        )}
        <CardDescription className="line-clamp-2">
          {getExcerpt(blog.content)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="size-3" />
            <span>{formatDate(blog.created_at)}</span>
          </div>
          <span>by {blog.author}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export { formatDate, getExcerpt }
