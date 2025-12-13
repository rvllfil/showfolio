# Showfolio – Portfolio Platform with Strapi CMS

Modern portfolio platform powered by Strapi CMS and Next.js. All content is managed through CMS without coding.

---

## 📖 About Showfolio

**Showfolio** is a production-ready portfolio solution that separates content from code. Everything visible on the frontend — from navigation labels to project details — is managed through the Strapi CMS admin panel.

**Perfect for:**

- Freelancers who want a professional portfolio
- Developers showcasing their projects
- Anyone who wants a customizable CMS-driven portfolio

---

## ✨ Features

✅ **CMS-Managed Content**

- All sections (Hero, About, Services, Skills, Projects, Testimonials, Contact) from Strapi
- Customizable navigation and footer labels
- Profile info, job title, avatar, and favicon from CMS

✅ **Portfolio Management**

- Create and manage unlimited projects
- Upload project images and thumbnails
- Add tech stack tags, live URLs, and GitHub links
- Mark featured projects to display on homepage

✅ **Modern UI/UX**

- Responsive design (mobile, tablet, desktop)
- Dark / Light mode toggle
- Smooth animations with Framer Motion
- Professional design with Tailwind CSS

✅ **SEO & Performance**

- Dynamic metadata from CMS
- Server-side rendering with Next.js
- Optimized images
- Fast page loads

---

## 🛠️ Tech Stack

**Frontend:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion  
**Backend:** Strapi v5.31, PostgreSQL 15, TypeScript  
**Infrastructure:** Docker & Docker Compose, Node.js v20

---

## 📁 Project Structure

```
showfolio/
├── client/                   # Next.js frontend
│   ├── app/                 # Pages & components
│   ├── lib/                 # API helpers & types
│   └── Dockerfile           # Frontend build config
├── server/                   # Strapi CMS backend
│   ├── src/api/             # Content-types & routes
│   ├── config/              # Strapi configuration
│   └── Dockerfile           # Backend build config
├── docker-compose.yml       # Production deployment
├── docker-compose.dev.yml   # Development mode
├── docker-compose.build.yml # Build images
└── README.md
```

---

## 🚀 Quick Start

### Option 1: Development Mode (Recommended for Local)

Development mode with hot-reload for local development.

```bash
# 1. Clone repository
git clone https://github.com/rvllfil/showfolio.git
cd showfolio

# 2. Start development containers
docker compose -f docker-compose.dev.yml up -d

# 3. Wait for services to be ready (~2 minutes)
docker compose -f docker-compose.dev.yml logs -f

# 4. Access the application
# Frontend: http://localhost:3000
# Strapi Admin: http://localhost:1337/admin
```

**First time setup:**

1. Open http://localhost:1337/admin
2. Create your first admin user
3. Login and start adding content in Content Manager

**Stop containers:**

```bash
docker compose -f docker-compose.dev.yml down
```

---

### Option 2: Production Deployment via Docker Hub

This workflow allows you to build images locally (or on a powerful machine) and deploy to any server including low-spec VPS (2GB RAM) without building on the server itself.

**Important:** Docker images are built with the exact package versions from `package.json` and `package-lock.json`. To ensure latest security patches are installed, update packages before building:

```bash
# Update client packages
cd client && npx npm-check-updates -u && npm install && cd ..

# Update server packages  
cd server && npx npm-check-updates -u && npm install && cd ..
```

#### Step 1: Build Images Locally (One-time Setup)

On your local machine with sufficient resources:

```bash
# 1. Clone repository
git clone https://github.com/rvllfil/showfolio.git
cd showfolio

# 2. Configure environment
cp .env.example .env
# Edit .env and set DOCKER_USERNAME=your_dockerhub_username

# 3. Login to Docker Hub
docker login
# Enter your Docker Hub username and password

# 4. Build the images (using helper script)
./build-images.sh

# Or manually:
# DOCKER_USERNAME=your_username docker compose -f docker-compose.build.yml build

# This will take 10-15 minutes. Docker will:
# - Build Strapi backend (with 1.5GB memory for build)
# - Build Next.js frontend (with 512MB memory for build)
# - Create optimized production images

# 5. Push images to Docker Hub
docker compose -f docker-compose.build.yml push

# Your images are now available at:
# - YOUR_USERNAME/showfolio-server:latest
# - YOUR_USERNAME/showfolio-client:latest
```

**Why this workflow?**

- ✅ Build on powerful machine (16GB+ RAM recommended)
- ✅ Deploy to any server (even 2GB VPS)
- ✅ No build process on production server
- ✅ Fast deployment (just pull pre-built images)
- ✅ Consistent builds across environments

#### Step 2: Deploy to Production Server/VPS

On your production server (can be low-spec like 2GB RAM):

```bash
# 1. Install Docker on server
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt install docker-compose-plugin

# 2. Clone repository
git clone https://github.com/rvllfil/showfolio.git
cd showfolio

# 3. Set your Docker Hub username
export DOCKER_USERNAME=your_dockerhub_username

# 4. Pull pre-built images from Docker Hub
docker compose pull

# This downloads your pre-built images (no building!)
# Takes 2-3 minutes depending on connection

# 5. Start production containers
docker compose up -d

# 6. Check status
docker compose ps

# All services should show "Up" status
```

#### Step 3: Access Your Portfolio

```bash
# On server, get your IP address
ip addr show | grep inet

# Access via browser:
# Frontend: http://YOUR_SERVER_IP:3000
# Strapi Admin: http://YOUR_SERVER_IP:1337/admin
```

**First time setup on production:**

1. Open `http://YOUR_SERVER_IP:1337/admin`
2. Create admin user
3. Add your content (Profile, Projects, etc.)
4. Set permissions (Settings → Roles → Public)

#### Step 4: Update/Redeploy

When you make changes and want to redeploy:

```bash
# On local machine:
docker compose -f docker-compose.build.yml build
docker compose -f docker-compose.build.yml push

# On production server:
docker compose pull
docker compose up -d
```

#### Using Demo Images (Quick Test)

If you want to quickly test the application without building:

```bash
# 1. Clone repository
git clone https://github.com/rvllfil/showfolio.git
cd showfolio

# 2. Set Docker Hub username (use your own or leave empty for demo)
export DOCKER_USERNAME=your_dockerhub_username

# 3. Pull and run
docker compose pull
docker compose up -d
```

---

## 🎨 Setup Content in Strapi

### 1. Login to Admin Panel

Access http://localhost:1337/admin and create admin user.

### 2. Setup Profile (Single Type)

Go to **Content Manager → Profile** and fill in:

**Basic Info:**

- `brandName`: Your brand/name (e.g., "rvllfil")
- `title`: Job title (e.g., "Full Stack Developer")
- `tagline`: Short tagline
- `shortInfo`: Short description for hero section

**About Section:**

- `about`: Paragraphs about you (Rich Text Editor)
- `whatIDoList`: List of your skills in this format:
  ```
  - Landing Page Development: Fast, responsive landing pages
  - Web App & Dashboard: Internal dashboards with Laravel backend
  - Shopify Storefront: Theme setup and customization
  - Strapi CMS: Content management solutions
  ```

**Media:**

- `lightLogo`: Logo for light mode (format: PNG/SVG)
- `darkLogo`: Logo for dark mode
- `profileImage`: Your profile photo
- `favicon`: Icon for browser tab

**Social Links (Component):**
Add social media links:

- `label`: Platform name (e.g., "GitHub")
- `url`: Your profile URL
- `iconKey`: Icon key (github, linkedin, twitter, instagram, facebook, email, website)

**Portfolio Numbers (Component):**
Statistics for About section:

- `label`: Label (e.g., "Years Experience")
- `value`: Value (e.g., "3+")

**Save & Publish!**

### 3. Setup Portfolios (Collection Type)

Go to **Content Manager → Portfolios** and create projects:

- `title`: Project title
- `slug`: URL-friendly slug (auto-generated)
- `description`: Project description (Rich Text)
- `year`: Project year
- `category`: Category (Web Development, Mobile App, etc.)
- `isFeatured`: Toggle to display on homepage
- `thumbnail`: Thumbnail image for list view
- `coverImage`: Cover image for detail page
- `images`: Multiple images for gallery
- `techTags` (Component): Tech stack used
  - `name`: Technology name (e.g., "React")
- `liveUrl`: Live project URL
- `githubUrl`: GitHub repository

**Save & Publish each project!**

### 4. Setup Permissions (IMPORTANT!)

To allow frontend to access data:

1. Go to **Settings → Users & Permissions Plugin → Roles**
2. Click **Public**
3. Enable permissions for:
   - **Portfolio**: `find`, `findOne`
   - **Profile**: `find`
   - **Skill**: `find`, `findOne`
   - **Service**: `find`, `findOne`
   - **Testimonial**: `find`, `findOne`
4. **Save**

Without setting up permissions, frontend will display default/fallback data.

---

## 🔧 Configuration

### Environment Variables

**Development** - Already configured in docker-compose files, no need to edit.

**Production** - For deploying to a custom domain, create `.env` file:

```bash
# Database
POSTGRES_DB=showfolio
POSTGRES_USER=showfolio
POSTGRES_PASSWORD=your_secure_password

# Strapi
APP_KEYS=generate_random_keys_here
API_TOKEN_SALT=generate_random_salt
ADMIN_JWT_SECRET=generate_random_secret
TRANSFER_TOKEN_SALT=generate_random_salt
JWT_SECRET=generate_random_secret

# Production URLs
APP_URL=https://yourdomain.com
ADMIN_URL=https://yourdomain.com/admin
NEXT_PUBLIC_API_URL=https://yourdomain.com
API_URL=http://server:1337

# CORS
CORS_ORIGINS=https://yourdomain.com
```

**Generate secrets:**

```bash
# Generate random keys for Strapi
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📝 Useful Commands

```bash
# Development
docker compose -f docker-compose.dev.yml up -d    # Start dev mode
docker compose -f docker-compose.dev.yml down     # Stop dev mode
docker compose -f docker-compose.dev.yml logs -f  # View logs

# Production
docker compose up -d                   # Start production
docker compose down                    # Stop production
docker compose ps                      # Check status
docker compose logs -f                 # View logs

# Build images
docker compose -f docker-compose.build.yml build  # Build
docker compose -f docker-compose.build.yml push   # Push to Docker Hub

# Restart specific service
docker compose restart client          # Restart frontend
docker compose restart server          # Restart Strapi

# Database backup (production)
docker compose exec db pg_dump -U showfolio showfolio > backup.sql

# Database restore
docker compose exec -T db psql -U showfolio showfolio < backup.sql
```

---

## 🐛 Troubleshooting

### Frontend cannot fetch data from Strapi

**Solution:**

1. Check Strapi API: `curl http://localhost:1337/api/profile?populate=*`
2. Ensure permissions are set in Strapi Admin (Settings → Roles → Public)
3. Restart client: `docker compose restart client`

### Logo not showing / reversed

**Solution:**

1. Open Strapi Admin → Content Manager → Profile
2. Ensure `lightLogo` contains logo for light mode
3. Ensure `darkLogo` contains logo for dark mode
4. Save & Publish

### Brand name not showing

**Solution:**

1. Fill in `brandName` field in Strapi Admin → Profile
2. Save & Publish
3. Refresh browser

### Container cannot start / error

**Solution:**

```bash
# Stop all containers
docker compose down

# Clean up volumes (WARNING: this deletes database!)
docker compose down -v

# Rebuild and restart
docker compose up -d --build
```

### Port already in use

**Solution:**

```bash
# Check process using port
sudo lsof -i :3000  # Frontend
sudo lsof -i :1337  # Strapi
sudo lsof -i :5432  # PostgreSQL

# Kill process or change port in docker-compose.yml
```

---

## 📦 Deploy to VPS/Server

### Requirements

- VPS with minimum 2GB RAM
- Docker & Docker Compose installed
- Domain (optional, can use IP)

### Steps

```bash
# 1. On server, install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 2. Install Docker Compose
sudo apt install docker-compose-plugin

# 3. Clone repository
git clone https://github.com/rvllfil/showfolio.git
cd showfolio

# 4. Create .env file (optional for custom config)
# Copy example above and adjust

# 5. Pull images and start
docker compose pull
docker compose up -d

# 6. Setup Strapi admin
# Open http://your-server-ip:1337/admin
# Create admin user and add content

# 7. Setup reverse proxy (Nginx/Caddy) for custom domain
```

### Nginx Config Example

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Strapi Admin & API
    location /admin {
        proxy_pass http://localhost:1337/admin;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:1337/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    location /uploads {
        proxy_pass http://localhost:1337/uploads;
    }
}
```

---

## 🤝 Contributing

Contributions welcome! Feel free to create issues or pull requests.

---

## 📄 License

MIT License - free to use for personal and commercial projects.

---

## 💬 Support

If you have questions or need help:

- Create an issue on GitHub
- Contact: [your-email@domain.com]

---

**Built with ❤️ using Next.js & Strapi**
