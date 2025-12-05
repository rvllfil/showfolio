// Strapi API Response Types

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi Media Type
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
export interface StrapiBlock {
  type: string;
  children?: Array<{
    text: string;
    type: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

// Component Types
export interface SocialLink {
  id: number;
  label: string;
  url: string;
  iconKey: string;
}

export interface PortfolioNumber {
  id: number;
  label: string;
  value: string;
}

export interface TechTag {
  id: number;
  name: string;
  slug: string;
  category: "frontend" | "backend" | "cms" | "ecommerce" | "tool";
}

// Content Type: Profile (Single Type)
export interface Profile {
  id: number;
  documentId: string;
  brandName: string;
  tagline: string;
  shortInfo: string;
  about: StrapiBlock[];
  services: StrapiBlock[];
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  lightLogo?: StrapiMedia;
  darkLogo?: StrapiMedia;
  socialLinks?: SocialLink[];
  portfolioNumber?: PortfolioNumber[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Content Type: Portfolio (Collection Type)
export interface Portfolio {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  workType: "Real" | "Dummy";
  shortDescription: string;
  detailedDescription: StrapiBlock[];
  problem: StrapiBlock[];
  solution: StrapiBlock[];
  role: string;
  year: string;
  portfolioType: "landing_page" | "commerce" | "web_app";
  techTags?: TechTag[];
  isFeatured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Content Type: Skill (Collection Type)
export interface Skill {
  id: number;
  documentId: string;
  name: string;
  category: "backend" | "frontend" | "cms" | "ecommerce" | "tool";
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
