"use client"

import dynamic from "next/dynamic"

const DashboardShell = dynamic(
  () => import("@/components/dashboard-shell").then((m) => m.DashboardShell),
  { ssr: false }
)

export function DashboardShellLoader({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
