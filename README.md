# showfolio

**showfolio** is an open-source, headless portfolio starter kit built with:

- **Server:** Strapi (API / CMS)
- **Client:** Next.js + Tailwind CSS + shadcn/ui

It’s designed for studios, agencies, and freelancers who want a **faceless, studio-style portfolio** that showcases real and concept work, with theming powered by shadcn.

With showfolio, you can:

- Showcase **real** and **concept** work in a clean, minimal layout
- Manage content through **Strapi** (`Profile`, `PortfolioItem`, `Skill`, components like `social_link` & `tech_tag`, etc.)
- Use **Next.js** for a fast, SEO-friendly frontend
- Use **shadcn/ui** for consistent, themeable UI components
- Prepare for future **multi-theme** support without rewriting components

---

## ✨ Features

- 🧱 **Headless portfolio system** – Strapi as CMS (server), Next.js as UI (client)
- 🎭 **Real + concept work** – `workType` for real client projects vs concept/dummy projects
- 🧩 **Tech tags as components** – `tech_tag` component repeatable di `PortfolioItem` (bukan collection)
- 🔗 **Social links as components** – `social_link` component repeatable di `Profile` untuk semua kontak & sosial media
- 🧾 **Single studio profile** – All studio identity lives in a single `Profile` (no Brand / ContactSettings single type)
- 🌍 **Multi-language ready** – Built to work with Strapi i18n (e.g. `en`, `id`)
- 🎯 **SEO-friendly** – Clean URLs, SSR/SSG/ISR with Next.js
- 🎨 **Theme-ready with shadcn/ui** – Uses shadcn design tokens + CSS variables for colors, radius, etc.
- 🚀 **Open source** – Free to use, extend, and contribute

---

## 🧰 Tech Stack

**Client (frontend)**

- [Next.js](https://nextjs.org/)
- React
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) for theme class management

**Server (API / CMS)**

- [Strapi](https://strapi.io/) (v4+)
- Node.js
- Database: SQLite (dev) / PostgreSQL / MySQL (prod)

---

## 📁 Project Structure

Monorepo layout using **server** and **client**:

```bash
showfolio/
├── server/              # Strapi (API / CMS)
│   ├── src/
│   ├── config/
│   ├── package.json
│   └── README.md
├── client/              # Next.js app (Tailwind + shadcn/ui)
│   ├── app/ or pages/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── styles/ or globals.css
│   ├── package.json
│   └── README.md
├── docker-compose.yml   # (optional) docker setup
├── .gitignore
├── README.md            # this file
└── LICENSE
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Git
- (Optional for prod) PostgreSQL / MySQL, Docker, Nginx

---

## 2. Server Setup (Strapi)

From the project root:

```bash
cd server
```

If you haven’t created the Strapi app yet:

```bash
npx create-strapi-app@latest . --quickstart
```

> This will use SQLite by default for development.

Install dependencies (if needed):

```bash
npm install
```

### 2.1 Environment

Create a `.env` file in `server/` (example):

```env
APP_KEYS=someRandomAppKey,someOtherKey
API_TOKEN_SALT=someRandomSalt
ADMIN_JWT_SECRET=someRandomSecret
JWT_SECRET=someRandomJwtSecret
```

For dev, Strapi can auto-configure SQLite. For Postgres/MySQL in production, configure in `config/database.*` or via env vars.

### 2.2 Run Strapi (dev mode)

```bash
npm run develop
```

- Strapi Admin: `http://localhost:1337/admin`
- Create your admin user on first launch.

---

## 2.3 Content Types & Components Overview

showfolio uses:

### Single Types

- **`Profile`**
  Studio identity (brand name, tagline, about, services, CTAs, etc.)

  - includes repeatable `social_link` components for contact & social media.

### Collection Types

- **`PortfolioItem`**
  Each portfolio entry (real or concept work), includes repeatable `tech_tag` components.

- **`Skill`** (optional)
  Describes studio skills/capabilities (used on About/Services section).

### Components

- **`shared.social_link`** (component)
  Used as a **repeatable component in `Profile`** for contact/social links.

  Suggested fields:

  - `label` (string) – e.g. “Email”, “GitHub”, “LinkedIn”
  - `platform` (string / enum) – e.g. `email`, `github`, `linkedin`, `x`, `website` (optional)
  - `url` (string) – e.g. `mailto:...`, `https://github.com/...`
  - `iconKey` (string) – for mapping to an icon in the client (e.g. `github`, `mail`, `linkedin`)

- **`shared.tech_tag`** (component)
  Used as a **repeatable component in `PortfolioItem`** to describe the tech stack.

  Suggested fields:

  - `name` (string) – e.g. “Next.js”, “Strapi”, “Laravel”
  - `category` (enum, optional) – `frontend`, `backend`, `cms`, `ecommerce`, `tool`

> You can adjust the component category (`shared`, `global`, etc.) to your preference in Strapi.

### 2.4 Public API Permissions

In Strapi admin:

1. Go to **Settings → Users & Permissions Plugin → Roles → Public**
2. Enable `find` / `findOne` for:

   - `Profile`
   - `PortfolioItem`
   - `Skill` (if you use it)

3. Save your changes.

Components (`social_link`, `tech_tag`) will be included inside the JSON of `Profile` / `PortfolioItem`.

---

## 3. Client Setup (Next.js + shadcn/ui)

From the project root:

```bash
cd client
```

If you haven’t created the Next.js app yet:

```bash
npx create-next-app@latest . --typescript
# Choose: Tailwind CSS = yes (recommended)
```

Install dependencies:

```bash
npm install
```

### 3.1 Setup shadcn/ui

From `client/`:

```bash
npx shadcn-ui@latest init
```

Follow the prompts (components directory, style setup, etc.).

Add some base components, e.g.:

```bash
npx shadcn-ui@latest add button card input badge
```

### 3.2 Environment for API URL

Create `.env.local` in `client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
# In production, you might use: https://api.yourdomain.com
```

### 3.3 Basic API Helper

Example `client/lib/api.ts`:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI(path: string, options: RequestInit = {}) {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    next: { revalidate: 60 }, // ISR revalidation (adjust as needed)
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return res.json();
}
```

### 3.4 Run Next.js (dev mode)

```bash
npm run dev
```

- Client: `http://localhost:3000`

### 3.5 Routing (MVP)

Recommended routes:

- `/` – Home (hero, about teaser, featured portfolio, contact CTA)
- `/portfolio` – All portfolio items, with basic filters
- `/portfolio/[slug]` – Portfolio detail page
- `/about` – About (or integrated into `/`)
- `/contact` – Contact (or integrated into `/`)

---

## 🧱 Data Model (Conceptual)

### `Profile` (Single Type)

Represents the studio/brand using showfolio.

- `brandName` (string)
- `tagline` (string, localized)
- `shortIntro` (text / rich text, localized)
- `about` (rich text, localized)
- `studioNumbers` (repeatable component, optional):

  - `label` (e.g. “Projects”, “Stacks”)
  - `value` (e.g. “6+”, “4”)

- `services` (text / rich text or structured list, localized)
- `primaryCtaLabel` (string, localized)
- `secondaryCtaLabel` (string, localized)
- `socialLinks` (**repeatable `social_link` component**):

  - `label`, `platform`, `url`, `iconKey`

### `PortfolioItem` (Collection Type)

Represents each work item.

- `title` (string, localized)
- `slug` (UID)
- `workType` (enum: `real`, `concept`)
- `shortDescription` (text, localized)
- `detailedDescription` (rich text, localized)
- `problem` (text / rich text, localized)
- `solution` (text / rich text, localized)
- `role` (text, localized)
- `year` (integer)
- `portfolioType` (enum: e.g. `website`, `web_app`, `ecommerce`, etc.)
- `techTags` (**repeatable `tech_tag` component**):

  - `name`, `category`

- `isFeatured` (boolean)
- `coverImage` (media)
- `gallery` (media[], optional)
- `liveUrl` (string, optional)
- `githubUrl` (string, optional)
- `clientName` (string, optional – plain text label for client name)

### `Skill` (Collection Type, optional)

- `name` (string)
- `category` (enum: `backend`, `frontend`, `cms`, `ecommerce`, `tool`)
- `description` (text, localized)
- `order` (integer, for sorting)

---

## 🎨 Theming with shadcn/ui

showfolio uses **shadcn/ui** on top of Tailwind, with **CSS variables** as design tokens.

### 1. Design Tokens (CSS Variables)

In `client/app/globals.css` (or equivalent), follow shadcn conventions:

- Base tokens (HSL):

  - `--background`, `--foreground`
  - `--primary`, `--primary-foreground`
  - `--muted`, `--muted-foreground`
  - `--card`, `--card-foreground`
  - `--border-radius` (custom for showfolio, e.g. `1rem` or `20px`)

The **default theme** is a **dark minimal studio theme**:

- Dark page background
- Light foreground text
- A single accent `--primary` color for CTAs and highlights
- Softer `--card` background for portfolio cards and sections

shadcn/ui components (Button, Card, Badge, etc.) consume these variables automatically.

### 2. ThemeProvider & next-themes

Use [`next-themes`](https://github.com/pacocoursey/next-themes) to apply theme classes:

- A `ThemeProvider` wraps the app and sets a default theme class (e.g. `dark`).
- In `RootLayout`, wrap children in `<ThemeProvider>`.

MVP behavior:

- Default theme = **dark** (studio look).
- System theme detection and theme toggles are optional add-ons.

### 3. Future Multi-Theme Support

While MVP ships with a single theme, the setup allows:

- Defining additional theme variants:

  ```css
  .theme-minimal-dark {
    /* override tokens */
  }
  .theme-soft-light {
    /* override tokens */
  }
  ```

- Applying these classes on `<body>` manually, or later via:

  - A UI toggle, or
  - A CMS field (e.g. theme key in `Profile`) that selects which class to apply.

This means:

> You can add more themes later **without changing most components**, only the tokens.

---

## 🗺️ Roadmap (Suggested)

- [ ] Initial MVP (Strapi server + Next.js client, single studio profile)
- [ ] Create demo content (Profile, social links, a few PortfolioItems, Skills)
- [ ] Implement portfolio filters on `/portfolio` (workType, techTags, portfolioType)
- [ ] Improve SEO (OG images for portfolio items, better meta tags)
- [ ] Extract theme tokens into a clear, documented theme config
- [ ] Add contact form & email sending (server or external service)
- [ ] Add long-form content (blog / case studies)
- [ ] Add optional testimonials section

Feel free to open issues or PRs to extend this roadmap.

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. Fork the repository

2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add some feature"
   ```

4. Push the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request

Please:

- Keep the code style consistent
- Update documentation when needed
- Add short comments for non-trivial architectural decisions

---

## 📄 License

This project is licensed under the **MIT License** – see the [`LICENSE`](LICENSE) file for details.

---

## 💬 Credits

**showfolio** is built as a flexible starter for studios, agencies, and freelancers who want a clean, headless portfolio built on:

- Strapi (server)
- Next.js + Tailwind + shadcn/ui (client)

If you use it in your own studio or client work, a star on GitHub ⭐ is always appreciated!

```

Kalau kamu mau, habis ini kita bisa bikin:

- list field final untuk **component `social_link` dan `tech_tag`** persis sesuai form Strapi (step-by-step di UI), atau
- checklist TODO di GitHub Issues berdasarkan README ini.
::contentReference[oaicite:0]{index=0}
```
