# Building Showfolio on 2GB VPS

This guide explains how to safely build and deploy Showfolio on a VPS with only 2GB of RAM.

## Memory Optimizations Applied

Both Dockerfiles have been optimized for 2GB VPS with careful memory allocation:

### Server (Strapi Backend)

- **Build memory**: 1152MB / 1.125GB (`NODE_OPTIONS=--max-old-space-size=1152`)
  - Strapi v5 admin panel build requires ~1GB+ minimum (tested: 896MB fails)
  - This is unavoidable - Strapi has extremely heavy Vite/webpack builds
  - Added Vite config optimizations to reduce memory pressure
- **Runtime memory**: 512MB
- **Runtime limit**: 640MB (docker-compose)
- **Thread pool**: Limited to 2 threads (`UV_THREADPOOL_SIZE=2`)
- **Semi-space**: 64MB (reduced for memory efficiency)
- **Optimization flags**: `--optimize-for-size` enabled

### Client (Next.js Frontend)

- **Build memory**: 512MB (`NODE_OPTIONS=--max-old-space-size=512`)
- **Runtime memory**: 320MB
- **Runtime limit**: 512MB (docker-compose)
- **Parallelism**: Reduced to 1 worker (`cpus: 1` in next.config.ts)
- **Source maps**: Disabled in production

## Recommended Build Process on 2GB VPS

### ⚠️ IMPORTANT: Build Services Sequentially

**DO NOT** run `docker compose up --build` on a 2GB VPS - this builds services in parallel and will cause OOM (Out of Memory) errors.

### Step-by-Step Build Process

```bash
# 1. Navigate to project directory
cd /path/to/showfolio

# 2. (Optional) Stop other services to free memory
docker compose down

# 3. (Optional) Clear system cache to free memory
sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'

# 4. Build Strapi backend FIRST (most memory-intensive)
docker compose build server

# 5. Wait for server build to complete, then build Next.js frontend
docker compose build client

# 6. Start all services
docker compose up -d

# 7. Check logs
docker compose logs -f
```

### Build Time Expectations

On a 2GB VPS with the optimizations:

- **Strapi build**: 5-10 minutes (admin panel build is slow but memory-safe)
- **Next.js build**: 2-5 minutes
- **Total**: ~10-15 minutes

## Memory Usage During Operations

| Operation                  | Server | Client | Total   | VPS Headroom |
| -------------------------- | ------ | ------ | ------- | ------------ |
| **Build** (sequential)     | 1152MB | -      | ~1152MB | ~850MB free  |
| **Build** (sequential)     | -      | 512MB  | ~512MB  | ~1.5GB free  |
| **Runtime** (all services) | 512MB  | 320MB  | ~832MB  | ~1.2GB free  |

**Critical Notes**:

- Strapi v5 admin panel build requires **1GB+ minimum** (tested: 896MB fails, 512MB fails)
- This is a hard limitation of Strapi's Vite/webpack build process
- The build leaves only ~850MB free on 2GB VPS - ensure swap is enabled
- If build fails: stop ALL other services, clear cache, ensure 4GB swap

## Troubleshooting

### Build Fails with OOM or SIGKILL

If builds still fail with Out of Memory errors:

1. **Increase swap space temporarily**:

   ```bash
   # Check current swap
   swapon --show

   # If you have <4GB swap, increase it temporarily
   sudo swapoff -a
   sudo dd if=/dev/zero of=/swapfile bs=1G count=4
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile

   # Now try building again
   docker compose build server
   ```

2. **Free up more memory before building**:

   ```bash
   # Stop all Docker containers
   docker stop $(docker ps -aq)

   # Remove unused Docker resources
   docker system prune -af

   # Clear system caches
   sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'

   # Now build
   docker compose build server
   ```

3. **Monitor memory during build**:

   ```bash
   # In another terminal, watch memory usage
   watch -n 1 free -h

   # Or monitor Docker stats
   docker stats
   ```

### Alternative: Build on Larger Machine

If your VPS consistently runs out of memory, consider this workflow:

```bash
# On your local machine (or CI/CD with more RAM):
docker compose build

# Tag images
docker tag showfolio-server:latest yourregistry/showfolio-server:latest
docker tag showfolio-client:latest yourregistry/showfolio-client:latest

# Push to registry (Docker Hub, GitHub Container Registry, etc.)
docker push yourregistry/showfolio-server:latest
docker push yourregistry/showfolio-client:latest

# On VPS, update docker-compose.yml to use pre-built images:
# Instead of 'build:', use 'image: yourregistry/showfolio-server:latest'

# Then on VPS:
docker compose pull
docker compose up -d
```

## Configuration Files Modified

The following files have been optimized for 2GB VPS:

- `server/Dockerfile` - Reduced memory limits and added concurrency controls
- `client/Dockerfile` - Reduced memory limits and added concurrency controls
- `client/next.config.ts` - Disabled worker threads, limited CPU to 1, disabled source maps
- `docker-compose.yml` - Added runtime memory limits and build instructions

## Verification

After successful build, verify everything is working:

```bash
# Check all containers are running
docker compose ps

# Check memory usage
docker stats --no-stream

# Check Strapi health
curl http://localhost:1337/_health

# Check Next.js health
curl http://localhost:3000

# View logs
docker compose logs -f server
docker compose logs -f client
```

## Performance Expectations

With these memory optimizations on a 2GB VPS:

- **Build**: Slower than on a 16GB machine, but stable and memory-safe
- **Runtime**: Normal performance, no degradation
- **Functionality**: 100% identical to builds on larger machines

The optimizations only affect the build process, not the application behavior.

## Need Help?

If you still experience OOM errors after following this guide:

1. Check your VPS has at least 2GB RAM: `free -h`
2. Verify swap is enabled: `swapon --show`
3. Try the "build on larger machine" approach above
4. Consider upgrading to a 4GB VPS for more comfortable builds
