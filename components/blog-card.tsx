import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  tag: string
  date: string
  readTime: string
  status: "published" | "draft"
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant={post.status === "published" ? "default" : "secondary"}>
            {post.status === "published" ? "Published" : "Draft"}
          </Badge>
          <span className="text-xs text-muted-foreground">{post.tag}</span>
        </div>
        <CardTitle className="line-clamp-2">
          <Link href={`/dashboard/blogs/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="size-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
