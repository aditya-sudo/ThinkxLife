import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser, hasRole, logAudit } from "@/lib/auth-middleware";
import { prisma } from "@/lib/prisma";

const assignRoleSchema = z.object({
  userId: z.string(),
  roleCode: z.string(),
  expiresAt: z.string().datetime().optional(),
});

const revokeRoleSchema = z.object({
  userId: z.string(),
  roleCode: z.string(),
});

// GET /api/rbac/roles - List all roles
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const roles = await (prisma as any).role.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            UserRoles: true,
          },
        },
      },
    });

    return NextResponse.json({ roles });
  } catch (error) {
    console.error("Roles fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/rbac/roles/assign - Assign role to user (admin only)
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
    const { userId, roleCode, expiresAt } = assignRoleSchema.parse(body);

    // Verify target user exists
    const targetUser = await (prisma as any).user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify role exists
    const role = await (prisma as any).role.findUnique({
      where: { code: roleCode },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Check if role is already assigned
    const existingAssignment = await (prisma as any).userRole_Assignment.findUnique({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
    });

    if (existingAssignment) {
      return NextResponse.json({ error: "Role already assigned" }, { status: 400 });
    }

    // Assign role
    const assignment = await (prisma as any).userRole_Assignment.create({
      data: {
        userId,
        roleId: role.id,
        assignedBy: user.id,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      },
      include: {
        Role: {
          select: {
            code: true,
            name: true,
            description: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Update primary role if this is a higher role
    const roleHierarchy: Record<string, number> = {
      member: 1,
      intern: 2,
      team_lead: 3,
      admin: 4,
    };

    const currentRoleLevel = roleHierarchy[targetUser.rolePrimary.toLowerCase()] || 0;
    const newRoleLevel = roleHierarchy[roleCode.toLowerCase()] || 0;

    if (newRoleLevel > currentRoleLevel) {
      await (prisma as any).user.update({
        where: { id: userId },
        data: { rolePrimary: roleCode.toUpperCase() as any },
      });
    }

    // Log the assignment
    await logAudit(
      user.id,
      "ASSIGN_ROLE",
      "USER_ROLE",
      assignment.id,
      { userId, roleCode, expiresAt },
      { targetUserName: targetUser.name, roleName: role.name }
    );

    return NextResponse.json({ assignment }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Role assignment error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/rbac/roles/revoke - Revoke role from user (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasRole(user, "ADMIN")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, roleCode } = revokeRoleSchema.parse(body);

    // Verify role exists
    const role = await (prisma as any).role.findUnique({
      where: { code: roleCode },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Find and delete assignment
    const assignment = await (prisma as any).userRole_Assignment.findUnique({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            rolePrimary: true,
          },
        },
      },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Role assignment not found" }, { status: 404 });
    }

    // Delete assignment
    await (prisma as any).userRole_Assignment.delete({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
    });

    // Update primary role if this was the primary role
    if (assignment.User.rolePrimary.toLowerCase() === roleCode.toLowerCase()) {
      // Find highest remaining role or default to MEMBER
      const remainingRoles = await (prisma as any).userRole_Assignment.findMany({
        where: { userId },
        include: { Role: true },
      });

      let newPrimaryRole = "MEMBER";
      let highestLevel = 0;

      const roleHierarchy: Record<string, number> = {
        member: 1,
        intern: 2,
        team_lead: 3,
        admin: 4,
      };

      for (const roleAssignment of remainingRoles) {
        const level = roleHierarchy[roleAssignment.Role.code] || 0;
        if (level > highestLevel) {
          highestLevel = level;
          newPrimaryRole = roleAssignment.Role.code.toUpperCase();
        }
      }

      await (prisma as any).user.update({
        where: { id: userId },
        data: { rolePrimary: newPrimaryRole as any },
      });
    }

    // Log the revocation
    await logAudit(
      user.id,
      "REVOKE_ROLE",
      "USER_ROLE",
      assignment.id,
      { userId, roleCode },
      { targetUserName: assignment.User.name, roleName: role.name }
    );

    return NextResponse.json({ message: "Role revoked successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Role revocation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
