import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// Import the shared access requests array from the main route
// In a real app, this would be a database query
const accessRequests: Array<{
  id: string;
  userId: string;
  userEmail: string;
  type: string;
  target: string;
  reason?: string;
  status: string;
  createdAt: string;
}> = [];

// GET /api/access-requests/all - Get all access requests (admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For demo purposes, we'll assume any authenticated user can be admin
    // In production, you'd check user.role === 'ADMIN' from your database
    
    // Get all requests from global storage
    const allRequests = getGlobalAccessRequests();
    
    return NextResponse.json({ requests: allRequests });
  } catch (error) {
    console.error("All access requests fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper function to access the global requests array
// In a real app, this would be a database query
function getGlobalAccessRequests() {
  // For demo purposes, return some mock data if the array is empty
  if (typeof global !== 'undefined' && (global as any).accessRequests) {
    return (global as any).accessRequests;
  }
  return [];
}
