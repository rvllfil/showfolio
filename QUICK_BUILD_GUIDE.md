# Quick Build Guide - 2GB VPS

## ⚠️ CRITICAL PRE-BUILD STEPS (DO NOT SKIP!)

```bash
# 1. Ensure swap is enabled (minimum 2GB, 4GB recommended)
swapon --show

# If no swap, create 4GB swap:
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
# Make permanent: echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 2. Stop ALL other Docker containers
docker stop $(docker ps -q)

# 3. Clear system cache
sudo sh -c 'sync; echo 3 > /proc/sys/vm/drop_caches'

# 4. Check available memory (should show >1.5GB free + swap)
free -h
```

## 🚀 Build Commands

```bash
cd ~/showfolio

# Build server (takes 5-10 min, uses 1.15GB RAM)
docker compose build server

# Wait for server to complete, then build client
docker compose build client

# Start services
docker compose up -d

# Check logs
docker compose logs -f
```

## 📊 Memory Requirements

- **Server build**: 1.15GB (leaves ~850MB for OS)
- **Client build**: 512MB (leaves ~1.5GB for OS)
- **Runtime total**: ~832MB (server 512MB + client 320MB)

## ❌ Common Errors

### "FATAL ERROR: JavaScript heap out of memory"

- **Cause**: Not enough memory for Strapi build
- **Fix**: Follow pre-build steps above, especially swap and stopping containers

### "SIGKILL" or build stops suddenly

- **Cause**: OS killed process due to memory pressure
- **Fix**: Increase swap to 4GB, stop ALL other services

## 🆘 If Build Still Fails

Your VPS may have:

- Less than 2GB actual RAM
- Other processes consuming memory
- Insufficient swap

**Alternative**: Build on a machine with more RAM:

```bash
# On local machine (16GB RAM):
docker compose build
docker tag showfolio-server:latest yourregistry/showfolio-server:latest
docker push yourregistry/showfolio-server:latest

# On VPS:
docker pull yourregistry/showfolio-server:latest
docker compose up -d
```

## ✅ Success Indicators

After build completes:

```bash
# All containers should be healthy
docker compose ps

# Should show server using ~400-600MB
docker stats --no-stream

# Strapi should respond
curl http://localhost:1337/_health

# Next.js should respond
curl http://localhost:3000
```
