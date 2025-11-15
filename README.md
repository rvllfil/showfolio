# showfolio

**showfolio** is an open-source, headless portfolio starter kit built with **Next.js** and **Strapi**.
It’s designed for studios, agencies, and freelancers who want a reusable, multi-brand portfolio system that’s easy to customize and deploy.

With showfolio, you can:

- Showcase **real** and **concept** work in a clean, minimal layout
- Manage content through **Strapi** (Portfolio Items, Brands, Skills, Tech Tags, etc.)
- Support **multiple brands** using the same backend
- Use **Next.js** for a fast, SEO-friendly frontend
- Prepare for **theming** in the future (dark/light/custom themes)

---

## ✨ Features

- 🧱 **Headless portfolio system** – Strapi as API (**server**), Next.js as frontend (**client**)
- 🏷️ **Portfolio items** – Real work and concept work, with tags and types
- 🏢 **Brand support** – One or many brands (e.g. multiple studios, client-facing portfolios)
- 🧩 **Tech tags & skills** – Reusable tech stack labels and capability descriptions
- 🌍 **Multi-language ready** – Built to work with Strapi i18n (e.g. `en`, `id`)
- 🎯 **SEO-friendly** – Clean URLs, SSR/SSG with Next.js
- 🎨 **Theme-ready** – Uses design tokens / CSS variables so themes can be added later
- 🚀 **Open source** – Free to use, extend, and contribute

---

## 🧰 Tech Stack

**Client (frontend)**

- [Next.js](https://nextjs.org/)
- React
- (Optional) Tailwind CSS or your CSS framework of choice

**Server (API / CMS)**

- [Strapi](https://strapi.io/) (v4+)
- Node.js
- Database: SQLite (dev) / PostgreSQL / MySQL (prod)

---

## 📁 Project Structure

Recommended monorepo structure using **server** and **client**:

````bash
showfolio/
├── server/              # Strapi (API / CMS)
│   ├── src/
│   ├── config/
│   ├── package.json
│   └── README.md
├── client/              # Next.js app
│   ├── app/ or pages/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── README.md
├── docker-compose.yml   # (optional) docker setup
├── .gitignore
├── README.md            # this file
└── LICENSE

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Git
- (Optional for prod) PostgreSQL / MySQL, Docker, Nginx

---

## 2. Server (Strapi) Setup

From the project root:

```bash
cd server
npm install
````

> If you haven’t created the Strapi app yet, you can scaffold it with:
>
> ```bash
> npx create-strapi-app@latest . --quickstart
> ```

### 2.1 Environment

For development, you can use the default SQLite database.

Create a `.env` file in `server/` (or use Strapi’s default):

```env
# Example (adjust as needed)
APP_KEYS=someRandomAppKey,someOtherKey
API_TOKEN_SALT=someRandomSalt
ADMIN_JWT_SECRET=someRandomSecret
JWT_SECRET=someRandomJwtSecret

# DB (for SQLite dev, Strapi can auto-configure)
# For Postgres/MySQL, configure in config/database.ts or via env
```

### 2.2 Run Strapi (dev mode)

```bash
npm run develop
```

- Strapi admin will be available at: `http://localhost:1337/admin`
- Create your admin user on first launch.

### 2.3 Content Types (overview)

showfolio uses these core content types:

- **Single Types**

  - `Profile` – Brand name, tagline, about, services, CTAs, etc.
  - `ContactSettings` – Email, WhatsApp, social links, contact note.

- **Collection Types**

  - `Brand` – Brand/studio identity (supports multi-brand).
  - `PortfolioItem` – Each portfolio entry (real or concept work).
  - `TechTag` – Tech stack tags (Laravel, Next.js, Strapi, Shopify, etc.).
  - `Skill` (optional) – Capabilities grouped by category.

> Make sure to enable **i18n** in Strapi if you want multi-language content.

### 2.4 API Permissions

In Strapi admin:

1. Go to **Settings → Users & Permissions Plugin → Roles → Public**
2. Enable `find` / `findOne` for:

   - `PortfolioItem`
   - `Brand`
   - `TechTag`
   - `Profile`
   - `ContactSettings`

3. Save your changes.

---

## 3. Client (Next.js) Setup

From the project root:

```bash
cd client
npm install
```

> If you haven’t created the Next.js app yet, you can scaffold it with:
>
> ```bash
> npx create-next-app@latest . --typescript
> ```

### 3.1 Environment

Create `.env.local` in `client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
# e.g. in production: https://api.yourdomain.com
```

(Optional) Add any extra env variables you need later for analytics, etc.

### 3.2 Run Next.js (dev mode)

```bash
npm run dev
```

- Client will be available at: `http://localhost:3000`

### 3.3 Routing (MVP)

Default routes:

- `/` – Home (hero, about, featured portfolio, contact CTA)
- `/portfolio` – All portfolio items, with filters
- `/portfolio/[slug]` – Portfolio item detail
- `/about` – About page (or simply a section on `/`)
- `/contact` – Contact page (or section)

---

## 🧱 Data Model (Conceptual)

### Brand

Represents a studio/identity.

- `name`, `slug`, `description`, `website`, `logo`
- (Future) link to `Theme`

### PortfolioItem

Represents a piece of work.

- `title`, `slug`
- `workType` (`real` | `concept`)
- `shortDescription`, `detailedDescription`
- `problem`, `solution`
- `role`
- `year`
- `portfolioType` (`website` | `web_app` | `ecommerce` | …)
- `techTags` (many-to-many)
- `isFeatured` (boolean)
- `coverImage`, `gallery`
- `liveUrl`, `githubUrl`
- `brand` (relation → `Brand`)

### TechTag

Reusable technology labels.

- `name`, `slug`, `category` (frontend/backend/cms/ecommerce/tool)

---

## 🎨 Theming (Future)

MVP is **theme-ready**, but only ships with a default theme.

- Uses **CSS variables / design tokens** for colors, card backgrounds, border radius, etc.
- Components should use semantic classes (e.g. `bg-page`, `text-page`) instead of hardcoded colors.

Planned extension:

- Add `Theme` collection type in Strapi:

  - `primaryColor`, `backgroundColor`, `textColor`, `cardColor`, `radius`, etc.
  - Link `Brand` → `Theme` to have per-brand themes.

---

## 🗺️ Roadmap (suggested)

- [ ] Initial MVP (Strapi server + Next.js client, single brand)
- [ ] Demo content for a sample studio brand
- [ ] Basic filters on `/portfolio` (type, tech stack, portfolio type)
- [ ] Improve SEO (OG images for portfolio items)
- [ ] Add theme system (code-based, then CMS-driven)
- [ ] Add contact form (email sending)
- [ ] Add blogging / case study support (optional)

Feel free to open issues or PRs to extend this roadmap.

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please try to:

- Keep the code style consistent
- Update documentation where needed
- Add small notes to explain bigger architectural decisions

---

## 📄 License

This project is licensed under the **MIT License** – see the [`LICENSE`](LICENSE) file for details.

---

## 💬 Credits

showfolio is built as a flexible starter for studios, agencies, and freelancers who want a clean, headless portfolio built on **Next.js + Strapi**.

If you use it in your own studio or client work, a star on GitHub ⭐ is always appreciated!

```

```

# showfolio
