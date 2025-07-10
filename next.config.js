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
  }
};

module.exports = nextConfig;