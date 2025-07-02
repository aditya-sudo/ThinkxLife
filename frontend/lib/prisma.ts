import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Serverless-optimized Prisma client configuration
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Serverless configuration
  ...(process.env.NODE_ENV === 'production' && {
    log: ['error'],
    errorFormat: 'minimal',
  }),
  // Development configuration
  ...(process.env.NODE_ENV !== 'production' && {
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  }),
})

// Ensure single instance in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})
