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
export async function getProfile(locale: string = "id") {
  const query = new URLSearchParams({
    locale,
    "populate[social_links]": "*",
    "populate[portofolio_number]": "*",
  });

  return fetchAPI(`/api/profile?${query.toString()}`);
}

// Ambil semua PortfolioItem
export async function getPortfolioItems() {
  const query = new URLSearchParams({
    sort: "year:desc",
  });

  return fetchAPI(`/api/portofolios?${query.toString()}`);
}

// Ambil satu PortfolioItem by slug
export async function getPortfolioItemBySlug(
  slug: string,
  locale: string = "id"
) {
  const query = new URLSearchParams({
    locale,
    "filters[slug][$eq]": slug,
    "populate[coverImage]": "*",
    "populate[gallery]": "*",
    "populate[techTags]": "*",
  });

  const data = await fetchAPI(`/api/portofolios?${query.toString()}`);

  // format response Strapi v4: { data: [...] }
  if (!data?.data?.length) return null;
  return data.data[0];
}
