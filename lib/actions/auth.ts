"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (typeof email !== "string" || typeof password !== "string") {
    redirect("/auth/login?error=Please%20enter%20your%20email%20and%20password")
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`)
  }

  redirect("/dashboard")
}
