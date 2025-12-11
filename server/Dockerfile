# Stage 1: Dependencies
FROM node:20-alpine AS deps

WORKDIR /app

# Install build dependencies for native modules (required by some Strapi plugins)
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy package files for dependency caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
# Add timeout and retry for unstable VPS network
RUN npm config set fetch-timeout 600000 && \
    npm config set fetch-retries 5 && \
    npm ci --prefer-offline --no-audit --progress=false || \
    npm ci --no-audit --progress=false

# Stage 2: Build
FROM node:20-alpine AS build

WORKDIR /app

# Install runtime dependencies for build process
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application code
COPY . .

# ===================================================================
# MEMORY OPTIMIZATION FOR 2GB VPS (targeting ~1GB build budget)
# ===================================================================
# Limit Node.js heap to 512MB (safe for 2GB VPS with OS overhead)
# This prevents OOM kills during Strapi admin panel build
ENV NODE_OPTIONS="--max-old-space-size=512"

# Reduce thread pool size to limit concurrent operations
ENV UV_THREADPOOL_SIZE=2

# Disable remote data transfer to reduce memory overhead
ENV STRAPI_DISABLE_REMOTE_DATA_TRANSFER=true

# Build Strapi admin panel and compile TypeScript
# The admin build is the most memory-intensive step
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS production

WORKDIR /app

# Install only runtime dependencies (no build tools needed)
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install production dependencies only (much smaller, faster)
# Add timeout and retry for unstable VPS network
RUN npm config set fetch-timeout 600000 && \
    npm config set fetch-retries 5 && \
    npm ci --omit=dev --prefer-offline --no-audit --progress=false || \
    npm ci --omit=dev --no-audit --progress=false

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
# Copy compiled config and src from dist, not source
COPY --from=build /app/dist/config ./config
COPY --from=build /app/database ./database
COPY --from=build /app/dist/src ./src

# Create uploads directory (will be mounted as volume)
RUN mkdir -p /app/public/uploads

# Link admin build to where Strapi expects it in production
RUN mkdir -p /app/node_modules/@strapi/admin/dist/server/server && \
    ln -sf /app/dist/build /app/node_modules/@strapi/admin/dist/server/server/build

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

# Runtime memory limit (384MB) - sufficient for Strapi production on 2GB VPS
# Build stage uses 512MB, runtime can use less
ENV NODE_OPTIONS="--max-old-space-size=384"
ENV UV_THREADPOOL_SIZE=2

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:1337/_health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start Strapi
CMD ["npm", "run", "start"]
