/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: {
    appDir: false
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false
    };
    return config;
  }
}

module.exports = nextConfig