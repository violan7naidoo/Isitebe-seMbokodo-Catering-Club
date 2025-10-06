import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
    serverActions: {
      // Empty object is valid and enables server actions
      // with default settings
    },
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  // Webpack configuration for fallback
  webpack: (config, { isServer }) => {
    // Configure path aliases
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    };

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
  // Image optimization
  images: {
    domains: [
      'labnagzwqyyvijjocfqt.supabase.co', // Your Supabase project reference
      'www.isithebesembokodo.co.za',     // Your domain
    ],
  },
};

export default nextConfig;