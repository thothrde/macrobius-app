/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/macrobius-app',
  assetPrefix: '/macrobius-app/',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
}

module.exports = nextConfig