import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";
import { getPortfolioItemBySlug } from "@/lib/api";

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to portfolio
          </Link>
        </div>

        {/* Project header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
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

          <h1 className="mb-4 text-4xl font-bold">{item.title}</h1>

          <p className="text-xl text-muted-foreground">
            {item.shortDescription}
          </p>
        </div>

        {/* Project details grid */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-medium">Role</h3>
            <p className="text-sm text-muted-foreground">{item.role}</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">Client</h3>
            <p className="text-sm text-muted-foreground">{item.clientName}</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">Year</h3>
            <p className="text-sm text-muted-foreground">{item.year}</p>
          </div>
        </div>

        {/* Tech stack */}
        {item.techTags && item.techTags.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-4 text-lg font-semibold">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {item.techTags.map(
                (tag, index) =>
                  tag.name && (
                    <span
                      key={index}
                      className="rounded-lg border bg-card px-3 py-1.5 text-sm"
                    >
                      {tag.name}
                    </span>
                  )
              )}
            </div>
          </div>
        )}

        {/* Project content placeholder */}
        <div className="space-y-8">
          {/* Cover image placeholder */}
          <div className="aspect-video rounded-lg bg-muted"></div>

          {/* Detailed description */}
          {item.detailedDescription && item.detailedDescription.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">About this project</h3>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {/* Simple text rendering - in a real app you'd render the Strapi blocks properly */}
                {item.detailedDescription.map((block, index) => (
                  <div key={index} className="mb-4 text-muted-foreground">
                    {/* This is a simplified rendering - you'd want proper block rendering */}
                    {JSON.stringify(block).includes("text") && (
                      <p>{JSON.stringify(block)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="mt-12 flex gap-4">
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Visit Live Site
            </a>
          )}

          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-muted"
            >
              View Code
            </a>
          )}
        </div>
      </main>
    </>
  );
}
