/**
 * React Hook for ThinkxLife Brain Integration
 *
 * This hook provides a simple interface for all ThinkxLife applications
 * to communicate with the centralized Brain system.
 */

import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface BrainRequest {
  message: string;
  application: 'healing-rooms' | 'ai-awareness' | 'chatbot' | 'compliance' | 'exterior-spaces' | 'general';
  context?: any;
  metadata?: any;
}

interface BrainResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
  metadata?: any;
  timestamp: string;
}

interface UseBrainReturn {
  sendMessage: (request: BrainRequest) => Promise<BrainResponse>;
  isLoading: boolean;
  error: string | null;
  lastResponse: BrainResponse | null;
  getBrainStatus: () => Promise<any>;
}

export function useBrain(): UseBrainReturn {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<BrainResponse | null>(null);

  const sendMessage = useCallback(async (request: BrainRequest): Promise<BrainResponse> => {
    if (!session) {
      const errorResponse: BrainResponse = {
        success: false,
        error: 'Authentication required',
        timestamp: new Date().toISOString()
      };
      setError(errorResponse.error);
      setLastResponse(errorResponse);
      return errorResponse;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/brain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data: BrainResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Brain request failed');
      }

      setLastResponse(data);
      return data;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      const errorResponse: BrainResponse = {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString()
      };

      setError(errorMessage);
      setLastResponse(errorResponse);
      return errorResponse;

    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const getBrainStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/brain', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to get Brain status');
      }

      return await response.json();
    } catch (err) {
      console.error('Failed to get Brain status:', err);
      return null;
    }
  }, []);

  return {
    sendMessage,
    isLoading,
    error,
    lastResponse,
    getBrainStatus
  };
}

/**
 * Specialized hooks for different applications
 */

export function useHealingRoomsBrain() {
  const brain = useBrain();

  const sendHealingMessage = useCallback((message: string, context?: any) => {
    return brain.sendMessage({
      message,
      application: 'healing-rooms',
      context: {
        ...context,
        traumaInformed: true,
        safetyProtocols: true
      }
    });
  }, [brain]);

  return {
    ...brain,
    sendHealingMessage
  };
}

export function useAIAwarenessBrain() {
  const brain = useBrain();

  const sendEducationalMessage = useCallback((message: string, context?: any) => {
    return brain.sendMessage({
      message,
      application: 'ai-awareness',
      context: {
        ...context,
        educational: true,
        ethicalFocus: true
      }
    });
  }, [brain]);

  return {
    ...brain,
    sendEducationalMessage
  };
}

export function useChatbotBrain() {
  const brain = useBrain();

  const sendChatMessage = useCallback((message: string, context?: any) => {
    return brain.sendMessage({
      message,
      application: 'chatbot',
      context: {
        ...context,
        conversational: true
      }
    });
  }, [brain]);

  return {
    ...brain,
    sendChatMessage
  };
}

export function useComplianceBrain() {
  const brain = useBrain();

  const sendComplianceQuery = useCallback((message: string, context?: any) => {
    return brain.sendMessage({
      message,
      application: 'compliance',
      context: {
        ...context,
        compliance: true,
        regulatory: true,
        ethicalGuidelines: true
      }
    });
  }, [brain]);

  return {
    ...brain,
    sendComplianceQuery
  };
}

export function useExteriorSpacesBrain() {
  const brain = useBrain();

  const sendDesignMessage = useCallback((message: string, context?: any) => {
    return brain.sendMessage({
      message,
      application: 'exterior-spaces',
      context: {
        ...context,
        creative: true,
        designFocused: true,
        spatialAwareness: true
      }
    });
  }, [brain]);

  return {
    ...brain,
    sendDesignMessage
  };
}
