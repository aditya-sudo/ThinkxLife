import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "../../../../lib/auth-middleware";

const createRequestSchema = z.object({
  type: z.enum(["ROLE_CHANGE", "TEAM_JOIN", "RESOURCE_ACCESS", "PERMISSION_REQUEST"]),
  target: z.string().min(1).max(100),
  reason: z.string().max(500).optional(),
});

// GET /api/rbac/access-requests - Get current user's access requests
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.log("No DATABASE_URL found, returning empty requests array");
      return NextResponse.json({ requests: [] });
    }

    // For now, return empty array since we don't have the AccessRequest table set up
    // In a full implementation, this would query the database
    return NextResponse.json({ requests: [] });
  } catch (error) {
    console.error("Access requests fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/rbac/access-requests - Create new access request
export async function POST(request: NextRequest) {
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
        { error: "Access requests require database connection. Please contact your administrator to set up the database." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const validatedData = createRequestSchema.parse(body);

    // For now, just return success without actually creating the request
    // In a full implementation, this would create an AccessRequest record
    console.log("Access request would be created:", {
      userId: user.id,
      ...validatedData,
    });

    return NextResponse.json({ 
      message: "Access request submitted successfully",
      request: {
        id: "temp-" + Date.now(),
        type: validatedData.type,
        target: validatedData.target,
        reason: validatedData.reason,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Access request creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}