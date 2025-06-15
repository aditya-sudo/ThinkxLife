import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Fetch analytics from backend
    const response = await fetch(`${BACKEND_URL}/session-analytics${userId ? `?userId=${userId}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Session analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session analytics' },
      { status: 500 }
    );
  }
}
