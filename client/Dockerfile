# Stage 1: Dependencies
FROM node:20-alpine AS deps

WORKDIR /app

# Install build dependencies for native modules (if needed)
RUN apk add --no-cache libc6-compat

# Copy package files for dependency caching
COPY package*.json ./

# Install dependencies with npm ci for reproducible builds
# Use --prefer-offline to use cache if available
# Add timeout and retry for unstable VPS network
RUN npm config set fetch-timeout 600000 && \
    npm config set fetch-retries 5 && \
    npm ci --prefer-offline --no-audit --progress=false || \
    npm ci --no-audit --progress=false

# Stage 2: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application code
COPY . .

# Set build-time environment variable
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV DOCKER_BUILD=true

# Optimize Node.js memory for low-spec VPS (limit to 768MB during build)
# Adjust this value based on your VPS RAM (512MB, 1GB, 2GB, etc.)
ENV NODE_OPTIONS="--max-old-space-size=768"

# Build Next.js application
# Using standalone output reduces final image size significantly
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS production

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Optimize Node.js memory for production runtime (384MB for low-spec VPS)
# Increase if your VPS has more RAM available
ENV NODE_OPTIONS="--max-old-space-size=384"

# Install only production runtime dependencies (if Next.js standalone is not used)
# Copy package files
COPY package*.json ./

# Install production dependencies only (faster, no dev deps)
# Add timeout and retry for unstable VPS network
RUN npm config set fetch-timeout 600000 && \
    npm config set fetch-retries 5 && \
    npm ci --omit=dev --prefer-offline --no-audit --progress=false || \
    npm ci --omit=dev --no-audit --progress=false

# Copy built application from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./
COPY --from=build /app/package.json ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 0

# Start Next.js
CMD ["npm", "run", "start"]
