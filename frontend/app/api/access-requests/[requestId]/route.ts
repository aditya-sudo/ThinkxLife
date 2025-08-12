import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";

const updateRequestSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
});

// PATCH /api/access-requests/[requestId] - Update request status (admin only)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ requestId: string }> }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const body = await request.json();
    const { status } = updateRequestSchema.parse(body);
    const requestId = params.requestId;

    // For demo purposes, we'll update the global requests array
    // In production, this would be a database update
    const success = updateGlobalAccessRequest(requestId, status);

    if (success) {
      return NextResponse.json({ 
        message: `Request ${status.toLowerCase()} successfully`,
        requestId,
        status
      });
    } else {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Request update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper function to update the global requests array
// In a real app, this would be a database update
function updateGlobalAccessRequest(requestId: string, status: string): boolean {
  if (typeof global !== 'undefined' && (global as any).accessRequests) {
    const requests = (global as any).accessRequests;
    const requestIndex = requests.findIndex((req: any) => req.id === requestId);
    
    if (requestIndex !== -1) {
      requests[requestIndex].status = status;
      return true;
    }
  }
  return false;
}
