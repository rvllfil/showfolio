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

✅ **CMS-Managed Content** - All sections managed through Strapi  
✅ **Portfolio Management** - Create and manage unlimited projects  
✅ **Modern UI/UX** - Responsive design with dark/light mode  
✅ **SEO & Performance** - Server-side rendering with Next.js

---

## 🛠️ Tech Stack

**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion  
**Backend:** Strapi v5.32, PostgreSQL 15, TypeScript  
**Infrastructure:** Docker & Docker Compose, Node.js v20

---

## 📁 Project Structure

```
showfolio/
├── .env.example             # Environment variables template
├── docker-compose.yml       # Production deployment (pull images)
├── docker-compose.dev.yml   # Development mode (with hot-reload)
├── docker-compose.build.yml # Build images for Docker Hub
├── build-images.sh          # Helper script to build images
├── client/                  # Next.js frontend
│   ├── app/                 # Pages & components
│   ├── lib/                 # API helpers & types
│   ├── Dockerfile           # Production build config
│   └── Dockerfile.dev       # Development build config
└── server/                  # Strapi CMS backend
    ├── src/api/             # Content-types & routes
    ├── config/              # Strapi configuration
    ├── Dockerfile           # Production build config
    └── Dockerfile.dev       # Development build config
```

---

## 🚀 Getting Started

### Prerequisites

- **Docker & Docker Compose** installed ([Install Docker](https://docs.docker.com/get-docker/))
- **Docker Hub account** (only if you want to build and push your own images)

---

## 📋 Environment Variables Setup

Before running Showfolio, you need to configure environment variables. **You only need ONE `.env` file** in the root directory.

### Step 1: Copy Environment Template

```bash
cp .env.example .env
```

### Step 2: Understand .env Variables

The `.env` file contains all configuration. Here's what each section means:

#### **🔧 For Local Development (docker-compose.dev.yml)**

You can keep all default values - they work out of the box:

```bash
# Database - defaults are fine for local
POSTGRES_DB=showfolio
POSTGRES_USER=showfolio
POSTGRES_PASSWORD=showfolio

# Strapi URLs - localhost for local development
APP_URL=http://localhost:1337
ADMIN_URL=http://localhost:1337/admin
NEXT_PUBLIC_API_URL=http://localhost:1337
API_URL=http://server:1337

# Security keys - defaults OK for local (change for production!)
APP_KEYS=toBeModified1,toBeModified2,toBeModified3,toBeModified4
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
```

**For local development, you don't need to change anything!**

#### **🏭 For Production Deployment**

For production, you MUST change security keys:

```bash
# Generate secure random keys (run this 5 times for each key):
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Update these in .env:
APP_KEYS=<key1>,<key2>,<key3>,<key4>
API_TOKEN_SALT=<random_key>
ADMIN_JWT_SECRET=<random_key>
TRANSFER_TOKEN_SALT=<random_key>
JWT_SECRET=<random_key>
```

And update URLs to your domain or server IP:

```bash
# Replace with your domain or VPS IP
APP_URL=http://YOUR_SERVER_IP:1337
ADMIN_URL=http://YOUR_SERVER_IP:1337/admin
NEXT_PUBLIC_API_URL=http://YOUR_SERVER_IP:1337
API_URL=http://server:1337  # Keep this as-is (internal Docker network)
CORS_ORIGINS=http://YOUR_SERVER_IP:3000,http://YOUR_SERVER_IP:1337
```

#### **🐳 For Building Docker Images**

Only needed if you want to build and push images to Docker Hub:

```bash
# Your Docker Hub username
DOCKER_USERNAME=your_dockerhub_username
```

---

## 🎯 Usage Scenarios

Choose the scenario that fits your needs:

### Scenario A: Local Development (Recommended for Beginners)

**Perfect for:** Testing locally, developing features, learning the platform

#### Step 1: Clone Repository

```bash
git clone https://github.com/rvllfil/showfolio.git
cd showfolio
```

#### Step 2: Setup Environment (Optional for Local)

```bash
# Copy environment template (optional - default values work fine)
cp .env.example .env

# You can use it as-is for local development
```

#### Step 3: Start Development Mode

```bash
# Start all services (database, Strapi, Next.js) with hot-reload
docker compose -f docker-compose.dev.yml up -d

# This will:
# - Download required images (postgres, node)
# - Build client and server in development mode
# - Start all containers
# Takes about 2-3 minutes on first run
```

#### Step 4: Wait for Services to Start

```bash
# Watch logs to see when services are ready
docker compose -f docker-compose.dev.yml logs -f

# Wait for these messages:
# ✔ Server: "Server started on port 1337"
# ✔ Client: "ready started server on 0.0.0.0:3000"
# Press Ctrl+C to exit logs (containers keep running)
```

#### Step 5: Access Your Portfolio

Open in browser:

- **Frontend:** http://localhost:3000
- **Strapi Admin:** http://localhost:1337/admin

#### Step 6: First Time Setup

1. Open http://localhost:1337/admin
2. **Create your first admin user:**
   - First name
   - Last name
   - Email
   - Password (minimum 8 characters)
3. Click **"Let's start"**
4. You're in! Now you can add content

#### Step 7: Add Content (See "Content Setup Guide" below)

Go to **Content Manager** and fill in:

- **Profile** - Your personal info, logo, social links
- **Portfolios** - Your projects
- **Skills**, **Services**, **Testimonials** (optional)

#### Step 8: Set Permissions (IMPORTANT!)

For the frontend to display your content:

1. Go to **Settings** (left sidebar)
2. Click **Users & Permissions Plugin → Roles**
3. Click **Public**
4. Expand each content type and check these boxes:
   - **Portfolio:** `find`, `findOne`
   - **Profile:** `find`
   - **Skill:** `find`, `findOne`
   - **Service:** `find`, `findOne`
   - **Testimonial:** `find`, `findOne`
5. Click **Save** (top right)

#### Development Commands

```bash
# View logs
docker compose -f docker-compose.dev.yml logs -f

# Stop containers
docker compose -f docker-compose.dev.yml down

# Restart a specific service
docker compose -f docker-compose.dev.yml restart client  # Frontend
docker compose -f docker-compose.dev.yml restart server  # Strapi

# Clean restart (removes database - be careful!)
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d
```

**Hot Reload:** Code changes in `client/` and `server/` will automatically reload!

---

### Scenario B: Quick Test with Pre-built Images

**Perfect for:** Quick testing without building images yourself

If you just want to test the platform without building Docker images:

```bash
# 1. Clone repository
git clone https://github.com/rvllfil/showfolio.git
cd showfolio

# 2. Setup environment
cp .env.example .env
# Edit .env and set DOCKER_USERNAME to someone who has pushed images
# Or use default if available

# 3. Pull pre-built images and start
docker compose pull
docker compose up -d

# 4. Access
# Frontend: http://localhost:3000
# Strapi Admin: http://localhost:1337/admin
```

**Note:** You need pre-built images available on Docker Hub for this to work.

---

### Scenario C: Production Deployment (2GB VPS Ready!)

**Perfect for:** Deploying to VPS/server without building on the server itself

This is the **recommended workflow** for production deployment. You build images on your powerful local machine, push to Docker Hub, then pull and run on any server (even 2GB RAM VPS).

#### Why This Approach?

✅ **No building on VPS** - just pull pre-built images  
✅ **Works on 2GB RAM** - building requires 16GB, running needs only 2GB  
✅ **Fast deployment** - pull images in minutes instead of building for hours  
✅ **Consistent builds** - same image everywhere

---

## 🔨 PART 1: Build Images Locally (One-Time Setup)

Do this on your **local machine** or any machine with **16GB+ RAM**.

### Step 1: Ensure Latest Packages (Recommended)

Before building, update to latest packages for security patches:

```bash
cd showfolio

# Update client dependencies
cd client
npx npm-check-updates -u
npm install
cd ..

# Update server dependencies
cd server
npx npm-check-updates -u
npm install
cd ..

```

This updates `package.json` and `package-lock.json` to latest versions.

### Step 2: Configure Docker Hub Username

```bash
# Copy environment template
cp .env.example .env

# Edit .env file and set your Docker Hub username
nano .env  # or use any text editor

# Change this line:
# DOCKER_USERNAME=your_dockerhub_username
# To:
DOCKER_USERNAME=your_actual_username
```

### Step 3: Login to Docker Hub

```bash
docker login

# Enter your Docker Hub username
# Enter your Docker Hub password or access token
# You should see: "Login Succeeded"
```

Don't have a Docker Hub account? [Create one for free](https://hub.docker.com/signup)

### Step 4: Build Docker Images

**Option A: Using Helper Script (Recommended)**

```bash
./build-images.sh

# This script will:
# ✓ Load DOCKER_USERNAME from .env
# ✓ Build both client and server images
# ✓ Tag them properly for Docker Hub
# ✓ Show you the push command when done
```

**Option B: Manual Build**

```bash
# Set Docker Hub username
export DOCKER_USERNAME=your_username

# Build images (takes 10-15 minutes)
docker compose -f docker-compose.build.yml build

# What happens during build:
# 1. Server (Strapi):
#    - Installs dependencies
#    - Builds admin panel (uses 1.5GB RAM)
#    - Creates optimized production image
#
# 2. Client (Next.js):
#    - Installs dependencies
#    - Builds Next.js app (uses 512MB RAM)
#    - Creates optimized production image
```

Build typically takes:

- **First time:** 10-15 minutes
- **Subsequent builds:** 5-8 minutes (with cache)

### Step 5: Push Images to Docker Hub

```bash
docker compose -f docker-compose.build.yml push

# This uploads:
# - your_username/showfolio-server:latest (~1.1GB)
# - your_username/showfolio-client:latest (~1.3GB)
#
# Takes 5-10 minutes depending on your internet speed
```

### Step 6: Verify Images on Docker Hub

Visit https://hub.docker.com/u/your_username and you should see:

- `showfolio-server:latest`
- `showfolio-client:latest`

**✅ Build phase complete!** Your images are now ready to deploy anywhere.

---

## 🚀 PART 2: Deploy to Production Server/VPS

Do this on your **VPS/production server** (can be as low as **2GB RAM**).

### Step 1: Install Docker on Server

Connect to your VPS via SSH, then:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Verify installation
docker --version
docker compose version

# Add your user to docker group (optional - to run without sudo)
sudo usermod -aG docker $USER
# Log out and back in for this to take effect
```

### Step 2: Clone Repository on Server

```bash
# Clone repository
git clone https://github.com/rvllfil/showfolio.git
cd showfolio
```

### Step 3: Configure Environment for Production

```bash
# Copy environment template
cp .env.example .env

# Edit .env file
nano .env
```

**Required changes for production:**

```bash
# 1. Set your Docker Hub username
DOCKER_USERNAME=your_dockerhub_username

# 2. Generate secure keys (run this command 5 times for each key)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 3. Update these values in .env:
APP_KEYS=<generated_key1>,<generated_key2>,<generated_key3>,<generated_key4>
API_TOKEN_SALT=<generated_key>
ADMIN_JWT_SECRET=<generated_key>
TRANSFER_TOKEN_SALT=<generated_key>
JWT_SECRET=<generated_key>
ENCRYPTION_KEY=<generated_key>

# 4. Change database password
POSTGRES_PASSWORD=your_secure_database_password
DATABASE_PASSWORD=your_secure_database_password

# 5. Update URLs to your server IP or domain
# Get your server IP:
curl ifconfig.me

# Then update:
APP_URL=http://YOUR_SERVER_IP:1337
ADMIN_URL=http://YOUR_SERVER_IP:1337/admin
NEXT_PUBLIC_API_URL=http://YOUR_SERVER_IP:1337
CORS_ORIGINS=http://YOUR_SERVER_IP:3000,http://YOUR_SERVER_IP:1337
```

Save and exit (`Ctrl+X`, then `Y`, then `Enter`)

### Step 4: Pull Pre-built Images from Docker Hub

```bash
# Load DOCKER_USERNAME from .env and pull images
export $(grep '^DOCKER_USERNAME=' .env | xargs)
docker compose pull

# This downloads your pre-built images:
# ✓ postgres:15-alpine (~80MB)
# ✓ your_username/showfolio-server:latest (~1.1GB)
# ✓ your_username/showfolio-client:latest (~1.3GB)
#
# Takes 3-5 minutes depending on internet speed
# NO BUILDING happens on the server!
```

### Step 5: Start Production Services

```bash
# Start all containers in background
docker compose up -d

# This starts:
# ✓ Database (PostgreSQL)
# ✓ Strapi backend
# ✓ Next.js frontend
#
# Takes about 30-60 seconds to fully start
```

### Step 6: Verify Services are Running

```bash
# Check container status
docker compose ps

# You should see all services "Up":
# NAME                    STATUS
# showfolio-client        Up
# showfolio-strapi        Up
# showfolio-db            Up

# View logs
docker compose logs -f

# Press Ctrl+C to exit logs (containers keep running)
```

### Step 7: Access Your Production Portfolio

Get your server IP:

```bash
curl ifconfig.me
```

Open in browser:

- **Frontend:** `http://YOUR_SERVER_IP:3000`
- **Strapi Admin:** `http://YOUR_SERVER_IP:1337/admin`

### Step 8: First Time Setup (Production)

1. Open `http://YOUR_SERVER_IP:1337/admin`
2. Create your admin user (this is production - use a strong password!)
3. Add your content (see "Content Setup Guide" below)
4. Set permissions (Settings → Roles → Public → enable all content types)

### Step 9: (Optional) Setup Domain with Nginx

To use a custom domain like `yourportfolio.com`:

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx config
sudo nano /etc/nginx/sites-available/showfolio
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name yourportfolio.com www.yourportfolio.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Strapi Admin
    location /admin {
        proxy_pass http://localhost:1337/admin;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
    }

    # Strapi API
    location /api {
        proxy_pass http://localhost:1337/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # Uploads
    location /uploads {
        proxy_pass http://localhost:1337/uploads;
    }
}
```

Enable and restart Nginx:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/showfolio /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Update .env with your domain
nano .env
# Change:
# APP_URL=https://yourportfolio.com
# NEXT_PUBLIC_API_URL=https://yourportfolio.com
# CORS_ORIGINS=https://yourportfolio.com

# Restart containers to apply changes
docker compose restart
```

**For HTTPS (SSL):**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourportfolio.com -d www.yourportfolio.com

# Auto-renewal is configured automatically
```

---

## 🔄 Updating Your Deployment

When you want to update your production site with new code or content:

### On Local Machine (Build & Push)

```bash
cd showfolio

# 1. Make your changes (code, content, etc.)

# 2. Update packages (optional)
cd client && npx npm-check-updates -u && npm install && cd ..
cd server && npx npm-check-updates -u && npm install && cd ..

# 3. Rebuild images
./build-images.sh
# or manually:
# export $(grep '^DOCKER_USERNAME=' .env | xargs)
# docker compose -f docker-compose.build.yml build

# 4. Push updated images
docker compose -f docker-compose.build.yml push
```

### On Production Server (Pull & Restart)

```bash
cd showfolio

# 1. Pull latest images
docker compose pull

# 2. Restart services with new images
docker compose up -d

# 3. Verify update
docker compose ps
docker compose logs -f
```

**Zero-downtime update:**

```bash
# Start new containers before stopping old ones
docker compose up -d --no-deps --build client
docker compose up -d --no-deps --build server
```

---

## 📝 Content Setup Guide

This guide shows you how to add content to your portfolio through Strapi CMS.

### Step 1: Login to Strapi Admin

- **Local:** http://localhost:1337/admin
- **Production:** http://YOUR_SERVER_IP:1337/admin

Create your admin user on first login.

### Step 2: Setup Profile (Your Personal Info)

Profile is a **Single Type** - you only create it once.

1. Go to **Content Manager** (left sidebar)
2. Click **Profile** (under Single Types)
3. Fill in all fields:

#### Basic Info

- **brandName:** Your name or brand (e.g., "John Doe")
- **title:** Your job title (e.g., "Full Stack Developer")
- **tagline:** Short catchy phrase (e.g., "Building web experiences that matter")
- **shortInfo:** 2-3 sentence description for hero section

#### About Section

- **about:** Write paragraphs about yourself using the Rich Text Editor
  - Click the editor and format your text
  - Add bold, italics, links as needed
- **whatIDoList:** List your services/skills in this exact format:
  ```
  - Landing Page Development: Fast, responsive landing pages
  - Web App & Dashboard: Internal dashboards with Laravel backend
  - E-commerce Solutions: Shopify and custom stores
  - API Development: RESTful APIs with Node.js
  ```
  Each line starts with `-` followed by space, then service name, colon, description.

#### Media Files

Upload images for your brand:

- **lightLogo:** Your logo for light theme (PNG/SVG, transparent background recommended)
- **darkLogo:** Your logo for dark theme (PNG/SVG, transparent background recommended)
- **profileImage:** Your profile photo (JPG/PNG, square aspect ratio recommended)
- **favicon:** Browser tab icon (ICO/PNG, 32x32 or 16x16 pixels)

**Tip:** If you don't have separate light/dark logos, use the same image for both.

#### Social Links (Click "Add Component")

Add your social media profiles:

1. Click **"Add an entry to socialLinks"**
2. Fill in:
   - **label:** Platform name (e.g., "GitHub")
   - **url:** Your profile URL (e.g., "https://github.com/yourusername")
   - **iconKey:** Choose from: `github`, `linkedin`, `twitter`, `instagram`, `facebook`, `email`, `website`
3. Click **"Add an entry"** again to add more social links

#### Portfolio Numbers (Click "Add Component")

Add statistics to showcase:

1. Click **"Add an entry to portfolioNumbers"**
2. Fill in:
   - **label:** Metric name (e.g., "Years Experience")
   - **value:** Number (e.g., "5+")
3. Add more entries for different stats (Projects Completed, Happy Clients, etc.)

#### Contact Info

- **email:** Your contact email
- **phone:** Your phone number (optional)
- **address:** Your location (e.g., "Jakarta, Indonesia")

**4. Click "Save" button (top right)**  
**5. Click "Publish" button (top right)**

---

### Step 3: Create Portfolio Projects

Portfolios are **Collection Type** - you can create multiple projects.

1. Go to **Content Manager** (left sidebar)
2. Click **Portfolios** (under Collection Types)
3. Click **"Create new entry"** (top right)

#### Project Info

- **title:** Project name (e.g., "E-commerce Dashboard")
- **slug:** URL-friendly version (auto-generated from title, or customize)
- **description:** Detailed project description using Rich Text Editor
  - Explain what the project does
  - Your role in the project
  - Challenges you solved
- **year:** Project year (e.g., "2024")
- **category:** Choose category (e.g., "Web Development", "Mobile App", "UI/UX Design")

#### Display Settings

- **isFeatured:** Toggle ON to show this project on homepage (featured section)
  - Only featured projects appear on the main page
  - All projects appear in the portfolio page

#### Images

- **thumbnail:** Small preview image for project cards (recommended: 800x600px)
- **coverImage:** Large hero image for project detail page (recommended: 1920x1080px)
- **images:** Multiple images for project gallery (click "Add an entry" for each image)

#### Tech Stack (Click "Add Component")

List technologies used:

1. Click **"Add an entry to techTags"**
2. Enter **name:** (e.g., "React", "Node.js", "PostgreSQL")
3. Add more tags for each technology

#### Links

- **liveUrl:** Live project URL (e.g., "https://myproject.com") - leave empty if not live
- **githubUrl:** GitHub repository URL (e.g., "https://github.com/user/project") - optional

**4. Click "Save"**  
**5. Click "Publish"**

Repeat to create more projects!

---

### Step 4: Setup Permissions (CRITICAL!)

Without setting permissions, your frontend **WILL NOT** display any content from Strapi.

1. Go to **Settings** (left sidebar)
2. Click **Users & Permissions Plugin**
3. Click **Roles**
4. Click **Public** role

5. **Enable permissions** for each content type:

Scroll down and expand each section, then check these boxes:

**Portfolio (portfolios):**

- ☑ find
- ☑ findOne

**Profile:**

- ☑ find

**Skill (skills):** (optional - if you use skills)

- ☑ find
- ☑ findOne

**Service (services):** (optional - if you use services)

- ☑ find
- ☑ findOne

**Testimonial (testimonials):** (optional - if you use testimonials)

- ☑ find
- ☑ findOne

6. Click **"Save"** button (top right)

**Test permissions:**

```bash
# Test Profile API (should return your data, not 403 Forbidden)
curl http://localhost:1337/api/profile?populate=*

# Test Portfolio API
curl http://localhost:1337/api/portfolios?populate=*
```

If you see data (not errors), permissions are correct!

---

### Step 5: (Optional) Add Skills, Services, Testimonials

These are optional sections you can add to enhance your portfolio:

#### Skills

1. Go to **Content Manager → Skills**
2. Create skills with:
   - **name:** Skill name (e.g., "React")
   - **level:** Proficiency level (e.g., "Advanced")
   - **category:** Category (e.g., "Frontend")

#### Services

1. Go to **Content Manager → Services**
2. Create services you offer:
   - **title:** Service name
   - **description:** What you offer
   - **icon:** Icon key

#### Testimonials

1. Go to **Content Manager → Testimonials**
2. Add client testimonials:
   - **name:** Client name
   - **position:** Their role
   - **company:** Their company
   - **content:** Their testimonial
   - **avatar:** Their photo

Don't forget to **Save & Publish** and enable permissions!

---

## 🔧 Environment Variables Reference

### Default Values (for Local Development)

The default `.env.example` works perfectly for local development:

```bash
# Database
POSTGRES_DB=showfolio
POSTGRES_USER=showfolio
POSTGRES_PASSWORD=showfolio

# Strapi
NODE_ENV=production  # or development
HOST=0.0.0.0
PORT=1337
APP_URL=http://localhost:1337
ADMIN_URL=http://localhost:1337/admin

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:1337
API_URL=http://server:1337

# Security keys (CHANGE FOR PRODUCTION!)
APP_KEYS=toBeModified1,toBeModified2,toBeModified3,toBeModified4
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
ENCRYPTION_KEY=tobemodified
```

### Production Values

For production deployment, update these:

```bash
# 1. Generate secure keys (run 6 times to get 6 different keys)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 2. Update in .env:
APP_KEYS=<key1>,<key2>,<key3>,<key4>
API_TOKEN_SALT=<key5>
ADMIN_JWT_SECRET=<key6>
TRANSFER_TOKEN_SALT=<key7>
JWT_SECRET=<key8>
ENCRYPTION_KEY=<key9>

# 3. Change database password
POSTGRES_PASSWORD=your_strong_database_password
DATABASE_PASSWORD=your_strong_database_password

# 4. Update URLs (replace with your domain or server IP)
APP_URL=http://YOUR_SERVER_IP:1337
ADMIN_URL=http://YOUR_SERVER_IP:1337/admin
NEXT_PUBLIC_API_URL=http://YOUR_SERVER_IP:1337
CORS_ORIGINS=http://YOUR_SERVER_IP:3000,http://YOUR_SERVER_IP:1337

# 5. For domain with HTTPS:
APP_URL=https://yourdomain.com
ADMIN_URL=https://yourdomain.com/admin
NEXT_PUBLIC_API_URL=https://yourdomain.com
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Important Notes

- **API_URL** should always be `http://server:1337` (internal Docker network)
- **NEXT_PUBLIC_API_URL** is what the browser uses (must be publicly accessible)
- Never commit `.env` file to git (it's already in `.gitignore`)
- Keep your production keys secret!

---

## 📝 Useful Docker Commands

### Development Mode

```bash
# Start development mode (with hot-reload)
docker compose -f docker-compose.dev.yml up -d

# Stop development mode
docker compose -f docker-compose.dev.yml down

# View logs (real-time)
docker compose -f docker-compose.dev.yml logs -f

# Restart a specific service
docker compose -f docker-compose.dev.yml restart client   # Frontend
docker compose -f docker-compose.dev.yml restart server   # Strapi

# Rebuild after dependency changes
docker compose -f docker-compose.dev.yml up -d --build

# Clean restart (WARNING: deletes database!)
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d
```

### Production Mode

```bash
# Start production services
docker compose up -d

# Stop production services
docker compose down

# Check service status
docker compose ps

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f client    # Frontend only
docker compose logs -f server    # Strapi only
docker compose logs -f db        # Database only

# Restart services
docker compose restart

# Restart specific service
docker compose restart client
docker compose restart server

# Pull updated images
docker compose pull

# Update to new images
docker compose pull
docker compose up -d
```

### Build & Push Images

```bash
# Build images (on local machine)
./build-images.sh
# or manually:
export $(grep '^DOCKER_USERNAME=' .env | xargs)
docker compose -f docker-compose.build.yml build

# Push to Docker Hub
docker compose -f docker-compose.build.yml push

# Build without cache (clean build)
docker compose -f docker-compose.build.yml build --no-cache
```

### Database Management

```bash
# Backup database
docker compose exec db pg_dump -U showfolio showfolio > backup-$(date +%Y%m%d).sql

# Restore database
docker compose exec -T db psql -U showfolio showfolio < backup-20241213.sql

# Connect to database
docker compose exec db psql -U showfolio showfolio

# Copy database from dev to prod
docker compose -f docker-compose.dev.yml exec db pg_dump -U showfolio showfolio > dev-backup.sql
docker compose exec -T db psql -U showfolio showfolio < dev-backup.sql
```

### Cleanup Commands

```bash
# Stop and remove containers
docker compose down

# Stop and remove containers + volumes (DELETES DATA!)
docker compose down -v

# Remove unused images
docker image prune -a

# Remove all stopped containers
docker container prune

# Full cleanup (use with caution!)
docker system prune -a --volumes
```

---

## 🐛 Troubleshooting Guide

### ❌ Frontend shows "Failed to fetch" or no data

**Symptoms:** Frontend loads but shows placeholder/empty content

**Solutions:**

1. **Check if Strapi is running:**

   ```bash
   docker compose ps
   # Strapi should show "Up"
   ```

2. **Test Strapi API directly:**

   ```bash
   curl http://localhost:1337/api/profile?populate=*
   ```

   - If you get `403 Forbidden`: Permissions not set → Go to Strapi Settings → Roles → Public
   - If you get `404 Not Found`: Content not created → Add content in Content Manager
   - If you get `Connection refused`: Strapi not running → Check logs

3. **Check permissions in Strapi:**

   - Settings → Users & Permissions Plugin → Roles → Public
   - Enable `find` and `findOne` for all content types

4. **Restart frontend:**
   ```bash
   docker compose restart client
   ```

### ❌ Logo not showing or swapped (light/dark)

**Symptoms:** Logo missing or wrong logo appears in dark/light mode

**Solutions:**

1. Check logo files in Strapi:
   - Content Manager → Profile
   - `lightLogo` should be your logo for LIGHT theme
   - `darkLogo` should be your logo for DARK theme
2. If you only have one logo, upload it to BOTH fields

3. Clear browser cache and refresh

### ❌ Brand name not displaying in navbar

**Symptoms:** Navbar shows empty or "Brand" text

**Solutions:**

1. Open Strapi Admin → Content Manager → Profile
2. Fill in `brandName` field (e.g., "John Doe")
3. Click Save & Publish
4. Refresh frontend

### ❌ Favicon not changing (still showing default icon)

**Symptoms:** Browser tab still shows Next.js default icon even after uploading favicon in Strapi

**Solutions:**

1. **Clear browser cache:**

   **Chrome/Edge:**

   - Press `Ctrl+Shift+Delete` (Windows/Linux) or `Cmd+Shift+Delete` (Mac)
   - Select "Cached images and files"
   - Click "Clear data"

   **Or force refresh:**

   - `Ctrl+F5` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

2. **Hard reload specific to favicon:**

   - Open DevTools (`F12`)
   - Right-click refresh button
   - Select "Empty Cache and Hard Reload"

3. **Check favicon in Strapi:**

   - Content Manager → Profile
   - Make sure `favicon` field has an image uploaded
   - File should be `.ico`, `.png`, or `.svg` format
   - Recommended size: 32x32 or 16x16 pixels
   - Click Save & Publish

4. **Verify favicon URL:**

   ```bash
   # Check if favicon is accessible
   curl -I http://localhost:1337/uploads/favicon_xxxxx.png
   # Should return 200 OK
   ```

5. **Restart frontend container:**

   ```bash
   docker compose restart client
   ```

6. **Test in incognito/private mode:**

   - Open your site in incognito window
   - This bypasses browser cache

7. **Add version query parameter:**
   - If still cached, access: `http://localhost:3000?v=2`
   - This forces browser to treat it as new page

**Note:** Browsers aggressively cache favicons. It may take 5-10 minutes for changes to appear even after clearing cache.

### ❌ Container fails to start

**Symptoms:** `docker compose up -d` fails or containers exit immediately

**Solutions:**

1. **Check logs:**

   ```bash
   docker compose logs
   ```

2. **Common causes:**

   - Port already in use (3000, 1337, or 5432)
   - Invalid .env values
   - Insufficient memory

3. **Fix port conflicts:**

   ```bash
   # Check what's using the port
   sudo lsof -i :3000
   sudo lsof -i :1337
   sudo lsof -i :5432

   # Kill the process or change port in docker-compose.yml
   ```

4. **Clean restart:**
   ```bash
   docker compose down
   docker compose up -d
   ```

### ❌ Database connection failed

**Symptoms:** Strapi shows "Database connection error"

**Solutions:**

1. **Check database is running:**

   ```bash
   docker compose ps
   # db should show "Up (healthy)"
   ```

2. **Check database credentials in .env:**

   ```bash
   POSTGRES_USER=showfolio
   POSTGRES_PASSWORD=showfolio
   DATABASE_USERNAME=showfolio
   DATABASE_PASSWORD=showfolio
   ```

   These must match!

3. **Restart database:**
   ```bash
   docker compose restart db
   docker compose restart server
   ```

### ❌ Out of memory / OOM on VPS

**Symptoms:** Containers killed, "OOM" in logs, server freezes

**Solutions:**

1. **Don't build on 2GB VPS!** Use Docker Hub workflow:

   - Build locally (16GB RAM)
   - Push to Docker Hub
   - Pull on VPS (no building)

2. **Enable swap on VPS:**

   ```bash
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   # Make permanent
   echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
   ```

3. **Check memory limits in docker-compose.yml:**
   ```yaml
   mem_limit: 640m # Strapi
   mem_reservation: 384m
   ```

### ❌ Images not building / stuck at "Building"

**Symptoms:** `docker compose build` takes forever or fails

**Solutions:**

1. **Check internet connection** (Docker downloads packages)

2. **Increase Docker resources:**

   - Docker Desktop → Settings → Resources
   - Increase Memory to 8GB+
   - Increase CPU to 4+

3. **Build without cache:**

   ```bash
   docker compose -f docker-compose.build.yml build --no-cache
   ```

4. **Build one service at a time:**
   ```bash
   docker compose -f docker-compose.build.yml build server
   docker compose -f docker-compose.build.yml build client
   ```

### ❌ Permission denied errors

**Symptoms:** "EACCES: permission denied" during npm install or build

**Solutions:**

```bash
# Fix ownership of node_modules
sudo chown -R $USER:$USER client/node_modules
sudo chown -R $USER:$USER server/node_modules

# Or remove and rebuild
rm -rf client/node_modules server/node_modules
docker compose -f docker-compose.dev.yml up -d --build
```

### ❌ Port 1337 or 3000 already in use

**Solutions:**

```bash
# Find and kill process using the port
sudo lsof -i :1337
sudo kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "1338:1337"  # Use port 1338 instead
```

### ❌ "413 Request Entity Too Large" when uploading

**Symptoms:** Cannot upload large images in Strapi

**Solutions:**

1. **Increase file size limit in .env:**

   ```bash
   MAX_FILE_SIZE=209715200  # 200MB in bytes
   ```

2. **If using Nginx, update config:**

   ```nginx
   client_max_body_size 200M;
   ```

3. Restart services:
   ```bash
   docker compose restart
   sudo systemctl restart nginx
   ```

### ❌ Frontend works but Strapi admin won't load

**Symptoms:** Frontend at :3000 works, but :1337/admin shows blank or error

**Solutions:**

1. **Clear browser cache** (Strapi admin uses lots of caching)

2. **Check Strapi logs:**

   ```bash
   docker compose logs server
   ```

3. **Rebuild Strapi admin:**
   ```bash
   docker compose exec server npm run build
   docker compose restart server
   ```

### ❌ Environment variables not loading

**Symptoms:** App uses default values instead of .env values

**Solutions:**

1. **Ensure .env file exists in project root:**

   ```bash
   ls -la .env
   ```

2. **Restart containers after changing .env:**

   ```bash
   docker compose down
   docker compose up -d
   ```

3. **Verify variables are loaded:**
   ```bash
   docker compose exec server env | grep APP_KEYS
   ```

### 🆘 Still Having Issues?

1. **Check logs for all services:**

   ```bash
   docker compose logs -f
   ```

2. **Try clean restart:**

   ```bash
   docker compose down -v  # WARNING: deletes database
   docker compose up -d
   ```

3. **Verify Docker installation:**

   ```bash
   docker --version
   docker compose version
   ```

4. **Check system resources:**
   ```bash
   free -h              # Memory
   df -h                # Disk space
   docker system df     # Docker disk usage
   ```

---

## 📚 Additional Resources

### Official Documentation

- **Next.js:** https://nextjs.org/docs
- **Strapi:** https://docs.strapi.io
- **Docker:** https://docs.docker.com
- **PostgreSQL:** https://www.postgresql.org/docs

### Helpful Guides

- [Docker Compose CLI Reference](https://docs.docker.com/compose/reference/)
- [Strapi Content API](https://docs.strapi.io/dev-docs/api/rest)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs by creating an issue
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT License - free to use for personal and commercial projects.

---

## 💬 Support

Need help? Here's how to get it:

1. **Check this README** - Most common issues are covered in Troubleshooting
2. **Check logs** - `docker compose logs -f` shows what's happening
3. **Search issues** - Someone might have had the same problem
4. **Create an issue** - Describe your problem with logs and steps to reproduce

---

## 📝 Summary: Quick Reference

### For Local Development

```bash
git clone https://github.com/rvllfil/showfolio.git
cd showfolio
docker compose -f docker-compose.dev.yml up -d
# Open http://localhost:3000 and http://localhost:1337/admin
```

### For Production (Docker Hub Workflow)

**On Local Machine (Build):**

```bash
cp .env.example .env                                    # Configure
nano .env                                               # Set DOCKER_USERNAME
docker login                                            # Login to Docker Hub
./build-images.sh                                       # Build images
docker compose -f docker-compose.build.yml push         # Push to Docker Hub
```

**On VPS (Deploy):**

```bash
git clone https://github.com/rvllfil/showfolio.git
cd showfolio
cp .env.example .env                                    # Configure
nano .env                                               # Set production values
export $(grep '^DOCKER_USERNAME=' .env | xargs)        # Load username
docker compose pull                                     # Pull images
docker compose up -d                                    # Start services
# Open http://YOUR_SERVER_IP:3000 and :1337/admin
```

### Common Commands

```bash
# Start
docker compose up -d

# Stop
docker compose down

# Logs
docker compose logs -f

# Restart
docker compose restart

# Update
docker compose pull && docker compose up -d

# Backup
docker compose exec db pg_dump -U showfolio showfolio > backup.sql
```

---

**Built with ❤️ using Next.js 16 & Strapi v5**
