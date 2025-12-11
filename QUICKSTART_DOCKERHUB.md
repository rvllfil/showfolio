# Quick Start - Docker Hub Deployment

## 🚀 TL;DR

**Local/CI → Build → Push → VPS → Pull → Run**

### Local (One-time)

```bash
docker login
sed -i 's/USERNAME/yourusername/g' docker-compose*.yml
./build-and-push.sh
```

### VPS (Every deploy)

```bash
./deploy-vps.sh
```

---

## 📝 Detailed Steps

### 1️⃣ Setup (One-time)

**Create Docker Hub account:**

- Go to [hub.docker.com](https://hub.docker.com)
- Sign up (free)

**Update usernames:**

```bash
# Replace 'USERNAME' with your Docker Hub username
sed -i 's/USERNAME/yourusername/g' docker-compose.build.yml
sed -i 's/USERNAME/yourusername/g' docker-compose.yml
```

### 2️⃣ Build & Push (Local machine)

```bash
# Login
docker login

# Build images (5-10 min)
docker compose -f docker-compose.build.yml build

# Push to Docker Hub (2-5 min)
docker compose -f docker-compose.build.yml push

# Or use script:
./build-and-push.sh
```

### 3️⃣ Deploy (VPS)

```bash
# Pull images (2-3 min)
docker compose pull

# Start services
docker compose up -d

# Or use script:
./deploy-vps.sh
```

---

## 🔄 Update Workflow

**After code changes:**

```bash
# Local:
./build-and-push.sh

# VPS:
./deploy-vps.sh
```

---

## ✅ Verification

```bash
# Check containers
docker compose ps

# View logs
docker compose logs -f

# Test endpoints
curl http://localhost:3000        # Frontend
curl http://localhost:1337/_health # Backend
```

---

## 🆘 Common Issues

**"repository does not exist"**

```bash
# Ensure images are pushed
docker compose -f docker-compose.build.yml push
```

**"not logged in"**

```bash
docker login
```

**Services not starting**

```bash
# Check logs
docker compose logs -f

# Verify .env file exists and has correct values
cat .env
```

---

## 📂 Required Files

**On Local:**

- `docker-compose.build.yml` ✓
- `client/Dockerfile` ✓
- `server/Dockerfile` ✓

**On VPS:**

- `docker-compose.yml` ✓
- `.env` (create from .env.example)

---

## 🎯 Why This Method?

| Traditional           | Docker Hub           |
| --------------------- | -------------------- |
| Build on VPS: 1+ hour | Pull images: 2-3 min |
| OOM on 2GB VPS        | Works on any VPS     |
| May fail              | Always works         |

---

## 📖 Full Documentation

See `DOCKER_HUB_DEPLOYMENT.md` for complete guide.
