import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip static generation during Docker build (Strapi not running yet)
  output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,

  // ===================================================================
  // MEMORY OPTIMIZATION FOR 2GB VPS
  // ===================================================================
  // Reduce build workers to prevent memory spikes
  experimental: {
    // Limit concurrent compilations (reduces memory usage)
    workerThreads: false,
    cpus: 1,
  },

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

  // Optimize webpack for low-memory environments
  webpack: (config, { isServer }) => {
    // Limit parallelism to reduce memory usage
    config.parallelism = 1;

    // Optimize memory usage
    config.optimization = {
      ...config.optimization,
      // Reduce memory overhead during builds
      moduleIds: "deterministic",
      minimize: true,
    };

    return config;
  },
};

export default nextConfig;
