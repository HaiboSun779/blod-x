"use client"

import { useRef, useState, useTransition } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TiptapEditor } from "@/components/tiptap-editor"
import { ImageUpload } from "@/components/image-upload"
import { createBlog, updateBlog } from "@/lib/actions/blog"
import type { Blog } from "@/types"

interface BlogFormProps {
  blog?: Blog
}

export function BlogForm({ blog }: BlogFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [content, setContent] = useState(blog?.content ?? "")
  const [imageUrl, setImageUrl] = useState<string | null>(blog?.image ?? null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set("content", content)
    formData.set("image", imageUrl ?? "")

    startTransition(async () => {
      try {
        if (blog) {
          await updateBlog(blog.id, formData)
        } else {
          await createBlog(formData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          required
          defaultValue={blog?.title ?? ""}
          placeholder="Enter blog title"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          name="subtitle"
          defaultValue={blog?.subtitle ?? ""}
          placeholder="Optional subtitle"
        />
      </div>

      <div className="grid gap-2">
        <Label>Cover Image</Label>
        <ImageUpload value={imageUrl} onChange={setImageUrl} />
      </div>

      <div className="grid gap-2">
        <Label>Content</Label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          {blog ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  )
}
