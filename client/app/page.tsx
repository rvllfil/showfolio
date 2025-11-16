import Link from "next/link";
import { getProfile, getFeaturedPortfolio } from "@/lib/api";
import { SiteHeader } from "@/app/components/site-header";
import type { Portfolio } from "@/lib/types";

export default async function HomePage() {
  const [profile, featuredPortfolio] = await Promise.all([
    getProfile("id"),
    getFeaturedPortfolio(),
  ]);

  const profileData = profile?.data;
  const featuredItems = (featuredPortfolio?.data ?? []) as Portfolio[];

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Portfolio
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            {profileData?.brandName || "rvllfil"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {profileData?.tagline ||
              "Building fast, focused, and reliable web experiences."}
          </p>
        </section>

        {/* Intro + Studio Numbers + Contact */}
        <section className="mb-20 grid gap-12 md:grid-cols-2">
          {/* Left Column - Intro */}
          <div>
            <p className="text-muted-foreground leading-relaxed">
              {profileData?.shortInfo ||
                "Building clean, modern websites using Next.js, Strapi, Laravel, and Shopify. Focused on creating fast, professional, and maintainable web experiences."}
            </p>
          </div>

          {/* Right Column - Studio Numbers + Contact */}
          <div className="space-y-8">
            {/* Studio Numbers */}
            {profileData?.portfolioNumber &&
              profileData.portfolioNumber.length > 0 && (
                <div>
                  <h3 className="mb-4 text-sm font-medium">Studio Numbers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {profileData.portfolioNumber.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-lg border bg-card p-4"
                      >
                        <div className="text-2xl font-bold">{item.value}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Contact */}
            {profileData?.socialLinks && profileData.socialLinks.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-medium">Contact</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:bg-muted"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Portfolio Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Selected work</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group block overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
              >
                {/* Placeholder for cover image */}
                <div className="aspect-video bg-muted"></div>

                <div className="p-4">
                  {/* Work type + Year */}
                  <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-sm bg-muted px-2 py-0.5 capitalize">
                      {item.workType?.toLowerCase() || "project"}
                    </span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-semibold group-hover:text-foreground">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                    {item.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  {item.techTags && item.techTags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.techTags.slice(0, 3).map(
                        (tag, tagIndex) =>
                          tag.name && (
                            <span
                              key={tagIndex}
                              className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              {tag.name}
                            </span>
                          )
                      )}
                      {item.techTags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{item.techTags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {featuredItems.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No featured portfolio items found.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
