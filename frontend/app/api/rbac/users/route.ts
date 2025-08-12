import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, hasRole } from "../../../../lib/auth-middleware";
import { prisma } from "@/lib/prisma";

// GET /api/rbac/users - List users (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasRole(user, "ADMIN")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const search = searchParams.get("search");
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const skip = (page - 1) * limit;

    let whereClause: any = {};

    // Add search filter
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    // Add role filter
    if (role && role !== "all") {
      whereClause.rolePrimary = role;
    }

    // Add status filter
    if (status && status !== "all") {
      whereClause.status = status;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          TeamMemberships: {
            where: { leftAt: null },
            include: {
              Team: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          UserRoles: {
            include: {
              Role: {
                select: {
                  code: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
          Onboarding: {
            select: {
              status: true,
              step: true,
            },
          },
        },
        orderBy: [
          { rolePrimary: "desc" }, // Admins first
          { createdAt: "desc" },
        ],
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Users fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
