import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser, hasRole, isTeamLead, logAudit } from "../../../../../lib/auth-middleware";
import { prisma } from "../../../../../lib/prisma";

const updateTeamSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  leadId: z.string().optional(),
  isActive: z.boolean().optional(),
});

// GET /api/rbac/teams/[teamId] - Get team details
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const { teamId } = params;

    // Check permissions - admin, team lead, or team member
    const canView = hasRole(user, "ADMIN") || 
      isTeamLead(user, teamId) ||
      user.teamMemberships?.some(tm => tm.teamId === teamId);

    if (!canView) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const team = await (prisma as any).team.findUnique({
      where: { id: teamId },
      include: {
        Lead: {
          select: {
            id: true,
            name: true,
            email: true,
            rolePrimary: true,
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
                createdAt: true,
              },
            },
          },
          orderBy: { joinedAt: "asc" },
        },
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json({ team });
  } catch (error) {
    console.error("Team fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/rbac/teams/[teamId] - Update team (admin or team lead)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const { teamId } = params;

    // Check permissions - admin or team lead of this team
    const canUpdate = hasRole(user, "ADMIN") || isTeamLead(user, teamId);

    if (!canUpdate) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = updateTeamSchema.parse(body);

    // Get current team for audit logging
    const currentTeam = await (prisma as any).team.findUnique({
      where: { id: teamId },
    });

    if (!currentTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Validate new team lead if provided
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
        rolePrimary: (leadUser as any).rolePrimary || 'MEMBER',
        status: (leadUser as any).status || 'ACTIVE',
        teamMemberships: [],
        userRoles: [],
      };
      
      if (!hasRole(authUser, "TEAM_LEAD")) {
        return NextResponse.json({ error: "User must have TEAM_LEAD role" }, { status: 400 });
      }
    }

    const updatedTeam = await (prisma as any).team.update({
      where: { id: teamId },
      data: validatedData,
      include: {
        Lead: {
          select: {
            id: true,
            name: true,
            email: true,
            rolePrimary: true,
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
                createdAt: true,
              },
            },
          },
        },
      },
    });

    // Log the update
    await logAudit(
      user.id,
      "UPDATE_TEAM",
      "TEAM",
      teamId,
      validatedData,
      { previousLead: currentTeam.leadId }
    );

    return NextResponse.json({ team: updatedTeam });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Team update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/rbac/teams/[teamId] - Delete team (admin only)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasRole(user, "ADMIN")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const params = await context.params;
    const { teamId } = params;

    // Check if team exists and get member count
    const team = await (prisma as any).team.findUnique({
      where: { id: teamId },
      include: {
        _count: {
          select: {
            Members: {
              where: { leftAt: null },
            },
          },
        },
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Prevent deletion of teams with active members
    if (team._count.Members > 0) {
      return NextResponse.json(
        { error: "Cannot delete team with active members" },
        { status: 400 }
      );
    }

    // Soft delete by marking as inactive
    await (prisma as any).team.update({
      where: { id: teamId },
      data: { isActive: false },
    });

    // Log the deletion
    await logAudit(
      user.id,
      "DELETE_TEAM",
      "TEAM",
      teamId,
      null,
      { teamName: team.name }
    );

    return NextResponse.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Team deletion error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
