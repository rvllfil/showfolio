# Strapi Configuration Guide for Showfolio

This guide documents all Strapi fields required to make Showfolio fully dynamic and reusable. By configuring these fields in your Strapi backend, you can completely customize the portfolio without touching any frontend code.

## 📋 Table of Contents

1. [Profile Collection Type (Single Type)](#profile-collection-type)
2. [Portfolio Collection Type](#portfolio-collection-type)
3. [Skill Collection Type](#skill-collection-type)
4. [Service Collection Type](#service-collection-type)
5. [Testimonial Collection Type](#testimonial-collection-type)
6. [Quick Start Checklist](#quick-start-checklist)

---

## Profile Collection Type (Single Type)

The Profile is a **Single Type** - you only have one profile record. This is the main configuration point for your portfolio.

### Basic Information Fields

| Field Name | Type           | Required | Description             | Example                                 |
| ---------- | -------------- | -------- | ----------------------- | --------------------------------------- |
| `name`     | Text           | Yes      | Your full name          | "John Doe"                              |
| `title`    | Text           | Yes      | Your professional title | "Full Stack Developer"                  |
| `email`    | Email          | Yes      | Your contact email      | "john@example.com"                      |
| `bio`      | Rich Text      | Yes      | Your professional bio   | "Passionate developer with 5+ years..." |
| `avatar`   | Media (Single) | No       | Your profile photo      | -                                       |
| `resume`   | Media (Single) | No       | Your resume PDF         | -                                       |

### Hero Section Fields

| Field Name             | Type | Required | Description               | Example                      |
| ---------------------- | ---- | -------- | ------------------------- | ---------------------------- |
| `heroAvailabilityText` | Text | No       | Status text shown in hero | "Available for new projects" |
| `primaryCtaLabel`      | Text | No       | Primary button text       | "View My Work"               |
| `primaryCtaUrl`        | Text | No       | Primary button link       | "#portfolio"                 |
| `secondaryCtaLabel`    | Text | No       | Secondary button text     | "Get in Touch"               |
| `secondaryCtaUrl`      | Text | No       | Secondary button link     | "#contact"                   |

### Section Titles & Subtitles

Configure the header for each section on your landing page:

| Field Name                    | Type | Required | Description             | Example                                                         |
| ----------------------------- | ---- | -------- | ----------------------- | --------------------------------------------------------------- |
| `aboutSectionTitle`           | Text | No       | About section header    | "About Me"                                                      |
| `aboutSectionSubtitle`        | Text | No       | About section tagline   | "Passionate developer crafting exceptional digital experiences" |
| `servicesSectionTitle`        | Text | No       | Services section header | "What I Do"                                                     |
| `servicesSectionSubtitle`     | Text | No       | Services tagline        | "Comprehensive solutions for your digital needs"                |
| `projectsSectionTitle`        | Text | No       | Projects section header | "Featured Projects"                                             |
| `projectsSectionSubtitle`     | Text | No       | Projects tagline        | "A showcase of my recent work and achievements"                 |
| `skillsSectionTitle`          | Text | No       | Skills section header   | "Technical Skills"                                              |
| `skillsSectionSubtitle`       | Text | No       | Skills tagline          | "Technologies and tools I work with"                            |
| `testimonialsSectionTitle`    | Text | No       | Testimonials header     | "What Clients Say"                                              |
| `testimonialsSectionSubtitle` | Text | No       | Testimonials tagline    | "Feedback from people I've worked with"                         |
| `contactSectionTitle`         | Text | No       | Contact section header  | "Let's Work Together"                                           |
| `contactSectionSubtitle`      | Text | No       | Contact tagline         | "Have a project in mind? Let's discuss how I can help"          |

### Components

#### Social Links (Component: `global.social-links`)

Repeatable component for social media profiles. The platform detection is automatic based on the URL.

| Field Name | Type | Required | Description                                     |
| ---------- | ---- | -------- | ----------------------------------------------- |
| `platform` | Text | Yes      | Platform name (github, linkedin, twitter, etc.) |
| `url`      | Text | Yes      | Full URL to your profile                        |

**Supported Platforms with Auto-Detection:**

- GitHub (github.com) - Shows GitHub icon in #333
- LinkedIn (linkedin.com) - Shows LinkedIn icon in #0A66C2
- Twitter (twitter.com, x.com) - Shows Twitter icon in #1DA1F2
- Instagram (instagram.com) - Shows Instagram icon in #E4405F
- Facebook (facebook.com) - Shows Facebook icon in #1877F2
- YouTube (youtube.com) - Shows YouTube icon in #FF0000
- Email (mailto:) - Shows Mail icon in #EA4335
- WhatsApp (wa.me, whatsapp.com) - Shows WhatsApp icon in #25D366
- Other URLs - Shows Globe icon in default color

#### Portfolio Numbers (Component: `global.portfolio-number`)

Repeatable component for statistics/achievements shown in About section.

| Field Name | Type   | Required | Description                     |
| ---------- | ------ | -------- | ------------------------------- |
| `label`    | Text   | Yes      | What the number represents      |
| `value`    | Number | Yes      | The statistic value             |
| `suffix`   | Text   | No       | Unit or suffix (e.g., "+", "K") |

Example:

```json
[
  { "label": "Projects Completed", "value": 150, "suffix": "+" },
  { "label": "Happy Clients", "value": 50, "suffix": "+" },
  { "label": "Years Experience", "value": 5, "suffix": "" }
]
```

---

## Portfolio Collection Type

Showcase your projects and case studies.

| Field Name     | Type                   | Required | Description                           |
| -------------- | ---------------------- | -------- | ------------------------------------- |
| `title`        | Text                   | Yes      | Project name                          |
| `slug`         | UID                    | Yes      | URL-friendly identifier               |
| `description`  | Rich Text              | Yes      | Project overview                      |
| `featured`     | Boolean                | No       | Show on homepage                      |
| `projectType`  | Enumeration            | No       | Category (web, mobile, design, other) |
| `clientName`   | Text                   | No       | Client or company name                |
| `projectUrl`   | Text                   | No       | Live project URL                      |
| `githubUrl`    | Text                   | No       | Repository URL                        |
| `heroImage`    | Media (Single)         | No       | Main project image                    |
| `gallery`      | Media (Multiple)       | No       | Additional screenshots                |
| `completedAt`  | Date                   | No       | Project completion date               |
| `technologies` | Component (Repeatable) | No       | Tech stack used                       |

### Technologies Component (`global.tech-tags`)

| Field Name | Type | Required | Description     |
| ---------- | ---- | -------- | --------------- |
| `name`     | Text | Yes      | Technology name |

Example: React, TypeScript, Node.js, PostgreSQL

---

## Skill Collection Type

Display your technical skills organized by category.

| Field Name    | Type        | Required | Description           | Example                        |
| ------------- | ----------- | -------- | --------------------- | ------------------------------ |
| `name`        | Text        | Yes      | Skill/technology name | "React"                        |
| `category`    | Enumeration | Yes      | Skill category        | "frontend", "backend", "tools" |
| `proficiency` | Number      | No       | Skill level (1-100)   | 90                             |
| `icon`        | Text        | No       | Icon identifier       | "react"                        |
| `order`       | Number      | No       | Display order         | 1                              |

### Category Options

- `frontend` - Frontend technologies (React, Vue, Angular, HTML/CSS, etc.)
- `backend` - Backend technologies (Node.js, Python, databases, etc.)
- `tools` - Development tools (Git, Docker, VS Code, etc.)

**Frontend Icons:** The SkillsSection will automatically show the Code2 icon for frontend skills.
**Backend Icons:** Server icon for backend skills.
**Tools Icons:** Wrench icon for tools.

---

## Service Collection Type

Showcase the services you offer.

| Field Name    | Type        | Required | Description                   | Example                                                  |
| ------------- | ----------- | -------- | ----------------------------- | -------------------------------------------------------- |
| `title`       | Text        | Yes      | Service name                  | "Web Development"                                        |
| `description` | Text        | Yes      | Service description           | "Building responsive, modern websites..."                |
| `iconKey`     | Enumeration | Yes      | Icon to display               | "code", "layout", "palette", "zap"                       |
| `features`    | Text (Long) | No       | List of features/deliverables | "React applications\nResponsive design\nAPI integration" |
| `order`       | Number      | No       | Display order                 | 1                                                        |

### Icon Key Options

- `code` - Code brackets icon (for development services)
- `layout` - Layout/grid icon (for design/UI services)
- `palette` - Palette icon (for branding/creative services)
- `zap` - Lightning bolt icon (for optimization/performance services)

---

## Testimonial Collection Type

Display client feedback and reviews.

| Field Name | Type           | Required | Description       | Example                              |
| ---------- | -------------- | -------- | ----------------- | ------------------------------------ |
| `name`     | Text           | Yes      | Client name       | "Sarah Johnson"                      |
| `role`     | Text           | Yes      | Client job title  | "Marketing Director"                 |
| `company`  | Text           | Yes      | Client company    | "Tech Innovations Inc."              |
| `content`  | Text (Long)    | Yes      | Testimonial text  | "Working with John was fantastic..." |
| `rating`   | Number         | No       | Star rating (1-5) | 5                                    |
| `avatar`   | Media (Single) | No       | Client photo      | -                                    |
| `order`    | Number         | No       | Display order     | 1                                    |

**Avatar Fallback:** If no avatar is provided, testimonials will show initials or default placeholder.

---

## Quick Start Checklist

Use this checklist when setting up Showfolio for a new user:

### ✅ Profile Setup (Single Type)

- [ ] Create Profile single type in Strapi
- [ ] Add all basic fields (name, title, email, bio, avatar)
- [ ] Add all hero section fields (heroAvailabilityText, CTA labels/URLs)
- [ ] Add all section title/subtitle fields
- [ ] Add Social Links component (repeatable)
- [ ] Add Portfolio Numbers component (repeatable)
- [ ] Populate your profile data

### ✅ Collections Setup

- [ ] Create Portfolio collection type

  - [ ] Add all fields listed above
  - [ ] Add Technologies component (global.tech-tags)
  - [ ] Create at least 3 portfolio items
  - [ ] Mark 2-3 as `featured: true` for homepage

- [ ] Create Skill collection type

  - [ ] Add name, category (enum: frontend/backend/tools), proficiency
  - [ ] Create skills for each category
  - [ ] Set appropriate order values

- [ ] Create Service collection type

  - [ ] Add title, description, iconKey (enum: code/layout/palette/zap)
  - [ ] Create 3-4 service entries
  - [ ] Set order values

- [ ] Create Testimonial collection type
  - [ ] Add name, role, company, content, rating, avatar
  - [ ] Create 3-4 testimonial entries
  - [ ] Upload client photos (optional)

### ✅ Content Population

- [ ] Write compelling bio and section descriptions
- [ ] Upload high-quality project images
- [ ] Add all your social media links
- [ ] Set portfolio numbers (projects completed, clients, years experience)
- [ ] Get client testimonials and add them
- [ ] Define your service offerings
- [ ] List all your technical skills

### ✅ Strapi Settings

- [ ] Enable public access to all collections (Settings > Users & Permissions > Public)

  - [ ] Portfolio: find, findOne
  - [ ] Skill: find
  - [ ] Service: find
  - [ ] Testimonial: find
  - [ ] Profile: find

- [ ] Set `NEXT_PUBLIC_API_URL` in client `.env.local` to your Strapi URL

---

## Default Fallbacks

Showfolio includes sensible defaults for all sections. If Strapi data is missing:

- **Hero Section:** Shows "Available for new projects" and default CTAs
- **About Section:** Shows "About Me" title with generic subtitle
- **Services Section:** Shows 4 default services (Web Dev, UI/UX Design, Backend Dev, Performance Optimization)
- **Projects Section:** Shows "Featured Projects" title (pulls from Portfolio collection)
- **Skills Section:** Shows default React/TypeScript/Node.js skills
- **Testimonials Section:** Shows 4 placeholder testimonials
- **Contact Section:** Shows "Let's Work Together" title

This means the portfolio works immediately, but to make it truly yours, populate all Strapi fields!

---

## Example Workflow: Customizing for a New User

1. **Install & Run Strapi:**

   ```bash
   cd server
   npm install
   npm run develop
   ```

2. **Create All Content Types** using the field definitions above

3. **Populate Your Data:**

   - Profile: Add your name, title, bio, social links, section titles
   - Portfolio: Add 3-5 projects, mark best ones as featured
   - Skills: Add 10-15 skills across frontend/backend/tools
   - Services: Add 3-4 services you offer
   - Testimonials: Add 3-5 client reviews

4. **Enable Public Access** in Strapi Settings

5. **Configure Environment:**

   ```bash
   # client/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:1337
   ```

6. **Run Frontend:**

   ```bash
   cd client
   npm install
   npm run dev
   ```

7. **Verify:** Visit http://localhost:3000 - all your content should be live!

---

## Need Help?

Refer to the main README.md for technical setup details, or check CLIENT_README.md for frontend-specific documentation.

**Key Principle:** Once Strapi is configured, you should **never need to touch the frontend code** to customize your portfolio. Everything is driven by your Strapi content! 🚀
