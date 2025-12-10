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

// Section Headings & Content Types
export interface SectionContent {
  title?: string;
  subtitle?: string;
  description?: string;
}

// Content Type: Profile (Single Type)
export interface Profile {
  id: number;
  documentId: string;
  brandName: string;
  title?: string;
  tagline: string;
  shortInfo: string;
  about: StrapiBlock[];
  whatIDoList?: string; // richtext HTML
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  lightLogo?: StrapiMedia;
  darkLogo?: StrapiMedia;
  favicon?: StrapiMedia;
  profileImage?: StrapiMedia;
  socialLinks?: SocialLink[];
  portfolioNumber?: PortfolioNumber[];

  // Navigation labels
  navHomeLabel?: string;
  navAboutLabel?: string;
  navServicesLabel?: string;
  navPortfolioLabel?: string;
  navContactLabel?: string;
  navCtaLabel?: string;

  // Footer labels
  footerQuickLinksTitle?: string;
  footerContactTitle?: string;
  footerEmailLabel?: string;
  footerPortfolioLabel?: string;

  // Section-specific content
  heroAvailabilityText?: string;
  aboutSectionTitle?: string;
  aboutSectionSubtitle?: string;
  servicesSectionTitle?: string;
  servicesSectionSubtitle?: string;
  projectsSectionTitle?: string;
  projectsSectionSubtitle?: string;
  skillsSectionTitle?: string;
  skillsSectionSubtitle?: string;
  testimonialsSectionTitle?: string;
  testimonialsSectionSubtitle?: string;
  contactSectionTitle?: string;
  contactSectionSubtitle?: string;
  contactSectionDescription?: string;

  // Contact section content
  contactBenefitsTitle1?: string;
  contactBenefitsDescription1?: string;
  contactBenefitsTitle2?: string;
  contactBenefitsDescription2?: string;
  contactBenefitsTitle3?: string;
  contactBenefitsDescription3?: string;
  contactCtaTitle?: string;
  contactCtaDescription?: string;
  contactPrimaryButtonLabel?: string;
  contactSecondaryButtonLabel?: string;
  contactSocialTitle?: string;
  contactSocialDescription?: string;

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
  thumbnail?: StrapiMedia;
  portfolioImages?: StrapiMedia[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Skill Types
export type SkillCategory =
  | "frontend"
  | "backend"
  | "uiux"
  | "mobile"
  | "devops"
  | "tools";

// Content Type: Skill (Collection Type)
export interface Skill {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  category: SkillCategory;
  description?: string; // richtext HTML string from Strapi
  level?: number; // 0–100
  icon?: string; // icon key
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Content Type: Service (Collection Type)
export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: StrapiBlock[];
  short_description: string;
  icon: string;
  featured: boolean;
  order?: number;
  image?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Content Type: Testimonial (Collection Type)
export interface Testimonial {
  id: number;
  documentId: string;
  name: string;
  role: string;
  company?: string;
  quote: StrapiBlock[];
  avatar?: StrapiMedia;
  featured: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
