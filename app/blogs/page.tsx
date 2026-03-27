import { SiteHeader } from "@/components/header"
import { BlogCard } from "@/components/blog-card"
import { FeaturedBlogCard } from "@/components/featured-blog-card"
import { getPublicBlogs } from "@/lib/actions/blog"

export default async function PublicBlogsPage() {
  const blogs = await getPublicBlogs()
  const [featured, ...rest] = blogs

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1120px] px-4 py-12">
        {/* Page heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            The Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Insights, tutorials, and stories from the Blog-X community.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-lg text-muted-foreground">
              No posts published yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured post */}
            {featured && (
              <section>
                <FeaturedBlogCard blog={featured} />
              </section>
            )}

            {/* Rest of the posts */}
            {rest.length > 0 && (
              <section>
                <div className="mb-8 flex items-center gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Latest Posts
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} basePath="/blogs" />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-[1120px] px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Blog-X. All rights reserved.
        </div>
      </footer>
    </>
  )
}
