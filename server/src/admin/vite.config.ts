import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  // Memory optimization for 2GB VPS builds
  // Strapi admin panel build is very memory-intensive
  return mergeConfig(config, {
    build: {
      // Reduce chunk size to lower memory usage
      chunkSizeWarningLimit: 1000,

      // Disable source maps to save memory during build
      sourcemap: false,

      // Reduce build concurrency
      rollupOptions: {
        output: {
          // Limit number of parallel processes
          manualChunks: undefined,
        },
        // Reduce memory usage during rollup
        maxParallelFileOps: 1,
      },
    },

    // Optimize dependencies processing
    optimizeDeps: {
      // Reduce memory usage during dependency optimization
      force: false,
    },

    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
