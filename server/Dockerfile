# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build Strapi
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
# Copy compiled config and src from dist, not source
COPY --from=build /app/dist/config ./config
COPY --from=build /app/database ./database
COPY --from=build /app/dist/src ./src

# Create uploads directory
RUN mkdir -p /app/public/uploads

# Link admin build to where Strapi expects it in production
RUN mkdir -p /app/node_modules/@strapi/admin/dist/server/server && \
    ln -sf /app/dist/build /app/node_modules/@strapi/admin/dist/server/server/build

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:1337/_health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start Strapi
CMD ["npm", "run", "start"]
