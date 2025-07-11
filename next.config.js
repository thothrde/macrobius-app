/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true
  },
  // Ignore mobile directory and TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['localhost'],
    unoptimized: true
  }
};

module.exports = nextConfig;