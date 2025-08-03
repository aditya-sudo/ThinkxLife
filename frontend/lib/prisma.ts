import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Serverless-optimized Prisma client configuration
const createPrismaClient = () => {
  try {
    return new PrismaClient({
      // Serverless configuration
      ...(process.env.NODE_ENV === 'production' && {
        log: ['error'],
        errorFormat: 'minimal',
        // Optimize for serverless
        transactionOptions: {
          timeout: 10000, // 10 second timeout
          isolationLevel: 'ReadCommitted',
        },
      }),
      // Development configuration
      ...(process.env.NODE_ENV !== 'production' && {
        log: ['query', 'error', 'warn'],
        errorFormat: 'pretty',
        transactionOptions: {
          timeout: 15000, // 15 second timeout for dev
        },
      }),
    })
  } catch (error) {
    console.warn('[WARN] Prisma client creation failed, using fallback configuration:', error instanceof Error ? error.message : 'Unknown error');
    // Return a basic Prisma client if the above fails
    return new PrismaClient();
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Ensure single instance in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})
