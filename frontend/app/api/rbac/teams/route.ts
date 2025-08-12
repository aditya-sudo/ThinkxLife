import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser, hasRole, logAudit } from "../../../../lib/auth-middleware";
import { prisma } from "@/lib/prisma";

const createTeamSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  leadId: z.string().optional(),
});

// GET /api/rbac/teams - List teams (with role-based filtering)
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const skip = (page - 1) * limit;

    let whereClause = {};

    // Non-admins can only see teams they're members of
    if (!hasRole(user, "ADMIN")) {
      const userTeamIds = user.teamMemberships?.map(tm => tm.teamId) || [];
      whereClause = {
        id: { in: userTeamIds },
      };
    }

    const [teams, total] = await Promise.all([
      (prisma as any).team.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          Lead: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          Members: {
            where: { leftAt: null },
            include: {
              User: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  rolePrimary: true,
                  status: true,
                },
              },
            },
          },
          _count: {
            select: {
              Members: {
                where: { leftAt: null },
              },
            },
          },
        },
        orderBy: { name: "asc" },
      }),
      (prisma as any).team.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      teams,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Teams fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/rbac/teams - Create team (admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasRole(user, "ADMIN")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = createTeamSchema.parse(body);

    // Validate team lead if provided
    if (validatedData.leadId) {
      const leadUser = await (prisma as any).user.findUnique({
        where: { id: validatedData.leadId },
      });

      if (!leadUser) {
        return NextResponse.json({ error: "Team lead not found" }, { status: 400 });
      }

      // Convert Prisma user to AuthUser format for hasRole check
      const authUser = {
        id: leadUser.id,
        email: leadUser.email,
        name: leadUser.name || undefined,
        rolePrimary: leadUser.rolePrimary as any,
        status: leadUser.status as any,
        teamMemberships: [],
        userRoles: [],
      };
      
      if (!hasRole(authUser, "TEAM_LEAD")) {
        return NextResponse.json({ error: "User must have TEAM_LEAD role" }, { status: 400 });
      }
    }

    const team = await (prisma as any).team.create({
      data: validatedData,
      include: {
        Lead: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Members: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                email: true,
                rolePrimary: true,
                status: true,
              },
            },
          },
        },
      },
    });

    // Log the creation
    await logAudit(
      user.id,
      "CREATE_TEAM",
      "TEAM",
      team.id,
      validatedData
    );

    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Team creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
