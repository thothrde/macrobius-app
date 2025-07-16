/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed deprecated options for Next.js 15.4.1:
  // - swcMinify: true (now default)
  // - experimental.appDir (deprecated)
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exclude capital duplicate files to avoid case sensitivity conflicts
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components/ui/Button': require.resolve('./src/components/ui/button.tsx'),
      '@/components/ui/Card': require.resolve('./src/components/ui/card.tsx')
      // Removed Input alias since input.tsx doesn't exist
    };
    
    // Ignore capital duplicate files during build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/src/components/ui/Button.tsx',
        '**/src/components/ui/Card.tsx'
        // Removed Input.tsx since it doesn't exist
      ]
    };
    
    return config;
  }
};

module.exports = nextConfig;