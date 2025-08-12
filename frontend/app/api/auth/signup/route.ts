import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"
import { randomUUID } from "crypto"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: "Disabled" }, { status: 404 })
}
