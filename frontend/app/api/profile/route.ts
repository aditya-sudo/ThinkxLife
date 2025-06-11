import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
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
export async function GET() {
  try {
    console.log("Profile API: Starting GET request")
    const session = await getServerSession(authOptions)
    console.log("Profile API: Session:", session ? "exists" : "null", session?.user?.id)

    if (!session?.user?.id) {
      console.log("Profile API: No session or user ID")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    console.log("Profile API: Querying user with ID:", session.user.id)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
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

    console.log("Profile API: User query result:", user ? "found" : "not found")

    if (!user) {
      console.log("Profile API: User not found in database")
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    console.log("Profile API: Returning user data")
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/profile - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = profileUpdateSchema.parse(body)

    // Convert dateOfBirth string to Date if provided
    const updateData: any = { ...validatedData }
    if (validatedData.dateOfBirth) {
      updateData.dateOfBirth = new Date(validatedData.dateOfBirth)
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
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

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
