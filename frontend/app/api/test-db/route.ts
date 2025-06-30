import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    // Check if users table is accessible
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: "success",
      message: "Database connection working",
      testQuery: result,
      userCount: userCount,
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set"
    });
    
  } catch (error: any) {
    console.error("Database test error:", error);
    
    return NextResponse.json({
      status: "error",
      message: error.message,
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set"
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 