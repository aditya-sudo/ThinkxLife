import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

const createRequestSchema = z.object({
  type: z.enum(["ROLE_CHANGE", "TEAM_JOIN", "RESOURCE_ACCESS", "PERMISSION_REQUEST"]),
  target: z.string().min(1).max(100),
  reason: z.string().max(500).optional(),
});

// Simple in-memory storage for demo purposes
// In production, this would be stored in a database
// Using global to share data across API routes
if (typeof global !== 'undefined') {
  (global as any).accessRequests = (global as any).accessRequests || [];
}

function getAccessRequests() {
  return typeof global !== 'undefined' ? (global as any).accessRequests || [] : [];
}

function addAccessRequest(request: any) {
  if (typeof global !== 'undefined') {
    (global as any).accessRequests = (global as any).accessRequests || [];
    (global as any).accessRequests.unshift(request);
  }
}

// GET /api/access-requests - Get current user's access requests
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Filter requests for current user
    const allRequests = getAccessRequests();
    const userRequests = allRequests.filter((req: any) => req.userId === user.id);
    
    return NextResponse.json({ requests: userRequests });
  } catch (error) {
    console.error("Access requests fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/access-requests - Create new access request
export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createRequestSchema.parse(body);

    // Create new request
    const newRequest = {
      id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      userEmail: user.email!,
      type: validatedData.type,
      target: validatedData.target,
      reason: validatedData.reason,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    // Add to global storage
    addAccessRequest(newRequest);

    console.log("New access request created:", newRequest);

    return NextResponse.json({ 
      message: "Access request submitted successfully",
      request: newRequest
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
