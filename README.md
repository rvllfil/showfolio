# Showfolio – CMS-Driven Portfolio Platform

A modern, fully customizable portfolio platform powered by Strapi CMS and Next.js. Built for developers, designers, and freelancers who want complete control over their portfolio content without touching code.

---

## 📖 Overview

**Showfolio** is a production-ready portfolio solution that separates content from code. Everything you see on the frontend — from navigation labels to project details — is managed through the Strapi CMS admin panel. This means:

- **No hardcoded content**: All visible text and images come from the CMS
- **Reusable for anyone**: Multiple users can deploy their own portfolio with different content
- **Easy to maintain**: Update your portfolio without writing code
- **SEO-optimized**: Dynamic metadata from CMS
- **Docker-ready**: One-command deployment for local and production environments

**Perfect for:**

- Freelancers who want a professional portfolio
- Developers showcasing their projects
- Agencies managing multiple client portfolios
- Anyone who wants a CMS-driven, customizable portfolio

---

## ✨ Features

✅ **Fully CMS-Driven Content**

- All sections (Hero, About, Services, Skills, Projects, Testimonials, Contact) managed via Strapi
- Navigation and footer labels customizable
- Profile information, job title, avatar, and favicon from CMS

✅ **Portfolio Management**

- Create and manage unlimited projects
- Upload project images and thumbnails
- Add tech stack tags, live URLs, and GitHub links
- Mark featured projects for homepage display

✅ **Services & Skills**

- Icon-based services with custom icons (Lucide icons)
- Skills with proficiency levels and categories
- Testimonials with client feedback

✅ **Modern UI/UX**

- Responsive design (mobile, tablet, desktop)
- Dark / Light mode with theme toggle
- Smooth animations with Framer Motion
- Clean, professional design with Tailwind CSS

✅ **SEO & Performance**

- Dynamic metadata (title, description, favicon) from CMS
- Server-side rendering with Next.js App Router
- Optimized images and assets
- Fast page loads

✅ **Developer-Friendly**

- Docker & Docker Compose setup included
- TypeScript for type safety
- Clear project structure
- Easy to extend and customize

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Lucide React icons, Framer Motion
- **Theme**: next-themes for dark/light mode

### Backend

- **CMS**: Strapi v5.31
- **Database**: PostgreSQL 15 (Docker) or SQLite (local dev)
- **Language**: TypeScript

### Infrastructure

- **Containerization**: Docker & Docker Compose
- **Node.js**: v20 (Alpine Linux)
- **Package Manager**: npm

---

## 📁 Project Structure

```
showfolio/
├── client/                 # Next.js frontend application
│   ├── app/               # App Router pages & components
│   │   ├── components/    # React components (Hero, About, Services, etc.)
│   │   ├── portfolio/     # Portfolio pages
│   │   ├── layout.tsx     # Root layout with metadata
│   │   └── page.tsx       # Homepage
│   ├── lib/               # Utilities (API helpers, types)
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Strapi CMS backend
│   ├── src/
│   │   ├── api/          # Content types (Portfolio, Service, Skill, etc.)
│   │   └── components/   # Strapi components
│   ├── config/           # Strapi configuration
│   ├── public/uploads/   # Media uploads storage
│   └── package.json
│
├── docker-compose.yml     # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── .env.example          # Root environment variables
└── README.md             # This file
```

---

## 📋 Requirements

### For Docker Deployment (Recommended)

- **Docker Desktop** 4.0+ or Docker Engine 20.10+
- **Docker Compose** v2.0+

### For Manual Installation (Optional)

- **Node.js** 18+ (v20 recommended)
- **npm** 9+
- **PostgreSQL** 15+ (or SQLite for local dev)

---

## 🚀 Installation — With Docker (Recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/showfolio.git
cd showfolio
```

### Step 2: Setup Environment Files

Copy the example environment files:

```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**Important: Generate Secure Secrets for Production**

For security, you must generate unique secret keys. Run these commands to generate them:

```bash
# Generate APP_KEYS (4 comma-separated keys)
node -e "console.log('APP_KEYS=' + Array(4).fill(0).map(() => require('crypto').randomBytes(16).toString('base64')).join(','))"

# Generate API_TOKEN_SALT
node -e "console.log('API_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"

# Generate ADMIN_JWT_SECRET
node -e "console.log('ADMIN_JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"

# Generate TRANSFER_TOKEN_SALT
node -e "console.log('TRANSFER_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"

# Generate JWT_SECRET
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
```

Then update these values in both `.env` and `server/.env` files.

**Environment Variables to Configure:**

| Variable              | Default                 | Description              | Required                 |
| --------------------- | ----------------------- | ------------------------ | ------------------------ |
| `APP_KEYS`            | `toBeModified1,2,3,4`   | 4 secret keys for Strapi | ✅ Yes                   |
| `API_TOKEN_SALT`      | `tobemodified`          | Salt for API tokens      | ✅ Yes                   |
| `ADMIN_JWT_SECRET`    | `tobemodified`          | Secret for admin JWT     | ✅ Yes                   |
| `TRANSFER_TOKEN_SALT` | `tobemodified`          | Salt for transfer tokens | ✅ Yes                   |
| `JWT_SECRET`          | `tobemodified`          | Secret for user JWT      | ✅ Yes                   |
| `NEXT_PUBLIC_API_URL` | `http://localhost:1337` | Strapi URL for browser   | ⚠️ Change for production |
| `POSTGRES_DB`         | `showfolio`             | Database name            | ✅ Yes                   |
| `POSTGRES_USER`       | `showfolio`             | Database username        | ✅ Yes                   |
| `POSTGRES_PASSWORD`   | `showfolio`             | Database password        | ⚠️ Change for production |

**For local development**, the default values work fine (except secrets should still be generated).

**For production deployment**, you MUST change:

- All secret keys (generate new ones)
- `NEXT_PUBLIC_API_URL` to your domain (e.g., `https://api.yourdomain.com`)
- Database password to something secure

### Step 3: Build & Start All Services

Run the entire stack with one command:

```bash
docker compose up --build
```

This will:

1. Start **PostgreSQL** database on port `5432`
2. Start **Strapi** backend on `http://localhost:1337`
3. Start **Next.js** frontend on `http://localhost:3000`

**First-time build** takes 3-5 minutes. Subsequent starts are much faster.

To run in background (detached mode):

```bash
docker compose up -d --build
```

### Step 4: Setup Strapi Admin Account

1. Open **http://localhost:1337/admin** in your browser
2. Create your first admin account (email, password, username)
3. You'll be logged into the Strapi admin panel

### Step 5: Configure API Permissions

To allow the frontend to fetch data from Strapi:

1. In Strapi admin, go to **Settings** → **Users & Permissions** → **Roles**
2. Click on **Public** role
3. Enable the following permissions:

**Portfolio:**

- `find` (GET /api/portfolios)
- `findOne` (GET /api/portfolios/:id)

**Service:**

- `find` (GET /api/services)
- `findOne` (GET /api/services/:id)

**Skill:**

- `find` (GET /api/skills)
- `findOne` (GET /api/skills/:id)

**Testimonial:**

- `find` (GET /api/testimonials)
- `findOne` (GET /api/testimonials/:id)

**Profile:**

- `find` (GET /api/profile)

4. Click **Save**

### Step 6: Add Your Content

Now populate your portfolio with content:

1. **Profile** (Settings → Single Type → Profile):

   - Brand name, job title, bio
   - Profile image, favicon
   - Navigation labels, footer labels
   - Contact section content
   - Social links

2. **Services** (Content Manager → Services):

   - Add your services (Web Development, Design, etc.)
   - Set icon names (from Lucide icons)
   - Add descriptions

3. **Skills** (Content Manager → Skills):

   - Add your technical skills
   - Set proficiency levels
   - Categorize skills

4. **Projects** (Content Manager → Portfolio):

   - Add project details, descriptions
   - Upload images and thumbnails
   - Add tech stack tags
   - Set live URLs and GitHub links

5. **Testimonials** (Content Manager → Testimonials):
   - Add client testimonials
   - Set ratings, client names, companies

### Step 7: View Your Portfolio

Open **http://localhost:3000** to see your portfolio live!

---

## 🐳 Docker Commands Reference

### Basic Operations

```bash
# Start all services (foreground)
docker compose up

# Start all services (background)
docker compose up -d

# Stop all services
docker compose down

# Stop and remove all data (⚠️ WARNING: deletes database!)
docker compose down -v

# Rebuild containers
docker compose build --no-cache

# View logs (all services)
docker compose logs -f

# View logs (specific service)
docker compose logs -f server
docker compose logs -f client
docker compose logs -f db
```

### Development Mode

For hot-reload during development:

```bash
docker compose -f docker-compose.dev.yml up --build
```

This mounts your source code as volumes, so changes reflect immediately without rebuilding.

### Service Management

```bash
# Restart a specific service
docker compose restart server

# Execute commands inside a container
docker compose exec server npm run strapi --help
docker compose exec client npm run build

# Access shell inside container
docker compose exec server sh
docker compose exec client sh
```

### Database Operations

```bash
# Access PostgreSQL database
docker compose exec db psql -U showfolio -d showfolio

# Backup database
docker compose exec db pg_dump -U showfolio showfolio > backup.sql

# Restore database
docker compose exec -T db psql -U showfolio showfolio < backup.sql
```

---

## 💻 Manual Installation (Without Docker)

If you prefer running services manually:

### Backend (Strapi)

1. **Navigate to server directory**:

```bash
cd server
```

2. **Install dependencies**:

```bash
npm install
```

3. **Configure environment**:

```bash
cp .env.example .env
```

Edit `.env` and set your database configuration. For local development, you can use SQLite:

```env
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

Or use PostgreSQL:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=showfolio
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
```

4. **Start Strapi**:

```bash
npm run develop
```

Strapi will be available at **http://localhost:1337**

### Frontend (Next.js)

1. **Navigate to client directory**:

```bash
cd client
```

2. **Install dependencies**:

```bash
npm install
```

3. **Configure environment**:

```bash
cp .env.example .env
```

Edit `.env` and set:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

4. **Start Next.js**:

```bash
npm run dev
```

Frontend will be available at **http://localhost:3000**

---

## 📝 Content Management Usage

### Accessing Strapi Admin

1. Go to **http://localhost:1337/admin**
2. Login with your admin credentials
3. You'll see the admin dashboard

### Managing Content

#### Profile (Single Type)

Your main profile information. Go to **Content Manager** → **Single Types** → **Profile**:

- **Basic Info**: Brand name, job title, bio, short info
- **Images**: Profile image, favicon
- **Navigation**: Labels for Home, About, Services, Portfolio, Contact, CTA button
- **Footer**: Quick links title, contact title, email label
- **Contact Section**: Title, description, benefits, CTA, social links
- **Social Links**: Add your social media URLs

#### Services (Collection)

Your service offerings. Go to **Content Manager** → **Services**:

- Click **Create new entry**
- Fill in: Title, slug, short description, full description
- Choose an icon name (from [Lucide Icons](https://lucide.dev/icons/))
- Mark as featured (optional)
- Set display order
- Upload service image
- Click **Save** and **Publish**

#### Skills (Collection)

Your technical skills. Go to **Content Manager** → **Skills**:

- Click **Create new entry**
- Fill in: Name, proficiency level (0-100)
- Choose category (Frontend, Backend, Tools, etc.)
- Choose an icon name
- Set display order
- Click **Save** and **Publish**

#### Portfolio (Collection)

Your projects. Go to **Content Manager** → **Portfolio**:

- Click **Create new entry**
- Fill in: Title, slug, work type (real/demo)
- Add short and detailed descriptions
- Add problem statement and solution
- Set your role, year, portfolio type
- Add tech tags (React, Next.js, etc.)
- Mark as featured (shows on homepage)
- Add live URL and GitHub URL
- Upload thumbnail and project images
- Click **Save** and **Publish**

#### Testimonials (Collection)

Client feedback. Go to **Content Manager** → **Testimonials**:

- Click **Create new entry**
- Fill in: Client name, position, company
- Add testimonial text
- Set rating (1-5 stars)
- Set display order
- Click **Save** and **Publish**

### Publishing Content

After creating/editing content:

1. Click **Save** (top right)
2. Click **Publish** to make it live on the frontend
3. The frontend automatically fetches the latest published content

---

## 🌐 Deployment to VPS / Server

### Prerequisites

- A VPS or server (DigitalOcean, AWS, Linode, etc.)
- Domain name (optional but recommended)
- SSH access to server

### Deployment Steps

1. **Install Docker on server**:

```bash
# For Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt install docker-compose-plugin
```

2. **Clone repository on server**:

```bash
git clone https://github.com/yourusername/showfolio.git
cd showfolio
```

3. **Setup environment files**:

```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit `.env` files and set:

- Generate new secure secrets (use the crypto commands above)
- Set `NEXT_PUBLIC_API_URL` to your domain or server IP
- Change database passwords

4. **Start services**:

```bash
docker compose up -d --build
```

5. **Setup reverse proxy (Nginx) for SSL**:

Install Nginx:

```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

Create Nginx config `/etc/nginx/sites-available/showfolio`:

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

    # Strapi backend
    location /api {
        proxy_pass http://localhost:1337/api;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_pass_request_headers on;
    }

    # Strapi admin
    location /admin {
        proxy_pass http://localhost:1337/admin;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_pass_request_headers on;
    }
}
```

Enable site and get SSL:

```bash
sudo ln -s /etc/nginx/sites-available/showfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d yourdomain.com
```

6. **Update environment variables for HTTPS**:

Edit `server/.env`:

```env
APP_URL=https://yourdomain.com
ADMIN_URL=https://yourdomain.com/admin
CORS_ORIGINS=https://yourdomain.com
```

Edit `client/.env`:

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

Restart services:

```bash
docker compose restart
```

### Production Best Practices

✅ **Use strong secrets**: Always generate new random secrets for production
✅ **Use HTTPS**: Setup SSL certificate with Let's Encrypt
✅ **Backup database**: Regular automated backups of PostgreSQL
✅ **Monitor logs**: Setup log monitoring and alerts
✅ **Update regularly**: Keep Docker images and dependencies updated
✅ **Use external database** (optional): Consider managed PostgreSQL (AWS RDS, DigitalOcean)
✅ **Use cloud storage** (optional): Setup S3 or Cloudinary for media uploads
✅ **Setup firewall**: Only expose necessary ports (80, 443)

---

## 🔧 Troubleshooting

### Port Already in Use

If you see "port already in use" errors:

```bash
# Check what's using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>

# Or change ports in docker-compose.yml
```

### Database Connection Issues

If Strapi can't connect to database:

1. Check database is running: `docker compose ps`
2. Check logs: `docker compose logs db`
3. Verify credentials match in `.env` and `server/.env`
4. Try recreating containers: `docker compose down -v && docker compose up --build`

### Frontend Can't Fetch Data

If frontend shows errors or no data:

1. Verify Strapi is running: `http://localhost:1337/api/profile`
2. Check API permissions are enabled (see Step 5 above)
3. Verify `NEXT_PUBLIC_API_URL` in `client/.env` is correct
4. Check CORS settings in `server/.env`

### Changes Not Reflecting

If your code changes don't show:

- **Docker**: You need to rebuild: `docker compose up --build`
- **Manual**: Restart services: `npm run dev`
- **For development**: Use `docker-compose.dev.yml` for hot-reload

---

## 📚 Additional Resources

- **Strapi Documentation**: https://docs.strapi.io
- **Next.js Documentation**: https://nextjs.org/docs
- **Docker Documentation**: https://docs.docker.com
- **Lucide Icons**: https://lucide.dev/icons/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 🎯 Final Notes

- **Showfolio is fully reusable**: Anyone can deploy their own portfolio with different content
- **All business content is in Strapi**: The frontend contains ZERO hardcoded business copy
- **Easy to customize**: Modify components in `client/app/components/` to change design
- **Production-ready**: Built with best practices for security and performance
- **Community-driven**: Contributions and feedback are welcome!

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! If you find bugs or want to add features:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

---

## 💬 Support

If you have questions or need help:

- Open an issue on GitHub
- Check existing issues for solutions
- Read the troubleshooting section above

---
