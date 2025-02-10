/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/macrobius-app',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/macrobius-app',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js'
  },
  trailingSlash: true,
  experimental: {
    appDir: false
  }
}

module.exports = nextConfig