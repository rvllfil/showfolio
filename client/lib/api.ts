import type {
  StrapiResponse,
  StrapiCollectionResponse,
  Profile,
  Portfolio,
  Skill,
  Testimonial,
  Service,
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
  locale?: string
): Promise<StrapiResponse<Profile>> {
  const query = new URLSearchParams({
    populate: "*",
  });

  // Only add locale if provided
  if (locale) {
    query.set("locale", locale);
  }

  return fetchAPI(`/api/profile?${query.toString()}`);
}

// Ambil semua PortfolioItem
export async function getPortfolioItems(): Promise<
  StrapiCollectionResponse<Portfolio>
> {
  return fetchAPI("/api/portfolios?populate=*&sort=year:desc");
}

// Ambil featured portfolio items
export async function getFeaturedPortfolio(): Promise<
  StrapiCollectionResponse<Portfolio>
> {
  return fetchAPI(
    "/api/portfolios?filters[isFeatured][$eq]=true&populate=*&sort=year:desc"
  );
}

// Ambil portfolio item berdasarkan slug
export async function getPortfolioItemBySlug(
  slug: string
): Promise<Portfolio | null> {
  const response = await fetchAPI(
    `/api/portfolios?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data?.[0] || null;
}

// Ambil semua Skills
export async function getSkills(): Promise<StrapiCollectionResponse<Skill>> {
  const query = new URLSearchParams({
    sort: "name:asc",
  });

  return fetchAPI(`/api/skills?${query.toString()}`);
}

// Ambil semua Testimonials (if collection exists in Strapi)
export async function getTestimonials(): Promise<
  StrapiCollectionResponse<Testimonial>
> {
  try {
    const query = new URLSearchParams({
      sort: "order:asc",
      populate: "*",
    });

    return await fetchAPI(`/api/testimonials?${query.toString()}`);
  } catch (error) {
    // Return empty array if testimonials collection doesn't exist yet
    console.warn("Testimonials collection not found, using fallback data");
    return { data: [], meta: {} };
  }
}

// Ambil semua Services (if collection exists in Strapi)
export async function getServices(): Promise<
  StrapiCollectionResponse<Service>
> {
  try {
    const query = new URLSearchParams({
      sort: "order:asc",
      populate: "*",
    });

    return await fetchAPI(`/api/services?${query.toString()}`);
  } catch (error) {
    // Return empty array if services collection doesn't exist yet
    console.warn("Services collection not found, using Profile.services field");
    return { data: [], meta: {} };
  }
}
