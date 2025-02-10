/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: { unoptimized: true },
  assetPrefix: '.',
  trailingSlash: true,
  experimental: {
    appDir: false
  },
  webpack: (config) => {
    return config
  }
}

module.exports = nextConfig