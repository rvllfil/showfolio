# 🐳 Docker Deployment Guide

Complete guide for deploying Showfolio with Docker.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Development Mode](#development-mode)
- [Production Mode](#production-mode)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Advanced Configuration](#advanced-configuration)

---

## 🚀 Quick Start

### Prerequisites

- Docker Desktop 4.0+
- Docker Compose v2.0+
- Node.js 20+ (for generating secrets)

### Setup Steps

1. **Clone and navigate to project**:
   ```bash
   cd showfolio
   ```

2. **Run setup script** (recommended):
   ```bash
   chmod +x docker-setup.sh
   ./docker-setup.sh
   ```

   Or manually:
   ```bash
   cp .env.example .env
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

3. **Start services**:
   ```bash
   docker compose up --build
   ```

4. **Access applications**:
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin
   - Database: localhost:5432

---

## 🛠️ Development Mode

For development with hot reload and source mapping:

```bash
# Start development environment
docker compose -f docker-compose.dev.yml up --build

# Stop
docker compose -f docker-compose.dev.yml down
```

### Development Features

- ✅ Hot reload for both Strapi and Next.js
- ✅ Source code mounted as volumes
- ✅ Automatic restart on file changes
- ✅ Full error stack traces
- ✅ Debug mode enabled

### Development URLs

- Frontend: http://localhost:3000 (auto-reload)
- Strapi: http://localhost:1337/admin (auto-reload)
- Database: localhost:5432

---

## 🏭 Production Mode

For production deployment with optimized builds:

```bash
# Build and start
docker compose up --build -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Production Features

- ✅ Multi-stage builds for smaller images
- ✅ Production-optimized Node.js
- ✅ Health checks for all services
- ✅ Auto-restart policies
- ✅ Secure by default

### Production Checklist

- [ ] Generate unique secrets (see [Security](#security))
- [ ] Configure proper `NEXT_PUBLIC_API_URL`
- [ ] Set up SSL/TLS (use reverse proxy)
- [ ] Configure external database (optional)
- [ ] Set up cloud storage for uploads (optional)
- [ ] Enable monitoring and logging
- [ ] Configure backup strategy

---

## 🔐 Security

### Generate Secrets

**IMPORTANT**: Never use default secrets in production!

```bash
# Generate all secrets at once
node -e "console.log('APP_KEYS=' + Array(4).fill(0).map(() => require('crypto').randomBytes(16).toString('base64')).join(','))"
node -e "console.log('API_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('ADMIN_JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('TRANSFER_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
```

Update values in:
- `.env` (root)
- `server/.env`

### Security Best Practices

1. **Never commit `.env` files** - Already in .gitignore
2. **Use strong database passwords**
3. **Limit CORS origins** - Update `CORS_ORIGINS` in server/.env
4. **Enable SSL/TLS** in production
5. **Use Docker secrets** for sensitive data in production

---

## 🌍 Environment Variables

### Root `.env`

```bash
# Strapi Secrets
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
TRANSFER_TOKEN_SALT=your_salt
JWT_SECRET=your_secret

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:1337

# Database
POSTGRES_DB=showfolio
POSTGRES_USER=showfolio
POSTGRES_PASSWORD=showfolio
```

### Server `server/.env`

```bash
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_NAME=showfolio
DATABASE_USERNAME=showfolio
DATABASE_PASSWORD=showfolio

# Secrets (same as root .env)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
JWT_SECRET=your_secret

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:1337
```

### Client `client/.env`

```bash
NODE_ENV=production

# Public API URL (accessible from browser)
NEXT_PUBLIC_API_URL=http://localhost:1337

# Server-side API URL (inside Docker network)
API_URL=http://server:1337
```

---

## 📦 Docker Services

### Service: `db`

PostgreSQL 15 database

- **Port**: 5432
- **Volume**: `postgres_data`
- **Health check**: pg_isready

### Service: `server`

Strapi CMS backend

- **Port**: 1337
- **Build**: Multi-stage (build + production)
- **Volumes**: 
  - `./server/public/uploads` (media files)
  - `strapi_data` (temp files)
- **Health check**: HTTP /_health

### Service: `client`

Next.js frontend

- **Port**: 3000
- **Build**: Multi-stage (deps + build + production)
- **Depends on**: server
- **Health check**: HTTP /

---

## 🔧 Common Commands

### Start/Stop

```bash
# Start in foreground
docker compose up

# Start in background
docker compose up -d

# Stop services
docker compose down

# Stop and remove volumes (⚠️ deletes data)
docker compose down -v
```

### Build

```bash
# Build all services
docker compose build

# Build specific service
docker compose build server

# Build without cache
docker compose build --no-cache
```

### Logs

```bash
# View all logs
docker compose logs -f

# View specific service logs
docker compose logs -f server
docker compose logs -f client
docker compose logs -f db

# Last 100 lines
docker compose logs --tail=100
```

### Restart

```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart server
```

### Execute Commands

```bash
# Access Strapi shell
docker compose exec server sh

# Access Next.js shell
docker compose exec client sh

# Access database
docker compose exec db psql -U showfolio -d showfolio

# Run Strapi commands
docker compose exec server npm run strapi -- <command>
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Map to different host port
```

### Database Connection Failed

```bash
# Check if database is running
docker compose ps

# View database logs
docker compose logs db

# Restart database
docker compose restart db
```

### Container Keeps Restarting

```bash
# View logs to see error
docker compose logs -f server

# Check health status
docker compose ps

# Access container for debugging
docker compose exec server sh
```

### Out of Disk Space

```bash
# Remove unused containers
docker system prune

# Remove unused volumes
docker volume prune

# Remove specific volume
docker volume rm showfolio_postgres_data
```

### Permission Denied on Uploads

```bash
# Fix permissions
chmod -R 755 server/public/uploads

# Or recreate with proper ownership
docker compose down
rm -rf server/public/uploads
mkdir -p server/public/uploads
docker compose up -d
```

### Build Fails

```bash
# Clear Docker cache
docker compose build --no-cache

# Remove all images and rebuild
docker compose down --rmi all
docker compose up --build
```

---

## 🚀 Advanced Configuration

### Use External Database

Edit `docker-compose.yml`:

```yaml
services:
  server:
    environment:
      DATABASE_HOST: your-external-db.com
      DATABASE_PORT: 5432
      DATABASE_NAME: showfolio
      DATABASE_USERNAME: user
      DATABASE_PASSWORD: pass
      DATABASE_SSL: true

# Remove or comment out the db service
# db:
#   ...
```

### Add Redis Cache

Add to `docker-compose.yml`:

```yaml
services:
  redis:
    image: redis:7-alpine
    container_name: showfolio-redis
    ports:
      - "6379:6379"
    networks:
      - showfolio-network
```

### Configure Nginx Reverse Proxy

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

### Enable HTTPS with Let's Encrypt

Use Traefik or Caddy as reverse proxy with automatic SSL:

```yaml
services:
  traefik:
    image: traefik:v2.10
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
      - "--certificatesresolvers.myresolver.acme.email=your@email.com"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./letsencrypt:/letsencrypt

  client:
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.client.rule=Host(`yourdomain.com`)"
      - "traefik.http.routers.client.entrypoints=websecure"
      - "traefik.http.routers.client.tls.certresolver=myresolver"
```

---

## 📊 Monitoring

### Docker Stats

```bash
# View resource usage
docker stats

# Specific containers
docker stats showfolio-strapi showfolio-client
```

### Health Checks

```bash
# Check health status
docker compose ps

# Manual health check
curl http://localhost:1337/_health
curl http://localhost:3000
```

---

## 💾 Backup & Restore

### Backup Database

```bash
# Backup to file
docker compose exec db pg_dump -U showfolio showfolio > backup.sql

# Or with docker command
docker exec showfolio-db pg_dump -U showfolio showfolio > backup.sql
```

### Restore Database

```bash
# Restore from file
docker compose exec -T db psql -U showfolio showfolio < backup.sql

# Or
cat backup.sql | docker exec -i showfolio-db psql -U showfolio showfolio
```

### Backup Uploads

```bash
# Create tar archive
tar -czf uploads-backup.tar.gz server/public/uploads

# Restore
tar -xzf uploads-backup.tar.gz
```

---

## 🎯 Performance Optimization

### 1. Use BuildKit

```bash
# Enable BuildKit for faster builds
export DOCKER_BUILDKIT=1
docker compose build
```

### 2. Multi-stage Build Optimization

Already implemented in Dockerfiles:
- Separate build and production stages
- Only production dependencies in final image
- Smaller image sizes

### 3. Volume Mount Optimization

For macOS users, use cached mounts:

```yaml
volumes:
  - ./server:/app:cached
```

### 4. Resource Limits

Add to `docker-compose.yml`:

```yaml
services:
  server:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Strapi Docker Guide](https://docs.strapi.io/dev-docs/deployment/docker)
- [Next.js Docker Example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

---

## ❓ Need Help?

- Check [Troubleshooting](#troubleshooting) section
- View logs: `docker compose logs -f`
- Check container status: `docker compose ps`
- Access container: `docker compose exec <service> sh`
