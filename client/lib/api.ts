import type {
  StrapiResponse,
  StrapiCollectionResponse,
  Profile,
  Hero,
  About,
  Contact,
  Portfolio,
  Skill,
  Testimonial,
  Service,
  MergedProfileData,
} from "./types";

// Use different API URLs for server-side vs client-side
// Server-side: use internal Docker network URL
// Client-side: use public URL accessible from browser
const API_URL =
  typeof window === "undefined"
    ? process.env.API_URL || process.env.NEXT_PUBLIC_API_URL // Server-side
    : process.env.NEXT_PUBLIC_API_URL; // Client-side

// Opsional: cek kalau API_URL belum di-set
if (!API_URL) {
  throw new Error(
    "API_URL or NEXT_PUBLIC_API_URL is not defined. Please set it in environment variables",
  );
}

/**
 * Helper umum untuk call API Strapi
 * @param path - path api, misalnya "/api/profile" atau "/api/portfolio-items"
 * @param options - opsi fetch tambahan
 */
export async function fetchAPI(
  path: string,
  options: RequestInit & { next?: Record<string, unknown> } = {},
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
  locale?: string,
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

// Ambil Hero Section (single type)
export async function getHero(): Promise<StrapiResponse<Hero>> {
  try {
    return await fetchAPI("/api/hero?populate=*");
  } catch (error) {
    console.warn("Hero section not found, will use fallback");
    return { data: {} as Hero };
  }
}

// Ambil About Section (single type)
export async function getAbout(): Promise<StrapiResponse<About>> {
  try {
    return await fetchAPI("/api/about?populate=*");
  } catch (error) {
    console.warn("About section not found, will use fallback");
    return { data: {} as About };
  }
}

// Ambil Contact Section (single type)
export async function getContact(): Promise<StrapiResponse<Contact>> {
  try {
    return await fetchAPI("/api/contact?populate=*");
  } catch (error) {
    console.warn("Contact section not found, will use fallback");
    return { data: {} as Contact };
  }
}

// Helper to merge section data with profile for backward compatibility
export function mergeProfileData(
  profile: Profile | null,
  hero: Hero | null,
  about: About | null,
  contact: Contact | null,
): MergedProfileData | null {
  if (!profile) return null;

  return {
    ...profile,
    // Hero fields (mapped from new hero single-type)
    ...(hero?.headline && { headline: hero.headline }),
    ...(hero?.subHeadline && { subHeadline: hero.subHeadline }),
    ...(hero?.primaryCtaLabel && { primaryCtaLabel: hero.primaryCtaLabel }),
    ...(hero?.primaryCtaUrl && { primaryCtaUrl: hero.primaryCtaUrl }),
    ...(hero?.secondaryCtaLabel && {
      secondaryCtaLabel: hero.secondaryCtaLabel,
    }),
    ...(hero?.secondaryCtaUrl && { secondaryCtaUrl: hero.secondaryCtaUrl }),
    ...(hero?.techTags && { techTags: hero.techTags }),
    // About fields
    ...(about?.aboutSectionTitle && {
      aboutSectionTitle: about.aboutSectionTitle,
    }),
    ...(about?.aboutSectionSubtitle && {
      aboutSectionSubtitle: about.aboutSectionSubtitle,
    }),
    ...(about?.about && { about: about.about }),
    ...(about?.whatIDoList && { whatIDoList: about.whatIDoList }),
    ...(about?.portfolioNumber &&
      !hero?.portfolioNumber && { portfolioNumber: about.portfolioNumber }),
    ...(about?.socialLinks && { socialLinks: about.socialLinks }),
    // Contact fields
    ...(contact?.contactSectionTitle && {
      contactSectionTitle: contact.contactSectionTitle,
    }),
    ...(contact?.contactSectionDescription && {
      contactSectionDescription: contact.contactSectionDescription,
    }),
    ...(contact?.contactBenefitsTitle1 && {
      contactBenefitsTitle1: contact.contactBenefitsTitle1,
    }),
    ...(contact?.contactBenefitsDescription1 && {
      contactBenefitsDescription1: contact.contactBenefitsDescription1,
    }),
    ...(contact?.contactBenefitsTitle2 && {
      contactBenefitsTitle2: contact.contactBenefitsTitle2,
    }),
    ...(contact?.contactBenefitsDescription2 && {
      contactBenefitsDescription2: contact.contactBenefitsDescription2,
    }),
    ...(contact?.contactBenefitsTitle3 && {
      contactBenefitsTitle3: contact.contactBenefitsTitle3,
    }),
    ...(contact?.contactBenefitsDescription3 && {
      contactBenefitsDescription3: contact.contactBenefitsDescription3,
    }),
    ...(contact?.contactCtaTitle && {
      contactCtaTitle: contact.contactCtaTitle,
    }),
    ...(contact?.contactCtaDescription && {
      contactCtaDescription: contact.contactCtaDescription,
    }),
    ...(contact?.contactPrimaryButtonLabel && {
      contactPrimaryButtonLabel: contact.contactPrimaryButtonLabel,
    }),
    ...(contact?.contactSecondaryButtonLabel && {
      contactSecondaryButtonLabel: contact.contactSecondaryButtonLabel,
    }),
    ...(contact?.contactSocialTitle && {
      contactSocialTitle: contact.contactSocialTitle,
    }),
    ...(contact?.contactSocialDescription && {
      contactSocialDescription: contact.contactSocialDescription,
    }),
    ...(contact?.socialLinks &&
      !about?.socialLinks && { socialLinks: contact.socialLinks }),
  };
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
    "/api/portfolios?filters[isFeatured][$eq]=true&populate=*&sort=year:desc",
  );
}

// Ambil portfolio item berdasarkan slug
export async function getPortfolioItemBySlug(
  slug: string,
): Promise<Portfolio | null> {
  const response = await fetchAPI(
    `/api/portfolios?filters[slug][$eq]=${slug}&populate=*`,
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
