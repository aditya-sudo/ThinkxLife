/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    }

    // Handle Prisma client properly
    if (isServer) {
      config.externals.push('@prisma/client')
    }

    return config
  },
}

module.exports = nextConfig
