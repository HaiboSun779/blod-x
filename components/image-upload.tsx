"use client"

import { useCallback, useRef, useState } from "react"
import { ImagePlus, Loader2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface ImageUploadProps {
  value?: string | null
  onChange: (url: string | null) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed")
        return
      }
      if (file.size > 5 * 1000 * 1000) {
        setError("File size must be under 5 MB")
        return
      }

      setUploading(true)
      setError(null)

      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error("Not authenticated")

        const ext = file.name.split(".").pop()
        const path = `${user.id}/${Date.now()}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(path, file, { upsert: true })

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("blog-images").getPublicUrl(path)

        onChange(publicUrl)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed")
      } finally {
        setUploading(false)
      }
    },
    [onChange]
  )

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) upload(file)
    if (fileRef.current) fileRef.current.value = ""
  }

  if (value) {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="relative overflow-hidden rounded-md border">
          <img
            src={value}
            alt="Cover"
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-8">
            <span className="truncate text-xs text-white/80">Cover Image</span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                onClick={() => fileRef.current?.click()}
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="h-7 text-xs"
                onClick={() => onChange(null)}
              >
                <X className="mr-1 size-3" />
                Remove
              </Button>
            </div>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDragOver(true)
        }}
        onDragEnter={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDragOver(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDragOver(false)
        }}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileRef.current?.click()
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed p-10 transition-colors ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        }`}
      >
        {uploading ? (
          <Loader2 className="size-10 animate-spin text-muted-foreground" />
        ) : (
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <ImagePlus className="size-6 text-muted-foreground" />
          </div>
        )}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <span className="font-medium text-primary">Click to upload</span>{" "}
                or drag and drop
              </>
            )}
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            PNG, JPG, GIF, WebP (max 5 MB)
          </p>
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
        disabled={uploading}
      />
    </div>
  )
}
