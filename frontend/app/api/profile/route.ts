import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import { prisma, createFreshPrismaClient, findUserByEmailRaw, updateUserByEmailRaw } from "../../../lib/prisma"
import { z } from "zod"

const profileUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  theme: z.enum(["light", "dark"]).optional(),
  notifications: z.boolean().optional(),
  newsletter: z.boolean().optional(),
})

// GET /api/profile - Get current user's profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      console.error("Profile API: No session or email found")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Note: Prisma auto-connects on first query, no need to manually connect

    console.log("Profile API: Looking for user with email:", session.user.email)

    // Handle guest users who don't exist in database
    if (session.user.email === "guest@thinkxlife.com" || session.user.id === "guest-user") {
      console.log("Profile API: Returning guest user profile")
      const guestUser = {
        id: "guest-user",
        name: "Guest User",
        email: "guest@thinkxlife.com",
        firstName: "Guest",
        lastName: "User",
        bio: "Welcome to ThinkxLife! This is a guest account for exploring our platform.",
        phone: null,
        dateOfBirth: null,
        location: null,
        website: null,
        theme: "light",
        notifications: true,
        newsletter: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return NextResponse.json({ user: guestUser })
    }

    // Progressive retry logic with multiple fallback strategies
    let user = null
    let retryCount = 0
    const maxRetries = 4 // Increased to allow for raw query fallback
    let currentClient = prisma // Start with the default client
    let useRawQuery = false

    while (retryCount < maxRetries && !user) {
      try {
        if (useRawQuery) {
          // Final fallback: use raw SQL query to completely bypass prepared statements
          user = await findUserByEmailRaw(currentClient, session.user.email)
        } else {
          // Standard Prisma query
          user = await currentClient.user.findUnique({
            where: { email: session.user.email },
            select: {
              id: true,
              name: true,
              email: true,
              firstName: true,
              lastName: true,
              bio: true,
              phone: true,
              dateOfBirth: true,
              location: true,
              website: true,
              theme: true,
              notifications: true,
              newsletter: true,
              createdAt: true,
              updatedAt: true,
            }
          })
        }
        break
      } catch (dbError: any) {
        retryCount++
        console.error(`Profile API: Database query attempt ${retryCount} failed:`, dbError?.message)
        
        // Handle specific Prisma/PostgreSQL errors
        if (dbError?.message?.includes('prepared statement') || 
            dbError?.code === 'P2024' || 
            dbError?.code === 'P2002') {
          
          if (retryCount < maxRetries) {
            console.log(`Profile API: Retrying database query (${retryCount}/${maxRetries})`)
            
            if (dbError?.message?.includes('prepared statement')) {
              if (retryCount === 1) {
                // First retry: use fresh client with disabled prepared statements
                console.log('Profile API: Creating fresh client with disabled prepared statements')
                try {
                  await currentClient.$disconnect()
                } catch (disconnectError) {
                  console.log('Profile API: Error during disconnect (continuing anyway):', disconnectError)
                }
                currentClient = createFreshPrismaClient()
              } else if (retryCount >= 2) {
                // Final retries: use raw SQL queries
                console.log('Profile API: Switching to raw SQL query fallback')
                useRawQuery = true
                // Keep the current client but switch to raw queries
              }
            }
            
            // Wait with exponential backoff + random jitter to prevent thundering herd
            const baseDelay = Math.pow(2, retryCount) * 100
            const jitter = Math.random() * 100
            await new Promise(resolve => setTimeout(resolve, baseDelay + jitter))
            continue
          }
        }
        
        // If it's not a retryable error or we've exhausted retries, throw
        throw dbError
      }
    }

    if (!user) {
      console.error("Profile API: User not found in database for email:", session.user.email)
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    console.log("Profile API: Successfully found user:", user.id)
    
    // Cleanup connection in serverless
    if (process.env.NODE_ENV === 'production') {
      try {
        await currentClient.$disconnect()
      } catch (disconnectError) {
        console.log('Profile API: Cleanup disconnect had issues (ignoring):', disconnectError)
      }
    }
    
    return NextResponse.json({ user })
  } catch (error: any) {
    console.error("Profile fetch error:", error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown error type',
      code: error?.code,
      clientVersion: error?.clientVersion
    })

    // Handle specific database connection errors
    if (error?.message?.includes('prepared statement') || 
        error?.message?.includes('ConnectorError') ||
        error?.code === 'P2024') {
      return NextResponse.json(
        { 
          error: "Database connection issue", 
          details: "We're experiencing high traffic. Please try again in a moment.",
          retryable: true
        },
        { status: 503 }
      )
    }

    // Handle general database errors
    if (error?.code?.startsWith('P') || error?.clientVersion) {
      return NextResponse.json(
        { 
          error: "Database error", 
          details: "We're having trouble accessing your data. Please try again.",
          retryable: true
        },
        { status: 503 }
      )
    }

    // Generic error fallback
    // Cleanup connection on error in serverless
    if (process.env.NODE_ENV === 'production') {
      try {
        await prisma.$disconnect()
      } catch (disconnectError) {
        console.log('Profile API: Error cleanup disconnect had issues (ignoring):', disconnectError)
      }
    }
    
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : 'Unknown error',
        retryable: false
      },
      { status: 500 }
    )
  }
}

// PUT /api/profile - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      console.error("Profile Update API: No session or email found")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = profileUpdateSchema.parse(body)

    console.log("Profile Update API: User email:", session.user.email)

    // Handle guest users who can't update database
    if (session.user.email === "guest@thinkxlife.com" || session.user.id === "guest-user") {
      console.log("Profile Update API: Guest user attempted to update profile")
      return NextResponse.json(
        { error: "Guest users cannot update their profile. Please create a full account to save changes." },
        { status: 403 }
      )
    }

    // Note: Prisma auto-connects on first query, no need to manually connect

    // Progressive retry logic with multiple fallback strategies
    let updatedUser = null
    let retryCount = 0
    const maxRetries = 4 // Increased to allow for raw query fallback
    let currentClient = prisma // Start with the default client
    let useRawQuery = false

    while (retryCount < maxRetries && !updatedUser) {
      try {
        if (useRawQuery) {
          // Final fallback: use raw SQL query to completely bypass prepared statements
          updatedUser = await updateUserByEmailRaw(currentClient, session.user.email, validatedData)
        } else {
          // Standard Prisma query
          updatedUser = await currentClient.user.update({
            where: { email: session.user.email },
            data: {
              ...validatedData,
              updatedAt: new Date(),
            },
            select: {
              id: true,
              name: true,
              email: true,
              firstName: true,
              lastName: true,
              bio: true,
              phone: true,
              dateOfBirth: true,
              location: true,
              website: true,
              theme: true,
              notifications: true,
              newsletter: true,
              createdAt: true,
              updatedAt: true,
            }
          })
        }
        break
      } catch (dbError: any) {
        retryCount++
        console.error(`Profile Update API: Database query attempt ${retryCount} failed:`, dbError?.message)
        
        // Handle specific Prisma/PostgreSQL errors
        if (dbError?.message?.includes('prepared statement') || 
            dbError?.code === 'P2024' || 
            dbError?.code === 'P2002') {
          
          if (retryCount < maxRetries) {
            console.log(`Profile Update API: Retrying database query (${retryCount}/${maxRetries})`)
            
            if (dbError?.message?.includes('prepared statement')) {
              if (retryCount === 1) {
                // First retry: use fresh client with disabled prepared statements
                console.log('Profile Update API: Creating fresh client with disabled prepared statements')
                try {
                  await currentClient.$disconnect()
                } catch (disconnectError) {
                  console.log('Profile Update API: Error during disconnect (continuing anyway):', disconnectError)
                }
                currentClient = createFreshPrismaClient()
              } else if (retryCount >= 2) {
                // Final retries: use raw SQL queries
                console.log('Profile Update API: Switching to raw SQL query fallback')
                useRawQuery = true
                // Keep the current client but switch to raw queries
              }
            }
            
            // Wait with exponential backoff + random jitter to prevent thundering herd
            const baseDelay = Math.pow(2, retryCount) * 100
            const jitter = Math.random() * 100
            await new Promise(resolve => setTimeout(resolve, baseDelay + jitter))
            continue
          }
        }
        
        // If it's not a retryable error or we've exhausted retries, throw
        throw dbError
      }
    }

    if (!updatedUser) {
      console.error("Profile Update API: Failed to update user after all retries")
      return NextResponse.json(
        { 
          error: "Database update failed", 
          details: "Unable to update profile after multiple attempts. Please try again.",
          retryable: true
        },
        { status: 503 }
      )
    }

    console.log("Profile Update API: Successfully updated user:", updatedUser.id)
    
    // Cleanup connection in serverless
    if (process.env.NODE_ENV === 'production') {
      try {
        await currentClient.$disconnect()
      } catch (disconnectError) {
        console.log('Profile Update API: Cleanup disconnect had issues (ignoring):', disconnectError)
      }
    }
    
    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser
    })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Profile update error:", error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown error type',
      code: error?.code,
      clientVersion: error?.clientVersion
    })

    // Handle specific database connection errors
    if (error?.message?.includes('prepared statement') || 
        error?.message?.includes('ConnectorError') ||
        error?.code === 'P2024') {
      return NextResponse.json(
        { 
          error: "Database connection issue", 
          details: "We're experiencing high traffic. Please try again in a moment.",
          retryable: true
        },
        { status: 503 }
      )
    }

    // Handle general database errors
    if (error?.code?.startsWith('P') || error?.clientVersion) {
      return NextResponse.json(
        { 
          error: "Database error", 
          details: "We're having trouble accessing your data. Please try again.",
          retryable: true
        },
        { status: 503 }
      )
    }

    // Generic error fallback
    // Cleanup connection on error in serverless
    if (process.env.NODE_ENV === 'production') {
      try {
        await prisma.$disconnect()
      } catch (disconnectError) {
        console.log('Profile Update API: Error cleanup disconnect had issues (ignoring):', disconnectError)
      }
    }
    
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : 'Unknown error',
        retryable: false
      },
      { status: 500 }
    )
  }
}
