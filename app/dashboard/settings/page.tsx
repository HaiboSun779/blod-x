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

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your blog settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Information</CardTitle>
          <CardDescription>
            Update your blog name and description.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="blog-name">Blog Name</Label>
            <Input id="blog-name" defaultValue="Blog-X" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="blog-description">Description</Label>
            <Input id="blog-description" defaultValue="The modern blogging platform" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete Blog</Button>
        </CardContent>
      </Card>
    </div>
  )
}
