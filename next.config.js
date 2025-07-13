/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed deprecated options for Next.js 15 compatibility:
  // - swcMinify: true (now default)
  // - experimental.appDir (deprecated)
  env: {
    ORACLE_BACKEND_URL: 'http://152.70.184.232:8080',
    MACROBIUS_VERSION: '2.0.1'
  },
  async redirects() {
    return [
      {
        source: '/health',
        destination: '/api/status',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ]
  },
  // Optimize bundle for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true
};

module.exports = nextConfig;