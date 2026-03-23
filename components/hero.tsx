import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Feather } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-foreground/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-8">
          <Feather className="w-4 h-4 text-foreground" />
          <span className="text-sm font-medium text-foreground">The modern blogging platform</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 text-balance">
          Amplify your voice with powerful blog posts.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-pretty">
          Create, publish, and grow your audience with our intuitive blogging platform. 
          From first draft to viral post, we have everything you need to succeed.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/auth/sign-up">
            <Button size="lg" className="h-14 px-8 text-base font-semibold group">
              Start Writing
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base font-semibold"
          >
            View Examples
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-8 border-t border-border">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">50K+</div>
            <div className="text-sm text-muted-foreground mt-1">Active Writers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">2M+</div>
            <div className="text-sm text-muted-foreground mt-1">Posts Published</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">99%</div>
            <div className="text-sm text-muted-foreground mt-1">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
