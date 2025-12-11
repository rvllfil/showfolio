# Docker Hub Deployment Guide

This guide explains how to build images locally/CI and deploy to VPS using Docker Hub.

## Overview

**Build Once, Deploy Anywhere**

```
Local/CI (16GB RAM) → Build → Push to Docker Hub → VPS (2GB RAM) → Pull → Run
```

- ✅ No building on VPS (solves OOM issues)
- ✅ Fast deployment (pull images only)
- ✅ Consistent builds
- ✅ Works perfectly on 2GB VPS

## Prerequisites

### On Local Machine / CI

- Docker & Docker Compose installed
- Docker Hub account (free at [hub.docker.com](https://hub.docker.com))
- 4GB+ RAM for building

### On VPS

- Docker & Docker Compose installed
- Internet connection
- No build tools required

## Setup Instructions

### 1. Docker Hub Setup

Create a free account at [hub.docker.com](https://hub.docker.com).

### 2. Update Configuration Files

Replace `USERNAME` with your Docker Hub username in:

**docker-compose.build.yml:**

```yaml
services:
  server:
    image: USERNAME/showfolio-server:latest # Change USERNAME
  client:
    image: USERNAME/showfolio-client:latest # Change USERNAME
```

**docker-compose.yml:**

```yaml
services:
  server:
    image: USERNAME/showfolio-server:latest # Change USERNAME
  client:
    image: USERNAME/showfolio-client:latest # Change USERNAME
```

**Or use sed (Linux/Mac):**

```bash
# Replace USERNAME with your actual Docker Hub username
sed -i 's/USERNAME/yourusername/g' docker-compose.build.yml
sed -i 's/USERNAME/yourusername/g' docker-compose.yml
```

## Workflow

### Option A: Manual Build and Push (Local Machine)

**On your local machine (16GB RAM):**

```bash
# 1. Login to Docker Hub
docker login

# 2. Build images (5-10 minutes)
docker compose -f docker-compose.build.yml build

# 3. Push to Docker Hub (2-5 minutes)
docker compose -f docker-compose.build.yml push

# Or use the convenience script:
./build-and-push.sh
```

### Option B: Automated CI/CD (GitHub Actions)

**One-time setup:**

1. Go to your GitHub repository → Settings → Secrets and variables → Actions

2. Add secrets:

   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Docker Hub access token (create at hub.docker.com/settings/security)

3. Update `.github/workflows/docker-publish.yml`:
   ```yaml
   env:
     IMAGE_PREFIX: USERNAME # Replace with your username
   ```

**Automatic builds:**

- Push to `main` branch → Automatically builds and pushes images
- Create a tag (e.g., `v1.0.0`) → Builds tagged release

### Deploy on VPS

**On your VPS (2GB RAM):**

```bash
# 1. Clone repository (if not already)
git clone https://github.com/yourusername/showfolio.git
cd showfolio

# 2. Create environment file
cp .env.example .env
nano .env  # Edit with your values

# 3. Pull latest images from Docker Hub (2-3 minutes)
docker compose pull

# 4. Start services (instant)
docker compose up -d

# Or use the convenience script:
./deploy-vps.sh
```

**Check status:**

```bash
# View running containers
docker compose ps

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f server
docker compose logs -f client
```

## File Structure

```
showfolio/
├── docker-compose.yml           # Runtime config (VPS uses this)
├── docker-compose.build.yml     # Build config (local/CI uses this)
├── build-and-push.sh           # Helper script for local builds
├── deploy-vps.sh               # Helper script for VPS deployment
├── .github/
│   └── workflows/
│       └── docker-publish.yml  # CI/CD automation
├── client/
│   └── Dockerfile              # Next.js build instructions
└── server/
    └── Dockerfile              # Strapi build instructions
```

## Environment Variables

Create `.env` file on VPS with:

```env
# Database
POSTGRES_DB=showfolio
POSTGRES_USER=showfolio
POSTGRES_PASSWORD=your_secure_password

# Strapi Security Keys (generate with: openssl rand -base64 32)
APP_KEYS=key1,key2
API_TOKEN_SALT=your_token_salt
ADMIN_JWT_SECRET=your_admin_secret
TRANSFER_TOKEN_SALT=your_transfer_salt
JWT_SECRET=your_jwt_secret

# URLs
NEXT_PUBLIC_API_URL=http://your-vps-ip:1337
APP_URL=http://your-vps-ip:1337
CORS_ORIGINS=http://your-vps-ip:3000,http://your-vps-ip:1337
```

## Deployment Workflow

### First Time Deployment

```bash
# On LOCAL machine:
docker login
./build-and-push.sh

# On VPS:
git clone <repo>
cd showfolio
cp .env.example .env
nano .env  # Configure
./deploy-vps.sh
```

### Updating Deployment

```bash
# On LOCAL machine (after code changes):
./build-and-push.sh

# On VPS:
git pull  # Get latest docker-compose.yml if changed
./deploy-vps.sh
```

## Troubleshooting

### "repository does not exist"

- Ensure images are pushed: `docker compose -f docker-compose.build.yml push`
- Check username is correct in docker-compose.yml
- Verify images exist: `docker search USERNAME/showfolio`

### "no matching manifest"

- Ensure images were built for correct architecture (linux/amd64)
- Rebuild and push images

### Services not starting

- Check logs: `docker compose logs -f`
- Verify environment variables in `.env`
- Ensure ports 3000, 1337, 5432 are available

### Database connection errors

- Ensure PostgreSQL started: `docker compose ps`
- Check database credentials in `.env`
- Wait for healthcheck: `docker compose ps` (should show "healthy")

## Benefits of This Approach

| Aspect             | Traditional               | Docker Hub        |
| ------------------ | ------------------------- | ----------------- |
| **Build on VPS**   | Yes (1+ hour, may fail)   | No (instant)      |
| **VPS RAM needed** | 2GB+ (often insufficient) | Any (512MB works) |
| **Deploy time**    | 10-60 minutes             | 2-3 minutes       |
| **Consistency**    | Build variations          | Identical images  |
| **CI/CD**          | Complex                   | Native support    |

## Advanced: Multi-Environment

Use different tags for environments:

```yaml
# Production
image: username/showfolio-server:latest

# Staging
image: username/showfolio-server:staging

# Specific version
image: username/showfolio-server:v1.2.3
```

Build and tag:

```bash
docker compose -f docker-compose.build.yml build
docker tag username/showfolio-server:latest username/showfolio-server:staging
docker push username/showfolio-server:staging
```

## Cost

- **Docker Hub**: Free for public repositories (unlimited pulls)
- **GitHub Actions**: 2,000 minutes/month free
- **VPS**: Same cost, better utilization

## Support

- Documentation: `BUILD_ON_2GB_VPS.md` (legacy build method)
- Issues: Check logs with `docker compose logs -f`
- Updates: Pull latest images and redeploy
