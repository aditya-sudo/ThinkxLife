import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log("🔍 Debug Auth - Email:", email);
    console.log("🔍 Debug Auth - Password length:", password?.length);

    if (!email || !password) {
      return NextResponse.json({
        error: "Email and password required",
        step: "validation"
      }, { status: 400 });
    }

    // Test database connection
    try {
      await prisma.$connect();
      console.log("✅ Database connection successful");
    } catch (dbError: any) {
      console.error("❌ Database connection failed:", dbError.message);
      return NextResponse.json({
        error: "Database connection failed",
        step: "database_connection",
        details: dbError.message
      }, { status: 500 });
    }

    // Check if user exists
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });
      console.log("🔍 User found:", !!user);
      console.log("🔍 User has password:", !!user?.password);
    } catch (findError: any) {
      console.error("❌ User lookup failed:", findError.message);
      return NextResponse.json({
        error: "User lookup failed",
        step: "user_lookup",
        details: findError.message
      }, { status: 500 });
    }

    if (!user || !user.password) {
      return NextResponse.json({
        error: "User not found or no password set",
        step: "user_validation",
        userExists: !!user,
        hasPassword: !!user?.password
      }, { status: 401 });
    }

    // Test password comparison
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("🔍 Password valid:", isPasswordValid);
      
      if (!isPasswordValid) {
        return NextResponse.json({
          error: "Invalid password",
          step: "password_validation"
        }, { status: 401 });
      }

      return NextResponse.json({
        success: true,
        message: "Authentication successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });

    } catch (bcryptError: any) {
      console.error("❌ Password comparison failed:", bcryptError.message);
      return NextResponse.json({
        error: "Password comparison failed",
        step: "password_comparison",
        details: bcryptError.message
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("❌ Debug auth error:", error);
    return NextResponse.json({
      error: "Authentication debug failed",
      step: "general_error",
      details: error.message
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 