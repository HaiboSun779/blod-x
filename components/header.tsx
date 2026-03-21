import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-[960px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
          <span className="text-lg font-semibold">Blog-X</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#blog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Log in
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm" className="h-9 rounded-full px-4">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
