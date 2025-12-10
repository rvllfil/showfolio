# Showfolio - Professional Portfolio Landing Page

A modern, production-ready portfolio landing page built with Next.js 16, TypeScript, Tailwind CSS v4, and Strapi CMS integration. Features smooth animations, dark/light themes, and responsive design.

## ✨ Features

### Landing Page

- **Hero Section** - Animated introduction with stats display from Strapi
- **About Section** - Personal information with expandable content
- **Services Section** - Showcase your offerings with animated cards
- **Projects Section** - Featured projects with hover effects
- **Skills Section** - Technology stack display
- **Testimonials Section** - Client testimonials carousel
- **Contact Section** - Call-to-action with contact information
- **Footer** - Social links, navigation, and copyright

### Portfolio Pages

- **Portfolio List** - Filterable by project type and technology
- **Project Details** - Full project showcase with hero images, tech stack, and descriptions

### Technical Features

- 🎨 Dark/Light theme with smooth transitions
- 📱 Fully responsive design (mobile, tablet, desktop)
- ✨ Framer Motion animations throughout
- 🚀 Next.js App Router with Server Components
- 📊 Real Strapi CMS integration
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS v4 for styling
- ♿ Accessible components
- 🔍 SEO optimized with metadata

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Strapi backend running (see server folder)

### Installation

1. **Install dependencies:**

```bash
cd client
npm install
```

2. **Set up environment variables:**
   Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
client/
├── app/
│   ├── components/       # React components
│   │   ├── navbar.tsx           # Navigation with mobile menu
│   │   ├── hero-section.tsx     # Hero with animations
│   │   ├── about-section.tsx    # About section
│   │   ├── services-section.tsx # Services showcase
│   │   ├── projects-section.tsx # Featured projects
│   │   ├── skills-section.tsx   # Skills display
│   │   ├── testimonials-section.tsx # Testimonials
│   │   ├── contact-section.tsx  # Contact CTA
│   │   ├── footer.tsx           # Site footer
│   │   └── ui/                  # UI components
│   ├── portfolio/        # Portfolio pages
│   │   ├── page.tsx             # Portfolio list with filters
│   │   ├── portfolio-client.tsx # Client component for filtering
│   │   └── [slug]/page.tsx      # Project detail page
│   ├── layout.tsx        # Root layout with theme provider
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── lib/
│   ├── api.ts            # Strapi API functions
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── strapi-helpers.tsx # Strapi block rendering
└── public/               # Static assets
```

## 🎨 Customization

### Theme Colors

Tailwind colors are defined using CSS variables in `globals.css`:

- Modify the `:root` and `.dark` selectors to change theme colors
- Colors use HSL format for easy customization

### Strapi Content

The portfolio uses these Strapi content types:

- **Profile** (Single Type) - Personal info, brand name, tagline, social links
- **Portfolio** (Collection) - Project details, images, tech stack
- **Skill** (Collection) - Skills and technologies

### Components

All components are modular and can be:

- Removed from `app/page.tsx` if not needed
- Customized by editing the component files
- Reordered in the main page layout

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📦 Key Dependencies

- **Next.js 16.0.3** - React framework
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion 12** - Animation library
- **next-themes 0.4.6** - Theme management
- **lucide-react** - Icon library

## 🎯 Features by Section

### Navbar

- Sticky header with backdrop blur
- Mobile hamburger menu with animations
- Theme toggle (light/dark)
- Smooth scroll to sections
- Active section highlighting

### Hero Section

- Animated text with stagger effects
- Statistics display from Strapi
- Floating animated elements
- Browser mockup card with gradient
- CTA buttons

### Services Section

- 4 default services (customizable via Strapi)
- Animated cards with hover effects
- Icon integration
- Responsive grid layout

### Projects Section

- Featured projects from Strapi
- Hover overlays with links
- Tech tags display
- Portfolio type badges
- Animated grid with Framer Motion

### Portfolio List Page

- Filter by project type
- Filter by technology
- Animated project cards
- Mobile-friendly filter toggle
- Empty state handling

### Project Detail Page

- Full-width hero image
- Quick info cards (Role, Client, Year)
- Tech stack showcase
- Rich text content rendering
- Live site and GitHub links
- Back navigation

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
npm run start
```

## 📝 Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:1337/api

# Optional (for production)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🤝 Contributing

This is a portfolio template. Feel free to:

- Fork and customize for your own use
- Report bugs via issues
- Suggest improvements

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Acknowledgments

- Built with Next.js and Strapi
- Icons from Lucide React
- Animations powered by Framer Motion
- Styled with Tailwind CSS

---

**Ready to showcase your work?** 🚀

For questions or support, check the documentation or open an issue.
