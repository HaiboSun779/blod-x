"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { sanitizeImageUrl } from "@/lib/sanitize"

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data, error: authError } = await supabase.auth.getUser()
  if (authError || !data.user) redirect("/auth/login")
  const user = data.user

  const firstName = String(formData.get("first_name") ?? "").trim().slice(0, 50) || null
  const avatarInput = String(formData.get("avatar_url") ?? "").trim()
  const avatarUrl = sanitizeImageUrl(avatarInput)

  if (avatarInput && !avatarUrl) {
    redirect(`/dashboard/account?error=${encodeURIComponent("Avatar URL must start with http:// or https://")}`)
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    redirect(`/dashboard/account?error=${encodeURIComponent(error.message)}`)
  }

  // Posts store the author's display name, so keep existing posts in sync.
  const { error: blogsError } = await supabase
    .from("blogs")
    .update({ author: firstName ?? "Anonymous" })
    .eq("author_id", user.id)

  if (blogsError) {
    redirect(`/dashboard/account?error=${encodeURIComponent(blogsError.message)}`)
  }

  revalidatePath("/", "layout")
  redirect("/dashboard/account?saved=1")
}
