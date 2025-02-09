/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/macrobius-app',
  assetPrefix: '/macrobius-app/',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js'
  },
  reactStrictMode: true,
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  }
}

module.exports = nextConfig