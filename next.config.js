/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/macrobius-app',
  assetPrefix: '/macrobius-app/',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig