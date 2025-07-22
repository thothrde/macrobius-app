/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 🔧 CRITICAL CORS FIX: Enable Oracle Cloud HTTP access from HTTPS deployment
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Client-Version, X-Request-ID' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
      {
        // Mixed Content Policy fix for Oracle Cloud HTTP backend
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'self'; connect-src 'self' http://152.70.184.232:8080 https://152.70.184.232:8080; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:;" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
  
  // 🔧 Enhanced rewrites for Oracle Cloud proxy
  async rewrites() {
    return [
      {
        source: '/api/oracle/:path*',
        destination: 'http://152.70.184.232:8080/api/:path*',
      },
    ];
  },
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exclude capital duplicate files to avoid case sensitivity conflicts
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components/ui/Button': require.resolve('./src/components/ui/button.tsx'),
      '@/components/ui/Card': require.resolve('./src/components/ui/card.tsx')
    };
    
    // Ignore capital duplicate files during build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/src/components/ui/Button.tsx',
        '**/src/components/ui/Card.tsx'
      ]
    };
    
    return config;
  },
  
  // 🔧 Environment variables for Oracle Cloud integration
  env: {
    NEXT_PUBLIC_API_URL: 'http://152.70.184.232:8080',
    NEXT_PUBLIC_HTTPS_API_URL: 'https://152.70.184.232:8080',
    NEXT_PUBLIC_RAG_PORT: '8080',  // Unified RAG port
  },
};

module.exports = nextConfig;