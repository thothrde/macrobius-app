/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/macrobius-app',
  assetPrefix: '/macrobius-app/',
  images: { unoptimized: true },
  trailingSlash: true,
}

module.exports = nextConfig