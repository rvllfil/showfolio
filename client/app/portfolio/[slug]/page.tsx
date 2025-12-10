import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Building2,
} from "lucide-react";
import { Navbar } from "@/app/components/navbar";
import { getPortfolioItemBySlug, getProfile } from "@/lib/api";
import { renderBlocks } from "@/lib/strapi-helpers";

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  let item = null;
  try {
    item = await getPortfolioItemBySlug(slug);
  } catch (error) {
    console.warn("Failed to fetch portfolio item for metadata", error);
  }

  if (!item) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: item.title,
    description: item.shortDescription || `View details about ${item.title}`,
    openGraph: {
      title: item.title,
      description: item.shortDescription || `View details about ${item.title}`,
      type: "article",
      images: item.thumbnail?.url
        ? [`${process.env.NEXT_PUBLIC_API_URL}${item.thumbnail.url}`]
        : [],
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  let item, profileResponse;
  try {
    [item, profileResponse] = await Promise.all([
      getPortfolioItemBySlug(slug),
      getProfile(),
    ]);
  } catch (error) {
    console.warn("Failed to fetch portfolio item data", error);
  }

  if (!item) {
    notFound();
  }

  const profileData = profileResponse?.data ?? null;

  return (
    <>
      <Navbar profileData={profileData} />

      <main className="min-h-screen">
        {/* Hero Section with Image */}
        <div className="relative h-[60vh] min-h-[400px] bg-muted overflow-hidden">
          {item.thumbnail?.url ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${item.thumbnail.url}`}
              alt={item.thumbnail.alternativeText || item.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-primary/30 to-blue-500/30">
              <ExternalLink className="w-24 h-24 text-primary/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-12">
            <div className="max-w-5xl mx-auto">
              {/* Back link */}
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 mb-6 text-sm text-white/90 hover:text-white group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
              </Link>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {item.portfolioType && (
                  <span className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide">
                    {item.portfolioType}
                  </span>
                )}
                {item.isFeatured && (
                  <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wide border border-white/30">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl drop-shadow-lg">
                {item.title}
              </h1>

              {/* Short description */}
              <p className="max-w-3xl text-lg md:text-xl text-white/90 drop-shadow">
                {item.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl px-4 py-16 mx-auto">
          {/* Quick Info Cards */}
          <div className="grid gap-6 mb-16 md:grid-cols-3">
            {item.role && (
              <div className="p-6 border rounded-2xl bg-card border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Role
                  </h3>
                </div>
                <p className="text-lg font-medium text-foreground">
                  {item.role}
                </p>
              </div>
            )}

            {item.clientName && (
              <div className="p-6 border rounded-2xl bg-card border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Client
                  </h3>
                </div>
                <p className="text-lg font-medium text-foreground">
                  {item.clientName}
                </p>
              </div>
            )}

            {item.year && (
              <div className="p-6 border rounded-2xl bg-card border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Year
                  </h3>
                </div>
                <p className="text-lg font-medium text-foreground">
                  {item.year}
                </p>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          {(item.liveUrl || item.githubUrl) && (
            <div className="flex flex-wrap gap-4 mb-16">
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all shadow-lg rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Live Site
                </a>
              )}

              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all border-2 rounded-xl bg-card border-border hover:bg-muted hover:scale-105"
                >
                  <Github className="w-4 h-4" />
                  View Source Code
                </a>
              )}
            </div>
          )}

          {/* Tech Stack */}
          {item.techTags && item.techTags.length > 0 && (
            <div className="mb-16">
              <h2 className="mb-6 text-2xl font-bold md:text-3xl text-foreground">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {item.techTags.map(
                  (tag, index) =>
                    tag.name && (
                      <span
                        key={index}
                        className="px-4 py-2 font-medium transition-colors border rounded-xl bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      >
                        {tag.name}
                      </span>
                    )
                )}
              </div>
            </div>
          )}

          {/* Detailed Description */}
          {item.detailedDescription && item.detailedDescription.length > 0 && (
            <div className="mb-16">
              <h2 className="mb-6 text-2xl font-bold md:text-3xl text-foreground">
                About This Project
              </h2>
              <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                <div className="leading-relaxed text-muted-foreground">
                  {renderBlocks(item.detailedDescription)}
                </div>
              </div>
            </div>
          )}

          {/* Additional Images Section (if available) */}
          {item.portfolioImages && item.portfolioImages.length > 0 && (
            <div className="mb-16">
              <h2 className="mb-6 text-2xl font-bold md:text-3xl text-foreground">
                Project Showcase
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
                {item.portfolioImages.map((image, idx) => {
                  // Determine if image is portrait or landscape
                  const isPortrait =
                    image.height && image.width && image.height > image.width;
                  const isSquare =
                    image.height &&
                    image.width &&
                    Math.abs(image.height - image.width) < image.width * 0.1;

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl overflow-hidden border border-border shadow-xl ${
                        isPortrait
                          ? "md:row-span-2" // Portrait images span 2 rows
                          : isSquare
                          ? "" // Square images take 1 cell
                          : "md:col-span-2 lg:col-span-2" // Landscape images span 2 columns
                      }`}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                        alt={
                          image.alternativeText ||
                          `${item.title} showcase ${idx + 1}`
                        }
                        width={image.width || 1200}
                        height={image.height || 800}
                        className="object-contain w-full h-auto"
                        unoptimized
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back to Portfolio Link */}
          <div className="pt-12 border-t border-border">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to all projects
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
