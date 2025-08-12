import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser, hasRole, logAudit } from "@/lib/auth-middleware";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional().or(z.literal("")),
  github: z.string().max(100).optional(),
  discord: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  timezone: z.string().max(50).optional(),
  theme: z.enum(["light", "dark"]).optional(),
  notifications: z.boolean().optional(),
  newsletter: z.boolean().optional(),
  password: z.string().min(6).optional(),
});

const adminUpdateSchema = updateProfileSchema.extend({
  rolePrimary: z.enum(["MEMBER", "INTERN", "TEAM_LEAD", "ADMIN"]).optional(),
  status: z.enum(["ACTIVE", "SUSPENDED", "ARCHIVED"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

// GET /api/rbac/profile - Get current user's profile
// GET /api/rbac/profile?userId=xxx - Get specific user's profile (with permissions check)
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get("userId");

    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.log("No DATABASE_URL found, returning basic user data from getAuthUser");
      // Return the user data we already have from getAuthUser, which includes fallbacks
      const basicProfile = {
        id: user.id,
        email: user.email,
        name: user.name,
        rolePrimary: user.rolePrimary,
        status: user.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        TeamMemberships: user.teamMemberships || [],
        UserRoles: user.userRoles || [],
        notifications: true,
        newsletter: false,
        theme: "light",
      };
      return NextResponse.json({ user: basicProfile });
    }

    // If no userId specified, return current user's profile
    if (!targetUserId) {
      try {
        // Try to get basic user data first
        const profile = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (!profile) {
          // Return basic profile data as fallback
          const basicProfile = {
            id: user.id,
            email: user.email,
            name: user.name,
            rolePrimary: user.rolePrimary,
            status: user.status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            TeamMemberships: user.teamMemberships || [],
            UserRoles: user.userRoles || [],
            notifications: true,
            newsletter: false,
            theme: "light",
          };
          return NextResponse.json({ user: basicProfile });
        }

        // Try to get RBAC data if available
        try {
          const rbacProfile = await (prisma as any).user.findUnique({
            where: { id: user.id },
            include: {
              TeamMemberships: {
                where: { leftAt: null },
                include: {
                  Team: {
                    select: {
                      id: true,
                      name: true,
                      description: true,
                      leadId: true,
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
              Onboarding: true,
            },
          });

          return NextResponse.json({ user: rbacProfile });
        } catch (rbacError) {
          console.warn("RBAC relations not available, returning basic profile:", rbacError);
          // Return basic profile with fallback RBAC data
          const enhancedProfile = {
            ...profile,
            TeamMemberships: user.teamMemberships || [],
            UserRoles: user.userRoles || [],
            notifications: true,
            newsletter: false,
            theme: "light",
          };
          return NextResponse.json({ user: enhancedProfile });
        }
      } catch (dbError) {
        console.warn("Database query failed, returning fallback data:", dbError);
        // Return basic profile data as fallback
        const basicProfile = {
          id: user.id,
          email: user.email,
          name: user.name,
          rolePrimary: user.rolePrimary,
          status: user.status,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          TeamMemberships: user.teamMemberships || [],
          UserRoles: user.userRoles || [],
          notifications: true,
          newsletter: false,
          theme: "light",
        };
        return NextResponse.json({ user: basicProfile });
      }
    }

    // Check permissions to view other user's profile
    const canView = hasRole(user, "ADMIN") || 
      (hasRole(user, "TEAM_LEAD") && await isInSameTeam(user.id, targetUserId)) ||
      user.id === targetUserId;

    if (!canView) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const profile = await (prisma as any).user.findUnique({
      where: { id: targetUserId },
      include: {
        TeamMemberships: {
          where: { leftAt: null },
          include: {
            Team: {
              select: {
                id: true,
                name: true,
                description: true,
                leadId: true,
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
        Onboarding: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: profile });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/rbac/profile - Update current user's profile
// PUT /api/rbac/profile?userId=xxx - Update specific user's profile (admin/team lead only)
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json({ error: "Account suspended or archived" }, { status: 403 });
    }

    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Profile updates require database connection. Please set up your DATABASE_URL." },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get("userId") || user.id;
    const isUpdatingSelf = targetUserId === user.id;

    const body = await request.json();

    // Check permissions
    if (!isUpdatingSelf) {
      const canUpdate = hasRole(user, "ADMIN") || 
        (hasRole(user, "TEAM_LEAD") && await isInSameTeam(user.id, targetUserId));

      if (!canUpdate) {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
      }
    }

    // Validate input based on user role
    const schema = hasRole(user, "ADMIN") && !isUpdatingSelf ? adminUpdateSchema : updateProfileSchema;
    const validatedData = schema.parse(body);

    // Get current user data for audit logging
    const currentUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = { ...validatedData };

    // Hash password if provided
    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 12);
    }

    // Remove password from audit diff
    const auditData = { ...validatedData };
    if (auditData.password) {
      auditData.password = "[REDACTED]";
    }

    // Update user
    const updatedUser = await (prisma as any).user.update({
      where: { id: targetUserId },
      data: updateData,
      include: {
        TeamMemberships: {
          where: { leftAt: null },
          include: {
            Team: {
              select: {
                id: true,
                name: true,
                description: true,
                leadId: true,
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
        Onboarding: true,
      },
    });

    // Log the update
    await logAudit(
      user.id,
      isUpdatingSelf ? "UPDATE_OWN_PROFILE" : "UPDATE_USER_PROFILE",
      "USER",
      targetUserId,
      auditData,
      { targetUserId, isUpdatingSelf }
    );

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper function to check if users are in the same team
async function isInSameTeam(userId1: string, userId2: string): Promise<boolean> {
  try {
    const user1Teams = await (prisma as any).teamMember.findMany({
      where: { userId: userId1, leftAt: null },
      select: { teamId: true },
    });

    const user2Teams = await (prisma as any).teamMember.findMany({
      where: { userId: userId2, leftAt: null },
      select: { teamId: true },
    });

    const user1TeamIds = user1Teams.map((t: any) => t.teamId);
    const user2TeamIds = user2Teams.map((t: any) => t.teamId);

    return user1TeamIds.some((teamId: any) => user2TeamIds.includes(teamId));
  } catch (error) {
    console.warn("Team membership check failed, defaulting to false:", error);
    return false;
  }
}
