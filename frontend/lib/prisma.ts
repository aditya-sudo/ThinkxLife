import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Serverless-optimized Prisma client configuration
const createPrismaClient = (forceNoPreparedStatements = false) => {
  // For serverless, aggressively disable prepared statements using multiple approaches
  let databaseUrl = process.env.DATABASE_URL
  
  if (forceNoPreparedStatements && process.env.NODE_ENV === 'production' && databaseUrl) {
    // Try multiple PostgreSQL parameters to disable prepared statements
    const separator = databaseUrl.includes('?') ? '&' : '?'
    const params = [
      'prepared_statements=false',
      'preparedStatements=false', 
      'statement_cache_size=0',
      'plan_cache_mode=force_generic_plan',
      'application_name=ThinkxLife_NoCache'
    ]
    databaseUrl = `${databaseUrl}${separator}${params.join('&')}`
    console.log('Creating Prisma client with prepared statements disabled')
  }
  
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    // Serverless configuration
    ...(process.env.NODE_ENV === 'production' && {
      log: forceNoPreparedStatements ? ['query', 'error'] : ['error'], // More logging when debugging
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

// Raw query fallback functions to completely bypass prepared statements
export const findUserByEmailRaw = async (client: PrismaClient, email: string) => {
  console.log('Using raw SQL query fallback for user lookup')
  const result = await client.$queryRaw`
    SELECT id, name, email, "firstName", "lastName", bio, phone, "dateOfBirth", 
           location, website, theme, notifications, newsletter, "createdAt", "updatedAt"
    FROM "User" 
    WHERE email = ${email}
    LIMIT 1
  `
  return Array.isArray(result) && result.length > 0 ? result[0] : null
}

export const updateUserByEmailRaw = async (client: PrismaClient, email: string, data: any) => {
  console.log('Using raw SQL query fallback for user update')
  
  // Build the SET clause dynamically
  const setFields = []
  const values = []
  let paramIndex = 1
  
  if (data.firstName !== undefined) {
    setFields.push(`"firstName" = $${paramIndex++}`)
    values.push(data.firstName)
  }
  if (data.lastName !== undefined) {
    setFields.push(`"lastName" = $${paramIndex++}`)
    values.push(data.lastName)
  }
  if (data.bio !== undefined) {
    setFields.push(`bio = $${paramIndex++}`)
    values.push(data.bio)
  }
  if (data.phone !== undefined) {
    setFields.push(`phone = $${paramIndex++}`)
    values.push(data.phone)
  }
  if (data.dateOfBirth !== undefined) {
    setFields.push(`"dateOfBirth" = $${paramIndex++}`)
    values.push(data.dateOfBirth)
  }
  if (data.location !== undefined) {
    setFields.push(`location = $${paramIndex++}`)
    values.push(data.location)
  }
  if (data.website !== undefined) {
    setFields.push(`website = $${paramIndex++}`)
    values.push(data.website)
  }
  if (data.theme !== undefined) {
    setFields.push(`theme = $${paramIndex++}`)
    values.push(data.theme)
  }
  if (data.notifications !== undefined) {
    setFields.push(`notifications = $${paramIndex++}`)
    values.push(data.notifications)
  }
  if (data.newsletter !== undefined) {
    setFields.push(`newsletter = $${paramIndex++}`)
    values.push(data.newsletter)
  }
  
  // Always update the updatedAt field
  setFields.push(`"updatedAt" = $${paramIndex++}`)
  values.push(new Date())
  
  // Add email parameter for WHERE clause
  values.push(email)
  
  const query = `
    UPDATE "User" 
    SET ${setFields.join(', ')}
    WHERE email = $${paramIndex}
    RETURNING id, name, email, "firstName", "lastName", bio, phone, "dateOfBirth", 
              location, website, theme, notifications, newsletter, "createdAt", "updatedAt"
  `
  
  const result = await client.$queryRawUnsafe(query, ...values)
  return Array.isArray(result) && result.length > 0 ? result[0] : null
}

// Ensure single instance in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})
