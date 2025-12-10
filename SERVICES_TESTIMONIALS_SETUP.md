# Services & Testimonials Collection Types Setup Guide

This guide explains the newly created **Services** and **Testimonials** collection types in Strapi and how to use them in your Showfolio portfolio.

## 📋 Overview

Two new Strapi collection types have been added:

1. **Services** - Showcase the services you offer to clients
2. **Testimonials** - Display client reviews and feedback

These are fully integrated with the Next.js frontend and support fallback data for graceful degradation.

---

## 🗂️ Files Created

### Strapi Backend (`/server/src/api/`)

#### Services Collection

- `service/content-types/service/schema.json` - Schema definition
- `service/controllers/service.ts` - Controller logic
- `service/routes/service.ts` - API routes
- `service/services/service.ts` - Business logic

#### Testimonials Collection

- `testimonial/content-types/testimonial/schema.json` - Schema definition
- `testimonial/controllers/testimonial.ts` - Controller logic
- `testimonial/routes/testimonial.ts` - API routes
- `testimonial/services/testimonial.ts` - Business logic

### Next.js Frontend (`/client/`)

#### Updated Files

- `lib/types.ts` - Added Service and Testimonial TypeScript interfaces
- `lib/api.ts` - Already includes `getServices()` and `getTestimonials()` helpers
- `app/components/services-section.tsx` - Updated to render Strapi services
- `app/components/testimonials-section.tsx` - Updated to render Strapi testimonials

---

## 🏗️ Schema Details

### Services Collection Type

**API Endpoint:** `/api/services`

| Field               | Type               | Required | Description                                     |
| ------------------- | ------------------ | -------- | ----------------------------------------------- |
| `title`             | String             | Yes      | Service name (e.g., "Web Development")          |
| `slug`              | UID                | Yes      | Auto-generated from title                       |
| `description`       | Blocks (Rich Text) | Yes      | Detailed service description                    |
| `short_description` | Text               | Yes      | Brief one-line description                      |
| `icon`              | String             | Yes      | Icon key: "code", "layout", "palette", or "zap" |
| `featured`          | Boolean            | No       | Mark service as featured (default: false)       |
| `order`             | Integer            | No       | Display order (lower numbers first)             |
| `image`             | Media              | No       | Optional service image                          |
| `createdAt`         | DateTime           | Auto     | Creation timestamp                              |
| `updatedAt`         | DateTime           | Auto     | Last update timestamp                           |
| `publishedAt`       | DateTime           | Auto     | Publication timestamp                           |

**Icon Keys:**

- `code` - Code brackets (for development services)
- `layout` - Layout/grid (for design/UI services)
- `palette` - Color palette (for branding/creative)
- `zap` - Lightning bolt (for performance/optimization)

### Testimonials Collection Type

**API Endpoint:** `/api/testimonials`

| Field         | Type               | Required | Description                         |
| ------------- | ------------------ | -------- | ----------------------------------- |
| `name`        | String             | Yes      | Client name                         |
| `role`        | String             | Yes      | Client job title                    |
| `company`     | String             | No       | Company name                        |
| `quote`       | Blocks (Rich Text) | Yes      | Testimonial text                    |
| `avatar`      | Media              | No       | Client photo/avatar                 |
| `featured`    | Boolean            | No       | Mark as featured (default: false)   |
| `order`       | Integer            | No       | Display order (lower numbers first) |
| `createdAt`   | DateTime           | Auto     | Creation timestamp                  |
| `updatedAt`   | DateTime           | Auto     | Last update timestamp               |
| `publishedAt` | DateTime           | Auto     | Publication timestamp               |

---

## 🚀 Setup Instructions

### Step 1: Restart Strapi

After the schema files are created, restart your Strapi server to register the new collections:

```bash
cd server
npm run develop
```

You should see in the logs:

```
[INFO] Service collection type registered: api::service.service
[INFO] Testimonial collection type registered: api::testimonial.testimonial
```

### Step 2: Configure Permissions

In the Strapi admin panel:

1. Go to **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Enable the following permissions:

**Services:**

- ✅ `find` - List all services
- ✅ `findOne` - Get single service

**Testimonials:**

- ✅ `find` - List all testimonials
- ✅ `findOne` - Get single testimonial

3. Click **Save**

### Step 3: Add Content

#### Adding Services

1. Go to **Content Manager** → **Services**
2. Click **Create new entry**
3. Fill in the fields:
   - **Title**: e.g., "Web Development"
   - **Short Description**: One-line summary
   - **Description**: Full service details (rich text)
   - **Icon**: Choose from `code`, `layout`, `palette`, `zap`
   - **Order**: e.g., 1, 2, 3... (optional)
   - **Featured**: Check if this is a key service
   - **Image**: Upload service image (optional)
4. Click **Save** and **Publish**

**Example Services:**

```
Service 1:
- Title: Web Development
- Short Description: Custom web applications built with modern technologies
- Icon: code
- Order: 1

Service 2:
- Title: UI/UX Design
- Short Description: Beautiful, user-friendly interfaces
- Icon: palette
- Order: 2

Service 3:
- Title: Performance Optimization
- Short Description: Fast, efficient web experiences
- Icon: zap
- Order: 3
```

#### Adding Testimonials

1. Go to **Content Manager** → **Testimonials**
2. Click **Create new entry**
3. Fill in the fields:
   - **Name**: Client full name
   - **Role**: Job title
   - **Company**: Company name (optional)
   - **Quote**: Testimonial text (rich text)
   - **Avatar**: Upload client photo (optional)
   - **Order**: Display order (optional)
   - **Featured**: Check if this should be prominently displayed
4. Click **Save** and **Publish**

**Example Testimonial:**

```
Name: Sarah Johnson
Role: Marketing Director
Company: TechCorp Inc.
Quote: "Working with [Your Name] was fantastic. The project was delivered on time and exceeded our expectations."
Avatar: [Upload photo]
Order: 1
```

---

## 💻 Frontend Integration

### TypeScript Types

Both collection types are fully typed in `lib/types.ts`:

```typescript
export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: StrapiBlock[]; // Rich text blocks
  short_description: string;
  icon: string;
  featured: boolean;
  order?: number;
  image?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Testimonial {
  id: number;
  documentId: string;
  name: string;
  role: string;
  company?: string;
  quote: StrapiBlock[]; // Rich text blocks
  avatar?: StrapiMedia;
  featured: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
```

### API Helpers

Fetch functions are available in `lib/api.ts`:

```typescript
// Fetch all services (sorted by order)
const servicesResponse = await getServices();
const services = servicesResponse.data; // Service[]

// Fetch all testimonials (sorted by order)
const testimonialsResponse = await getTestimonials();
const testimonials = testimonialsResponse.data; // Testimonial[]
```

Both functions include graceful fallback handling - if the collection doesn't exist or is empty, they return empty arrays and the UI shows default placeholder content.

### Component Usage

Both components are already integrated in `app/page.tsx`:

```typescript
export default async function HomePage() {
  const [
    profileResponse,
    portfolioResponse,
    skillsResponse,
    testimonialsResponse,
    servicesResponse,
  ] = await Promise.all([
    getProfile(),
    getFeaturedPortfolio(),
    getSkills(),
    getTestimonials(),
    getServices(),
  ]);

  // Pass to components
  return (
    <>
      <ServicesSection profileData={profile} servicesData={services} />
      <TestimonialsSection
        profileData={profile}
        testimonialsData={testimonials}
      />
    </>
  );
}
```

---

## 🎨 Customization

### Services Section

The services section supports 4 icon types:

- **code** - Development services
- **layout** - Design/UI services
- **palette** - Branding/creative
- **zap** - Performance/speed

To add more icons:

1. Import the icon in `services-section.tsx`:

```typescript
import { Code, Layout, Palette, Zap, NewIcon } from "lucide-react";
```

2. Add to icon mapping:

```typescript
const iconMap = {
  code: Code,
  layout: Layout,
  palette: Palette,
  zap: Zap,
  newicon: NewIcon, // Add here
};
```

3. Use `newicon` in Strapi when creating services

### Testimonials Section

Testimonials automatically handle:

- Rich text quotes (rendered from Strapi blocks)
- Avatar images (from Strapi media library)
- Fallback to placeholder data when collection is empty

To customize the placeholder testimonials, edit the `placeholderTestimonials` array in `testimonials-section.tsx`.

---

## 🔄 Data Flow

### Services

```
Strapi CMS
  ↓
/api/services (REST API)
  ↓
getServices() helper
  ↓
HomePage fetches data
  ↓
ServicesSection component
  ↓
UI renders services with icons
```

### Testimonials

```
Strapi CMS
  ↓
/api/testimonials (REST API)
  ↓
getTestimonials() helper
  ↓
HomePage fetches data
  ↓
TestimonialsSection component
  ↓
UI renders testimonial cards
```

---

## 🧪 Testing

### Test Services API

```bash
# List all services
curl http://localhost:1337/api/services?populate=*

# Get single service by ID
curl http://localhost:1337/api/services/{documentId}?populate=*
```

### Test Testimonials API

```bash
# List all testimonials
curl http://localhost:1337/api/testimonials?populate=*

# Get single testimonial by ID
curl http://localhost:1337/api/testimonials/{documentId}?populate=*
```

### Verify Frontend

1. Start Strapi: `cd server && npm run develop`
2. Start Next.js: `cd client && npm run dev`
3. Visit `http://localhost:3000`
4. Check the Services and Testimonials sections

---

## 🐛 Troubleshooting

### Collection not appearing in Strapi admin

- Restart Strapi server
- Check that schema.json files exist in correct locations
- Check console for errors

### API returns 404

- Verify permissions are enabled for Public role
- Check that content is published (not just saved as draft)
- Verify `draftAndPublish: true` in schema

### Frontend shows placeholder data

- Check that Strapi is running on `http://localhost:1337`
- Verify `NEXT_PUBLIC_API_URL` is set in `client/.env.local`
- Check browser console for fetch errors
- Verify at least one service/testimonial is published

### Images not showing

- Check that avatar/image is uploaded in Strapi
- Verify image URL: `http://localhost:1337${media.url}`
- Check Next.js `next.config.ts` for image domains

---

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Lucide Icons](https://lucide.dev/)

---

## ✅ Checklist

Use this when setting up services and testimonials:

- [ ] Restart Strapi after schema creation
- [ ] Collection types appear in Strapi admin
- [ ] Enable Public permissions (find, findOne)
- [ ] Create at least 3 services
- [ ] Create at least 3 testimonials
- [ ] Publish all entries
- [ ] Test API endpoints with curl
- [ ] Verify frontend displays Strapi data
- [ ] Upload avatars for testimonials
- [ ] Set proper order values

---

**Note:** Both collections support draft/publish workflow. Content must be **Published** to appear on the frontend!
