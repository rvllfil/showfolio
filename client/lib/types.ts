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

// Content Type: Hero Section (Single Type)
export interface Hero {
  id: number;
  documentId: string;
  headline?: string;
  subHeadline?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  techTags?: TechTag[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Content Type: About Section (Single Type)
export interface About {
  id: number;
  documentId: string;
  aboutSectionTitle?: string;
  aboutSectionSubtitle?: string;
  about?: StrapiBlock[];
  whatIDoList?: string;
  portfolioNumber?: PortfolioNumber[];
  socialLinks?: SocialLink[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Content Type: Contact Section (Single Type)
export interface Contact {
  id: number;
  documentId: string;
  contactSectionTitle?: string;
  contactSectionDescription?: string;
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
  socialLinks?: SocialLink[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Content Type: Profile (Single Type) - Global metadata
export interface Profile {
  id: number;
  documentId: string;
  brandName: string;
  title?: string;
  tagline?: string;
  shortInfo: string;
  about?: StrapiBlock[];
  whatIDoList?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  socialLinks?: SocialLink[];
  portfolioNumber?: PortfolioNumber[];
  profileImage?: StrapiMedia;
  lightLogo?: StrapiMedia;
  darkLogo?: StrapiMedia;
  favicon?: StrapiMedia;

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

  // Contact fields
  contactSectionTitle?: string;
  contactSectionDescription?: string;
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

  // Section titles (for sections without dedicated single-types)
  servicesSectionTitle?: string;
  servicesSectionSubtitle?: string;
  projectsSectionTitle?: string;
  projectsSectionSubtitle?: string;
  skillsSectionTitle?: string;
  skillsSectionSubtitle?: string;
  testimonialsSectionTitle?: string;
  testimonialsSectionSubtitle?: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Merged type for component consumption (backward compatibility)
export interface MergedProfileData extends Profile {
  // Hero fields
  headline?: string;
  subHeadline?: string;
  heroAvailabilityText?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  profileImage?: StrapiMedia;
  heroBackgroundMedia?: StrapiMedia;
  portfolioNumber?: PortfolioNumber[];
  techTags?: TechTag[];

  // About fields
  aboutSectionTitle?: string;
  aboutSectionSubtitle?: string;
  about?: StrapiBlock[];
  whatIDoList?: string;

  // Contact fields
  contactSectionTitle?: string;
  contactSectionDescription?: string;
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
}

// Content Type: Portfolio (Collection Type)
export interface Portfolio {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  workType: "real" | "dummy";
  shortDescription: string;
  detailedDescription: StrapiBlock[];
  problem: StrapiBlock[];
  solution: StrapiBlock[];
  role: string;
  year: string;
  portfolioType:
    | "website"
    | "landing_page"
    | "commerce"
    | "ecommerce"
    | "web_app";
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
