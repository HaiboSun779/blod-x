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

async function requireUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) throw new Error("Not authenticated")
  return { supabase, user: data.user }
}

function readBlogFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim()
  if (!title) throw new Error("Title is required")

  const optional = (key: string) => {
    const value = String(formData.get(key) ?? "").trim()
    return value || null
  }

  return {
    title,
    subtitle: optional("subtitle"),
    image: optional("image"),
    content: optional("content"),
  }
}

// Dashboard: only the signed-in author's posts.
export async function getBlogs(): Promise<Blog[]> {
  const { supabase, user } = await requireUser()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data ?? []
}

// Dashboard: a post by slug, only if the signed-in user wrote it.
export async function getMyBlogBySlug(slug: string): Promise<Blog | null> {
  const { supabase, user } = await requireUser()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("author_id", user.id)
    .single()

  if (error) return null
  return data
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
  const { supabase, user } = await requireUser()
  const fields = readBlogFields(formData)
  const slug = generateSlug(fields.title)

  // Show a display name on public posts instead of the author's email.
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name")
    .eq("id", user.id)
    .single()
  const author = profile?.first_name?.trim() || "Anonymous"

  const { error } = await supabase.from("blogs").insert({
    ...fields,
    slug,
    author_id: user.id,
    author,
  })

  if (error) throw error

  revalidatePath("/dashboard/blogs")
  revalidatePath("/dashboard")
  redirect(`/dashboard/blogs/${slug}`)
}

export async function updateBlog(id: string, formData: FormData) {
  const { supabase, user } = await requireUser()
  const fields = readBlogFields(formData)

  const { data, error } = await supabase
    .from("blogs")
    .update({
      ...fields,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("author_id", user.id)
    .select("slug")
    .single()

  if (error) throw error

  revalidatePath("/dashboard/blogs")
  revalidatePath("/dashboard")
  redirect(`/dashboard/blogs/${data.slug}`)
}

export async function deleteBlog(id: string) {
  const { supabase, user } = await requireUser()

  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id)
    .eq("author_id", user.id)

  if (error) throw error

  revalidatePath("/dashboard/blogs")
  revalidatePath("/dashboard")
  redirect("/dashboard/blogs")
}
