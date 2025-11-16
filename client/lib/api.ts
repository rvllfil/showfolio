import type {
  StrapiResponse,
  StrapiCollectionResponse,
  Profile,
  Portfolio,
  Skill,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Opsional: cek kalau API_URL belum di-set
if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined. Please set it in client/.env.local"
  );
}

/**
 * Helper umum untuk call API Strapi
 * @param path - path api, misalnya "/api/profile" atau "/api/portfolio-items"
 * @param options - opsi fetch tambahan
 */
export async function fetchAPI(
  path: string,
  options: RequestInit & { next?: Record<string, unknown> } = {}
) {
  const url = `${API_URL}${path}`;

  const res = await fetch(url, {
    // opsi default
    ...options,
    // ISR / caching di Next.js App Router
    next: {
      revalidate: 60, // dalam detik, misal regenerate tiap 60 detik
      ...(options.next ?? {}),
    },
  });

  if (!res.ok) {
    console.error(`❌ Fetch failed: ${res.status} ${res.statusText} – ${url}`);
    throw new Error(`Failed to fetch ${url}`);
  }

  return res.json();
}

// Ambil Profile (single type)
export async function getProfile(
  locale: string = "id"
): Promise<StrapiResponse<Profile>> {
  const query = new URLSearchParams({
    locale,
    "populate[socialLinks]": "*",
    "populate[portfolioNumber]": "*",
  });

  return fetchAPI(`/api/profile?${query.toString()}`);
}

// Ambil semua PortfolioItem
export async function getPortfolioItems(): Promise<
  StrapiCollectionResponse<Portfolio>
> {
  return fetchAPI("/api/portfolios?populate[techTags]=*&sort=year:desc");
}

// Ambil featured portfolio items
export async function getFeaturedPortfolio(): Promise<
  StrapiCollectionResponse<Portfolio>
> {
  const query = new URLSearchParams({
    "filters[isFeatured][$eq]": "true",
    "populate[techTags]": "*",
    sort: "year:desc",
  });

  return fetchAPI(`/api/portfolios?${query.toString()}`);
}

// Ambil portfolio item berdasarkan slug
export async function getPortfolioItemBySlug(
  slug: string
): Promise<Portfolio | null> {
  const query = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate[techTags]": "*",
  });

  const response = await fetchAPI(`/api/portfolios?${query.toString()}`);
  return response.data?.[0] || null;
}

// Ambil semua Skills
export async function getSkills(): Promise<StrapiCollectionResponse<Skill>> {
  const query = new URLSearchParams({
    sort: "order:asc",
  });

  return fetchAPI(`/api/skills?${query.toString()}`);
}
