/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exclude capital duplicate files to avoid case sensitivity conflicts
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components/ui/Button': require.resolve('./src/components/ui/button.tsx'),
      '@/components/ui/Card': require.resolve('./src/components/ui/card.tsx'),
      '@/components/ui/Input': require.resolve('./src/components/ui/input.tsx')
    };
    
    // Ignore capital duplicate files during build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/src/components/ui/Button.tsx',
        '**/src/components/ui/Card.tsx', 
        '**/src/components/ui/Input.tsx'
      ]
    };
    
    return config;
  }
};

module.exports = nextConfig;