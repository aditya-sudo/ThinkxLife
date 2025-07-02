import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"
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

    const user = await prisma.user.findUnique({
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

    if (!user) {
      console.error("Profile API: User not found in database for email:", session.user.email)
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    console.log("Profile API: Successfully found user:", user.id)
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Profile fetch error:", error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown error type'
    })
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
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

    const updatedUser = await prisma.user.update({
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

    console.log("Profile Update API: Successfully updated user:", updatedUser.id)
    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser
    })
  } catch (error) {
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
      name: error instanceof Error ? error.name : 'Unknown error type'
    })
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
