import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Enable Turbopack
  experimental: {
    externalDir: true,
    // turbo: {
    //   resolveAlias: {
    //     // Ensure path aliases work with Turbopack
    //     '@': [path.resolve(__dirname, './src')],
    //   },
    // },
  },
  // Webpack configuration for fallback
  webpack: (config, { isServer }) => {
    // Configure path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    };

    // Important: return the modified config
    return config;
  },
  // TypeScript configuration
  typescript: {
    // Enable TypeScript type checking during build
    ignoreBuildErrors: false,
  },
  // ESLint configuration
  eslint: {
    // Enable ESLint during production builds
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
