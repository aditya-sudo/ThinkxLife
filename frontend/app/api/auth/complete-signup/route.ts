import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

const bodySchema = z.object({
  name: z.string().min(2).max(100),
  age: z.number().int().min(1).max(120),
  password: z.string().min(6),
})

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase.auth.getUser()
  if (!data.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const json = await req.json()
    const { name, age, password } = bodySchema.parse(json)

    const hashed = await bcrypt.hash(password, 12)
    const birthYear = new Date().getFullYear() - age
    const dateOfBirth = new Date(birthYear, 0, 1)

    const user = await prisma.user.upsert({
      where: { email: data.user.email },
      create: {
        email: data.user.email,
        name,
        password: hashed,
        dateOfBirth,
        updatedAt: new Date(),
      },
      update: {
        name,
        password: hashed,
        dateOfBirth,
        updatedAt: new Date(),
      }
    })

    return NextResponse.json({ ok: true, userId: user.id })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to complete signup" }, { status: 500 })
  }
}


