import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

// GET /api/health - Health check for database connectivity
export async function GET(request: NextRequest) {
  try {
    // Test database connectivity
    await prisma.$queryRaw`SELECT 1`
    
    // Get basic stats
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      status: "healthy",
      database: "connected",
      userCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Health check failed:", error)
    
    return NextResponse.json({
      status: "unhealthy",
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }, { status: 503 })
  }
} 