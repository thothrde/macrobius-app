/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/macrobius-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/macrobius-app/' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  experimental: {
    optimizeCss: true
  }
}

module.exports = nextConfig