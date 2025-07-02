import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Serverless-optimized Prisma client configuration
const createPrismaClient = () => {
  // For serverless environments, disable prepared statements globally to prevent conflicts
  let databaseUrl = process.env.DATABASE_URL
  
  if (process.env.NODE_ENV === 'production' && databaseUrl) {
    // Disable prepared statements in production (serverless) to prevent "s0 already exists" errors
    const separator = databaseUrl.includes('?') ? '&' : '?'
    const params = [
      'prepared_statements=false',
      'statement_cache_size=0',
      'plan_cache_mode=force_generic_plan'
    ]
    databaseUrl = `${databaseUrl}${separator}${params.join('&')}`
    console.log('Prisma: Prepared statements disabled for serverless environment')
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

// Ensure single instance in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})
