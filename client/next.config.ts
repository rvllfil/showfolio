import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip static generation during Docker build (Strapi not running yet)
  output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,

  // ===================================================================
  // MEMORY OPTIMIZATION FOR 2GB VPS
  // ===================================================================
  // Next.js 16 uses Turbopack by default - configure for low memory
  experimental: {
    // Limit concurrent compilations (reduces memory usage)
    workerThreads: false,
    cpus: 1,
  },

  // Empty turbopack config to silence warning and use Turbopack defaults
  // Turbopack is more memory efficient than webpack
  turbopack: {},

  // Disable source maps in production to save memory during build
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
