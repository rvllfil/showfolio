import Link from "next/link";
import { Navbar } from "@/app/components/navbar";
import { getPortfolioItems } from "@/lib/api";
import type { Portfolio } from "@/lib/types";

export default async function PortfolioPage() {
  const portfolioResponse = await getPortfolioItems();
  const portfolioItems = (portfolioResponse?.data ?? []) as Portfolio[];

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="mt-2 text-muted-foreground">
            A collection of web development projects and client work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group block overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
            >
              {/* Placeholder for cover image */}
              <div className="aspect-video bg-muted"></div>

              <div className="p-4">
                {/* Work type + Year + Featured badge */}
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-sm bg-muted px-2 py-0.5 capitalize">
                    {item.workType?.toLowerCase() || "project"}
                  </span>
                  <span>•</span>
                  <span>{item.year}</span>
                  {item.isFeatured && (
                    <>
                      <span>•</span>
                      <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-primary">
                        Featured
                      </span>
                    </>
                  )}
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

        {portfolioItems.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No portfolio items found.
          </div>
        )}
      </main>
    </>
  );
}
