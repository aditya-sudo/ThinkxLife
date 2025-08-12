import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser, hasRole, isTeamLead, logAudit } from "../../../../../../lib/auth-middleware";
import { prisma } from "@/lib/prisma";

const addMemberSchema = z.object({
  userId: z.string(),
});

const removeMemberSchema = z.object({
  userId: z.string(),
});

// POST /api/rbac/teams/[teamId]/members - Add member to team
export async function POST(
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
    const canManage = hasRole(user, "ADMIN") || isTeamLead(user, teamId);

    if (!canManage) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const body = await request.json();
    const { userId } = addMemberSchema.parse(body);

    // Verify team exists
    const team = await (prisma as any).team.findUnique({
      where: { id: teamId },
    });

    if (!team || !team.isActive) {
      return NextResponse.json({ error: "Team not found or inactive" }, { status: 404 });
    }

    // Verify user exists and is active
    const targetUser = await (prisma as any).user.findUnique({
      where: { id: userId },
    });

    if (!targetUser || (targetUser as any).status !== "ACTIVE") {
      return NextResponse.json({ error: "User not found or inactive" }, { status: 404 });
    }

    // Check if user is already a member
    const existingMembership = await (prisma as any).teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });

    if (existingMembership && !existingMembership.leftAt) {
      return NextResponse.json({ error: "User is already a member" }, { status: 400 });
    }

    // Add or reactivate membership
    const membership = await (prisma as any).teamMember.upsert({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
      update: {
        leftAt: null, // Reactivate if previously left
        joinedAt: new Date(),
      },
      create: {
        teamId,
        userId,
      },
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
        Team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Log the addition
    await logAudit(
      user.id,
      "ADD_TEAM_MEMBER",
      "TEAM_MEMBER",
      membership.id,
      { teamId, userId },
      { teamName: team.name, userName: targetUser.name }
    );

    return NextResponse.json({ membership }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Add member error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/rbac/teams/[teamId]/members - Remove member from team
export async function DELETE(
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
    const body = await request.json();
    const { userId } = removeMemberSchema.parse(body);

    // Check permissions - admin, team lead, or removing self
    const canRemove = hasRole(user, "ADMIN") || 
      isTeamLead(user, teamId) || 
      user.id === userId;

    if (!canRemove) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    // Verify membership exists
    const membership = await (prisma as any).teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Team: {
          select: {
            id: true,
            name: true,
            leadId: true,
          },
        },
      },
    });

    if (!membership || membership.leftAt) {
      return NextResponse.json({ error: "User is not a member of this team" }, { status: 400 });
    }

    // Prevent removing team lead (must transfer leadership first)
    if (membership.Team.leadId === userId) {
      return NextResponse.json(
        { error: "Cannot remove team lead. Transfer leadership first." },
        { status: 400 }
      );
    }

    // Mark as left (soft delete)
    await (prisma as any).teamMember.update({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
      data: {
        leftAt: new Date(),
      },
    });

    // Log the removal
    await logAudit(
      user.id,
      "REMOVE_TEAM_MEMBER",
      "TEAM_MEMBER",
      membership.id,
      { teamId, userId },
      { 
        teamName: membership.Team.name, 
        userName: membership.User.name,
        isSelfRemoval: user.id === userId
      }
    );

    return NextResponse.json({ message: "Member removed successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Remove member error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
