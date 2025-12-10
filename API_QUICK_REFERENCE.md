# Quick Reference: Services & Testimonials API

## 🔌 Strapi API Endpoints

### Services Collection

**List all services**

```bash
GET http://localhost:1337/api/services?populate=*&sort=order:asc
```

**Get single service**

```bash
GET http://localhost:1337/api/services/:documentId?populate=*
```

**Response Structure:**

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "Web Development",
      "slug": "web-development",
      "description": [
        {
          "type": "paragraph",
          "children": [{ "text": "Custom web applications...", "type": "text" }]
        }
      ],
      "short_description": "Build modern web apps with React",
      "icon": "code",
      "featured": true,
      "order": 1,
      "image": {
        "id": 1,
        "url": "/uploads/service_image_123.jpg",
        "...": "...other media fields"
      },
      "createdAt": "2025-12-10T...",
      "updatedAt": "2025-12-10T...",
      "publishedAt": "2025-12-10T..."
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 4 }
  }
}
```

### Testimonials Collection

**List all testimonials**

```bash
GET http://localhost:1337/api/testimonials?populate=*&sort=order:asc
```

**Get single testimonial**

```bash
GET http://localhost:1337/api/testimonials/:documentId?populate=*
```

**Response Structure:**

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "xyz789",
      "name": "Sarah Johnson",
      "role": "Marketing Director",
      "company": "TechCorp Inc.",
      "quote": [
        {
          "type": "paragraph",
          "children": [{ "text": "Excellent work!", "type": "text" }]
        }
      ],
      "avatar": {
        "id": 2,
        "url": "/uploads/avatar_456.jpg",
        "...": "...other media fields"
      },
      "featured": true,
      "order": 1,
      "createdAt": "2025-12-10T...",
      "updatedAt": "2025-12-10T...",
      "publishedAt": "2025-12-10T..."
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 3 }
  }
}
```

---

## 💻 Next.js API Usage

### Import Types and Helpers

```typescript
import { getServices, getTestimonials } from "@/lib/api";
import type { Service, Testimonial } from "@/lib/types";
```

### Fetch Services

```typescript
// In Server Component
const servicesResponse = await getServices();
const services = servicesResponse?.data ?? [];

// services is Service[]
services.forEach((service) => {
  console.log(service.title); // "Web Development"
  console.log(service.icon); // "code"
  console.log(service.short_description); // Brief text
});
```

### Fetch Testimonials

```typescript
// In Server Component
const testimonialsResponse = await getTestimonials();
const testimonials = testimonialsResponse?.data ?? [];

// testimonials is Testimonial[]
testimonials.forEach((testimonial) => {
  console.log(testimonial.name); // "Sarah Johnson"
  console.log(testimonial.role); // "Marketing Director"
  console.log(testimonial.company); // "TechCorp Inc."
});
```

### Render Rich Text (Blocks)

```typescript
import { renderBlocksAsText } from "@/lib/strapi-helpers";

// Convert Strapi blocks to plain text
const description = renderBlocksAsText(service.description);
const quote = renderBlocksAsText(testimonial.quote);

// For full rich text rendering with formatting
import { renderBlocks } from "@/lib/strapi-helpers";
const content = renderBlocks(service.description);
```

### Handle Media (Images)

```typescript
// Service image
{
  service.image && (
    <img
      src={`${process.env.NEXT_PUBLIC_API_URL}${service.image.url}`}
      alt={service.title}
    />
  );
}

// Testimonial avatar
{
  testimonial.avatar && (
    <img
      src={`${process.env.NEXT_PUBLIC_API_URL}${testimonial.avatar.url}`}
      alt={testimonial.name}
    />
  );
}
```

---

## 🎨 Component Props

### ServicesSection

```typescript
<ServicesSection
  profileData={profile} // For section titles
  servicesData={services} // Service[] from Strapi
/>
```

**Behavior:**

- If `servicesData` is empty → shows 4 default services
- If `servicesData` has items → renders Strapi services
- Icons mapped: code, layout, palette, zap
- Description rendered from blocks

### TestimonialsSection

```typescript
<TestimonialsSection
  profileData={profile} // For section titles
  testimonialsData={testimonials} // Testimonial[] from Strapi
/>
```

**Behavior:**

- If `testimonialsData` is empty → shows 4 placeholder testimonials
- If `testimonialsData` has items → renders Strapi testimonials
- Quote rendered from blocks
- Avatar displayed if available

---

## 🔧 Icon Mapping (Services)

| Icon Key  | Lucide Icon   | Suggested Use                    |
| --------- | ------------- | -------------------------------- |
| `code`    | `<Code />`    | Web Development, Programming     |
| `layout`  | `<Layout />`  | UI Design, Frontend Architecture |
| `palette` | `<Palette />` | Branding, Creative Services      |
| `zap`     | `<Zap />`     | Performance, Optimization        |

**Adding Custom Icons:**

1. Import icon:

```typescript
import { Code, Layout, Palette, Zap, Database } from "lucide-react";
```

2. Update mapping:

```typescript
const iconMap = {
  code: Code,
  layout: Layout,
  palette: Palette,
  zap: Zap,
  database: Database, // New icon
};
```

3. Use `"database"` as icon value in Strapi

---

## 📝 Content Guidelines

### Writing Services

**Title:** Clear, action-oriented (3-5 words)

- ✅ "Web Development"
- ✅ "UI/UX Design"
- ❌ "I can help you with websites"

**Short Description:** One-line summary (50-80 chars)

- ✅ "Custom web applications with modern technologies"
- ❌ "I build websites using React and other stuff"

**Description:** Detailed explanation with benefits

- Use paragraphs
- Include specific technologies
- Focus on client value

**Icon:** Choose the most relevant

- Development work → `code`
- Design/UI → `layout` or `palette`
- Performance → `zap`

### Writing Testimonials

**Name:** Full name with proper capitalization

- ✅ "Sarah Johnson"
- ❌ "sarah j"

**Role:** Professional title

- ✅ "Marketing Director"
- ✅ "Senior Product Manager"
- ❌ "works at company"

**Company:** Optional but recommended

- Include if permission granted
- Leave blank for anonymous testimonials

**Quote:** Authentic, specific feedback (100-200 words)

- Focus on results and impact
- Include specific details
- Natural, conversational tone

**Avatar:** Professional photo

- High quality (at least 300x300px)
- Clear face shot
- Proper lighting

---

## 🧪 Testing Commands

### Test Strapi APIs

```bash
# List services
curl http://localhost:1337/api/services?populate=*

# List testimonials
curl http://localhost:1337/api/testimonials?populate=*

# Pretty print JSON
curl http://localhost:1337/api/services?populate=* | jq

# Check specific service
curl "http://localhost:1337/api/services?filters[slug][\$eq]=web-development&populate=*"
```

### Test Frontend Integration

```bash
# Build (should succeed)
cd client
npm run build

# Check TypeScript
npm run type-check

# Dev mode
npm run dev
```

### Verify Data Flow

```typescript
// Add to page.tsx for debugging
console.log("Services:", services);
console.log("Testimonials:", testimonials);
```

---

## 🚨 Common Errors & Fixes

### Error: 403 Forbidden

**Problem:** Permissions not enabled

**Fix:**

1. Strapi Admin → Settings → Users & Permissions → Public
2. Enable `find` and `findOne` for Services and Testimonials
3. Save

### Error: 404 Not Found

**Problem:** Collection doesn't exist or Strapi not restarted

**Fix:**

```bash
cd server
# Restart Strapi
npm run develop
```

### Error: Empty data array

**Problem:** No published content

**Fix:**

1. Go to Content Manager
2. Check content is **Published** (not draft)
3. Click "Publish" button

### Error: Image not displaying

**Problem:** CORS or URL issue

**Fix:**

1. Check `NEXT_PUBLIC_API_URL` in `.env.local`
2. Verify image URL: `http://localhost:1337/uploads/...`
3. Add to `next.config.ts`:

```typescript
images: {
  domains: ['localhost'],
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '1337',
      pathname: '/uploads/**',
    },
  ],
}
```

---

## 📦 Type Reference

### Service

```typescript
interface Service {
  id: number;
  documentId: string;
  title: string; // "Web Development"
  slug: string; // "web-development"
  description: StrapiBlock[]; // Rich text
  short_description: string; // One-liner
  icon: string; // "code" | "layout" | "palette" | "zap"
  featured: boolean; // Highlight flag
  order?: number; // Sort order
  image?: StrapiMedia; // Service image
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  publishedAt: string; // ISO timestamp
}
```

### Testimonial

```typescript
interface Testimonial {
  id: number;
  documentId: string;
  name: string; // "Sarah Johnson"
  role: string; // "Marketing Director"
  company?: string; // "TechCorp Inc."
  quote: StrapiBlock[]; // Rich text
  avatar?: StrapiMedia; // Profile photo
  featured: boolean; // Highlight flag
  order?: number; // Sort order
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  publishedAt: string; // ISO timestamp
}
```

### StrapiBlock (Rich Text)

```typescript
interface StrapiBlock {
  type: string; // "paragraph", "heading", "list", etc.
  children?: Array<{
    text: string;
    type: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}
```

### StrapiMedia (Images)

```typescript
interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  url: string; // "/uploads/image_123.jpg"
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
  // ... other fields
}
```

---

## 🎯 Best Practices

1. **Always populate relations:** Use `?populate=*` in API calls
2. **Handle nulls gracefully:** Use optional chaining (`?.`) and nullish coalescing (`??`)
3. **Sort consistently:** Use `?sort=order:asc` for predictable ordering
4. **Optimize images:** Upload appropriately sized images to Strapi
5. **Test fallbacks:** Verify UI works with empty collections
6. **Validate content:** Ensure all required fields are filled before publishing
7. **Use TypeScript:** Leverage types for compile-time safety
8. **Cache API calls:** Use Next.js ISR (`revalidate: 60`)

---

**Quick Links:**

- [Full Setup Guide](./SERVICES_TESTIMONIALS_SETUP.md)
- [Strapi Configuration](./STRAPI_CONFIGURATION.md)
- [Implementation Summary](./IMPLEMENTATION_COMPLETE.md)
