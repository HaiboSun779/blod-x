import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { updateProfile } from "@/lib/actions/profile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/logout-button"

interface AccountPageProps {
  searchParams: Promise<{ saved?: string; error?: string }>
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { saved, error: formError } = await searchParams
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims) {
    redirect("/auth/login")
  }

  const email = data.claims.email as string

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, avatar_url")
    .eq("id", data.claims.sub)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account</h2>
        <p className="text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Your first name is shown as the author on your posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateProfile} className="space-y-4">
            {saved && (
              <p className="rounded-md bg-muted p-3 text-sm">Profile saved.</p>
            )}
            {formError && (
              <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {formError}
              </p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={email} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                name="first_name"
                maxLength={50}
                defaultValue={profile?.first_name ?? ""}
                placeholder="Enter your first name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avatar-url">Avatar URL</Label>
              <Input
                id="avatar-url"
                name="avatar_url"
                type="url"
                defaultValue={profile?.avatar_url ?? ""}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>
            Manage your current session.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  )
}
