# 🐳 Docker Setup Complete

## ✅ Files Created

### Root Level
- ✅ `docker-compose.yml` - Production compose file
- ✅ `docker-compose.dev.yml` - Development compose file
- ✅ `docker-setup.sh` - Automated setup script
- ✅ `.env.example` - Root environment template
- ✅ `.dockerignore` - Root docker ignore
- ✅ `.gitignore` - Git ignore with Docker patterns
- ✅ `DOCKER.md` - Complete Docker documentation

### Server (Strapi)
- ✅ `server/Dockerfile` - Production multi-stage build
- ✅ `server/Dockerfile.dev` - Development with hot reload
- ✅ `server/.dockerignore` - Server docker ignore
- ✅ `server/.env.example` - Server environment template
- ✅ `server/public/uploads/.gitkeep` - Uploads directory

### Client (Next.js)
- ✅ `client/Dockerfile` - Production multi-stage build
- ✅ `client/Dockerfile.dev` - Development with hot reload
- ✅ `client/.dockerignore` - Client docker ignore  
- ✅ `client/.env.example` - Client environment template

### Documentation
- ✅ `README.md` - Updated with Docker section
- ✅ `DOCKER.md` - Comprehensive Docker guide

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Run setup script
./docker-setup.sh

# Start production stack
docker compose up --build
```

### Option 2: Manual Setup

```bash
# Copy environment files
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start production stack
docker compose up --build
```

### Option 3: Development Mode

```bash
# Setup first (same as above)
./docker-setup.sh

# Start development stack with hot reload
docker compose -f docker-compose.dev.yml up --build
```

---

## 📦 What Gets Started

### Production Mode (`docker-compose.yml`)

✅ **PostgreSQL Database** - Port 5432
- Persistent volume: `postgres_data`
- Health checks enabled
- Auto-restart policy

✅ **Strapi Backend** - Port 1337
- Multi-stage optimized build
- Production dependencies only
- Uploads volume mounted
- Health checks enabled
- Connects to PostgreSQL

✅ **Next.js Frontend** - Port 3000
- Multi-stage optimized build
- Production build with optimizations
- Non-root user for security
- Health checks enabled
- Connects to Strapi

### Development Mode (`docker-compose.dev.yml`)

Same services but with:
- 🔥 Hot reload enabled
- 📁 Source code mounted as volumes
- 🐛 Full development features
- ⚡ Faster iteration

---

## 🌐 Access Points

After running `docker compose up`:

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Next.js Application |
| Backend Admin | http://localhost:1337/admin | Strapi Admin Panel |
| Backend API | http://localhost:1337/api | REST API Endpoints |
| Database | localhost:5432 | PostgreSQL (user: showfolio) |

---

## 🔐 Security Notes

### ⚠️ IMPORTANT: Change Default Secrets!

The `.env.example` files contain **default secrets** that MUST be changed for production:

```bash
# Generate secure secrets
node -e "console.log('APP_KEYS=' + Array(4).fill(0).map(() => require('crypto').randomBytes(16).toString('base64')).join(','))"
node -e "console.log('API_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('ADMIN_JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('TRANSFER_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
```

The `docker-setup.sh` script does this automatically!

### Default Values (FOR DEVELOPMENT ONLY)
- Database: `showfolio / showfolio / showfolio`
- All JWT secrets: `tobemodified` (CHANGE THIS!)

---

## 📋 Docker Architecture

### Multi-Stage Builds

Both Dockerfiles use multi-stage builds for optimization:

```
Stage 1: Dependencies (deps)
  ↓ Install all dependencies
  
Stage 2: Build (build)
  ↓ Copy deps + source
  ↓ Build application
  
Stage 3: Production (production)
  ↓ Copy only production deps
  ↓ Copy built artifacts
  ↓ Minimal final image
```

**Benefits:**
- 🎯 Smaller image sizes
- 🔒 More secure (fewer packages)
- ⚡ Faster deployments
- 💾 Better layer caching

### Network Architecture

```
Docker Network: showfolio-network
├── db (postgres:15-alpine)
│   └── Port: 5432
│   └── Volume: postgres_data
│
├── server (Strapi)
│   └── Port: 1337
│   └── Depends on: db
│   └── Volume: uploads, strapi_data
│   └── Health check: /_health
│
└── client (Next.js)
    └── Port: 3000
    └── Depends on: server
    └── Health check: /
```

---

## 🛠️ Common Commands

### Start/Stop

```bash
# Production mode
docker compose up -d                    # Start in background
docker compose down                     # Stop all services
docker compose down -v                  # Stop and remove volumes

# Development mode
docker compose -f docker-compose.dev.yml up
docker compose -f docker-compose.dev.yml down
```

### View Logs

```bash
docker compose logs -f                  # All services
docker compose logs -f server           # Strapi only
docker compose logs -f client           # Next.js only
docker compose logs -f db               # Database only
```

### Rebuild

```bash
docker compose build                    # Rebuild all
docker compose build --no-cache         # Rebuild from scratch
docker compose up --build               # Rebuild and start
```

### Debugging

```bash
docker compose ps                       # Check service status
docker compose exec server sh           # Access Strapi shell
docker compose exec client sh           # Access Next.js shell
docker compose exec db psql -U showfolio # Access database
```

---

## 🔧 Configuration

### Environment Variables

**Root `.env`** (for docker-compose)
- `APP_KEYS` - Strapi application keys
- `API_TOKEN_SALT` - API token salt
- `ADMIN_JWT_SECRET` - Admin JWT secret
- `JWT_SECRET` - User JWT secret
- `NEXT_PUBLIC_API_URL` - Frontend API URL

**Server `server/.env`** (for Strapi)
- `DATABASE_CLIENT=postgres`
- `DATABASE_HOST=db`
- `DATABASE_NAME=showfolio`
- All Strapi secrets

**Client `client/.env`** (for Next.js)
- `NEXT_PUBLIC_API_URL=http://localhost:1337`
- `API_URL=http://server:1337` (internal)

### Database Switching

**Use PostgreSQL (default)**:
```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=db
# ... other postgres settings
```

**Use SQLite (local dev)**:
```bash
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

---

## 🚀 Production Deployment

### Checklist

- [ ] Generate secure secrets (use `docker-setup.sh`)
- [ ] Update `NEXT_PUBLIC_API_URL` to production domain
- [ ] Configure SSL/TLS (nginx/Traefik)
- [ ] Set up external database (optional)
- [ ] Configure cloud storage for uploads (S3/Cloudinary)
- [ ] Enable monitoring (Prometheus/Grafana)
- [ ] Set up backup strategy
- [ ] Configure firewall rules
- [ ] Enable rate limiting
- [ ] Set up CI/CD pipeline

### Recommended Architecture

```
Internet
  ↓
Reverse Proxy (Nginx/Traefik) + SSL
  ↓
Docker Compose Stack
  ├── Next.js Frontend (container)
  ├── Strapi Backend (container)
  └── PostgreSQL (managed service recommended)
```

### External Database

For production, use managed PostgreSQL (AWS RDS, DigitalOcean, etc.):

```yaml
# docker-compose.yml
services:
  server:
    environment:
      DATABASE_HOST: your-db-host.amazonaws.com
      DATABASE_PORT: 5432
      DATABASE_NAME: showfolio_prod
      DATABASE_USERNAME: ${DB_USER}
      DATABASE_PASSWORD: ${DB_PASSWORD}
      DATABASE_SSL: true

# Remove the db service
```

---

## 📊 Monitoring

### Health Checks

All services have health checks:

```bash
# Check status
docker compose ps

# Manual checks
curl http://localhost:1337/_health
curl http://localhost:3000
```

### Resource Usage

```bash
# Monitor resources
docker stats

# Specific containers
docker stats showfolio-strapi showfolio-client showfolio-db
```

---

## 💾 Data Persistence

### Volumes

- `postgres_data` - Database data (persistent)
- `strapi_data` - Strapi temp files (persistent)
- `./server/public/uploads` - Media uploads (bind mount)

### Backup

```bash
# Backup database
docker compose exec db pg_dump -U showfolio showfolio > backup.sql

# Backup uploads
tar -czf uploads-backup.tar.gz server/public/uploads

# Backup volumes
docker run --rm -v showfolio_postgres_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/postgres-backup.tar.gz /data
```

### Restore

```bash
# Restore database
cat backup.sql | docker compose exec -T db psql -U showfolio showfolio

# Restore uploads
tar -xzf uploads-backup.tar.gz
```

---

## ❗ Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000
lsof -i :1337
lsof -i :5432

# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use different host port
```

### Container Won't Start

```bash
# Check logs
docker compose logs server

# Check health
docker compose ps

# Access container
docker compose exec server sh
```

### Database Connection Failed

```bash
# Check if DB is running
docker compose ps db

# Check DB logs
docker compose logs db

# Restart DB
docker compose restart db

# Connect to DB manually
docker compose exec db psql -U showfolio showfolio
```

### Build Fails

```bash
# Clear cache and rebuild
docker compose build --no-cache

# Remove everything and start fresh
docker compose down --rmi all --volumes
docker compose up --build
```

### Permission Issues

```bash
# Fix upload directory permissions
chmod -R 755 server/public/uploads

# Or recreate
rm -rf server/public/uploads
mkdir -p server/public/uploads
```

---

## 📚 Documentation

- **DOCKER.md** - Complete Docker deployment guide
- **README.md** - Project overview + Docker quick start
- **.env.example** files - Configuration templates

---

## 🎯 Next Steps

1. ✅ Run `./docker-setup.sh` or copy `.env.example` files
2. ✅ Start with `docker compose up --build`
3. ✅ Access http://localhost:1337/admin
4. ✅ Create admin account
5. ✅ Configure API permissions
6. ✅ Access http://localhost:3000
7. ✅ Start building your portfolio!

---

## 🤝 Support

For issues or questions:
1. Check **DOCKER.md** for detailed guides
2. Check **Troubleshooting** section above
3. View logs: `docker compose logs -f`
4. Check container status: `docker compose ps`

---

**Status**: ✅ Docker setup is complete and ready to use!

**Package Manager**: npm (detected from package-lock.json)

**Default Database**: PostgreSQL 15

**Node Version**: 20 LTS (Alpine)
