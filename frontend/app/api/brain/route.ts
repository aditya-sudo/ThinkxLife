/**
 * ThinkxLife Brain API Endpoint
 *
 * This is the main API endpoint that all AI applications use to
 * communicate with the centralized Brain system.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getBrain, initializeBrain } from '@/lib/brain';
import { AIRequest, UserContext, BrainConfig } from '@/lib/brain/types';
import { prisma } from '@/lib/prisma';

// Initialize Brain with configuration
const brainConfig: BrainConfig = {
  providers: {
    local: {
      enabled: true,
      endpoint: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      timeout: 30000 // 30 seconds
    },
    openai: {
      enabled: !!process.env.OPENAI_API_KEY,
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'gpt-4o-mini',
      maxTokens: 2000,
      temperature: 0.7
    },
    anthropic: {
      enabled: !!process.env.ANTHROPIC_API_KEY,
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      model: 'claude-3-sonnet-20240229',
      maxTokens: 2000,
      temperature: 0.7
    }
  },
  security: {
    rateLimiting: {
      enabled: true,
      maxRequestsPerMinute: 60,
      maxRequestsPerHour: 1000
    },
    contentFiltering: {
      enabled: true,
      blockedWords: [],
      traumaSafeMode: true
    },
    userValidation: {
      requireAuth: true,
      allowAnonymous: false
    }
  },
  context: {
    maxHistoryLength: 50,
    retentionDays: 30,
    enableCrossAppContext: true,
    enablePersonalization: true
  },
  session: {
    maxConcurrentSessions: 10,
    sessionTimeoutMinutes: 60,
    enableSessionPersistence: true
  }
};

// Initialize Brain singleton
let brain: ReturnType<typeof getBrain>;
try {
  brain = getBrain(brainConfig);
} catch {
  brain = initializeBrain(brainConfig);
}

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { message, application, context, metadata } = body;

    // Validate request
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!application) {
      return NextResponse.json(
        { error: 'Application type is required' },
        { status: 400 }
      );
    }

    // Get user profile and preferences
    const userProfile = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { profile: true }
    });

    // Create user context
    const userContext: UserContext = {
      userId: session.user.id,
      sessionId: context?.sessionId || generateSessionId(),
      isAuthenticated: true,
      userProfile: userProfile ? {
        id: userProfile.id,
        name: userProfile.name || undefined,
        email: userProfile.email,
        age: calculateAge(userProfile.dateOfBirth),
        aceScore: getACEScore(userProfile.id), // You'll need to implement this
        aiKnowledgeLevel: 'beginner', // Default, you can enhance this
        createdAt: userProfile.createdAt.toISOString(),
        updatedAt: userProfile.updatedAt.toISOString()
      } : undefined,
      permissions: ['user'], // You can enhance this with role-based permissions
      preferences: {
        language: 'en',
        theme: userProfile?.theme || 'light',
        communicationStyle: 'empathetic',
        aiPersonality: 'supportive',
        privacyLevel: 'medium',
        contentFiltering: true
      }
    };

    // Create AI request
    const aiRequest: AIRequest = {
      id: generateRequestId(),
      application,
      message,
      context,
      metadata: {
        ...metadata,
        userAgent: request.headers.get('user-agent') || undefined,
        ipAddress: getClientIP(request),
        deviceType: getDeviceType(request.headers.get('user-agent') || '')
      },
      timestamp: new Date().toISOString()
    };

    // Process request through Brain
    const response = await brain.processRequest(aiRequest, userContext);

    // Log the interaction (optional)
    await logInteraction(aiRequest, response, userContext);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Brain API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get Brain status
    const status = await brain.getStatus();

    return NextResponse.json({
      brain: 'ThinkxLife Brain v1.0.0',
      status: 'operational',
      ...status,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Brain status error:', error);
    return NextResponse.json(
      { error: 'Failed to get Brain status' },
      { status: 500 }
    );
  }
}

// Helper functions
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function calculateAge(dateOfBirth: Date | null): number | undefined {
  if (!dateOfBirth) return undefined;

  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function getACEScore(userId: string): number | undefined {
  // TODO: Implement ACE score retrieval from your database
  // This would typically query a separate table or field
  return undefined;
}

function getClientIP(request: NextRequest): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return real || undefined;
}

function getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
  const ua = userAgent.toLowerCase();

  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }

  if (ua.includes('mobile') || ua.includes('iphone') || ua.includes('android')) {
    return 'mobile';
  }

  return 'desktop';
}

async function logInteraction(
  request: AIRequest,
  response: any,
  userContext: UserContext
): Promise<void> {
  try {
    // Log to your existing chat session system
    await prisma.chatMessage.create({
      data: {
        sessionId: userContext.sessionId,
        role: 'user',
        content: request.message,
        timestamp: new Date(request.timestamp)
      }
    });

    if (response.success && response.message) {
      await prisma.chatMessage.create({
        data: {
          sessionId: userContext.sessionId,
          role: 'assistant',
          content: response.message,
          timestamp: new Date(response.timestamp),
          retrievedDocs: response.data?.retrieved_docs || null
        }
      });
    }
  } catch (error) {
    console.error('Failed to log interaction:', error);
    // Don't throw error, just log it
  }
}
