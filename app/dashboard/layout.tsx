import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { DashboardShellLoader } from "@/components/dashboard-shell-loader"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims) {
    redirect("/auth/login")
  }

  return <DashboardShellLoader>{children}</DashboardShellLoader>
}
