import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Serverless-optimized Prisma client configuration
const createPrismaClient = (disablePreparedStatements = false) => {
  // For serverless, optionally disable prepared statements by modifying the connection URL
  let databaseUrl = process.env.DATABASE_URL
  
  if (disablePreparedStatements && process.env.NODE_ENV === 'production' && databaseUrl) {
    // Add PostgreSQL parameter to disable prepared statements
    const separator = databaseUrl.includes('?') ? '&' : '?'
    databaseUrl = `${databaseUrl}${separator}prepared_statements=false`
  }
  
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    // Serverless configuration
    ...(process.env.NODE_ENV === 'production' && {
      log: ['error'],
      errorFormat: 'minimal',
      // Optimize for serverless
      transactionOptions: {
        timeout: 5000, // 5 second timeout
        isolationLevel: 'ReadCommitted',
      },
    }),
    // Development configuration
    ...(process.env.NODE_ENV !== 'production' && {
      log: ['query', 'error', 'warn'],
      errorFormat: 'pretty',
      transactionOptions: {
        timeout: 10000, // 10 second timeout for dev
      },
    }),
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Function to create a fresh client when needed (for error recovery)
export const createFreshPrismaClient = () => createPrismaClient(true) // Disable prepared statements for recovery

// Ensure single instance in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})
