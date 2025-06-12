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
  webpack: (config, { isServer }) => {
    // Ensure proper path resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'),
    }

    // Handle Prisma client properly
    if (isServer) {
      config.externals.push('@prisma/client')
    }

    return config
  },
}

module.exports = nextConfig
