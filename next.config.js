/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  assetPrefix: '/macrobius-app',
  basePath: '/macrobius-app',
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      process: false
    };
    return config;
  },
}

module.exports = nextConfig