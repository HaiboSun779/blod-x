"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import type { Blog } from "@/types"

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
  const suffix = Date.now().toString(36)
  return `${base}-${suffix}`
}

export async function getBlogs(): Promise<Blog[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getPublicBlogs(): Promise<Blog[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) return null
  return data
}

export async function createBlog(formData: FormData) {
  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) throw new Error("Not authenticated")

  const title = formData.get("title") as string
  const subtitle = (formData.get("subtitle") as string) || null
  const image = (formData.get("image") as string) || null
  const content = (formData.get("content") as string) || null

  const slug = generateSlug(title)

  const { error } = await supabase.from("blogs").insert({
    title,
    slug,
    subtitle,
    image,
    content,
    author_id: authData.user.id,
    author: authData.user.email ?? "Unknown",
  })

  if (error) throw error

  revalidatePath("/dashboard/blogs")
  revalidatePath("/dashboard")
  redirect(`/dashboard/blogs/${slug}`)
}

export async function updateBlog(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const subtitle = (formData.get("subtitle") as string) || null
  const image = (formData.get("image") as string) || null
  const content = (formData.get("content") as string) || null

  const { data, error } = await supabase
    .from("blogs")
    .update({
      title,
      subtitle,
      image,
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("slug")
    .single()

  if (error) throw error

  revalidatePath("/dashboard/blogs")
  revalidatePath("/dashboard")
  redirect(`/dashboard/blogs/${data.slug}`)
}

export async function deleteBlog(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("blogs").delete().eq("id", id)

  if (error) throw error

  revalidatePath("/dashboard/blogs")
  revalidatePath("/dashboard")
  redirect("/dashboard/blogs")
}
