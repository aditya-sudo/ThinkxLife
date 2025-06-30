"use client";

import { useState, useCallback } from 'react';

// Types for backend Brain communication
interface BrainRequest {
  message: string;
  application: string;
  user_context?: Record<string, any>;
  session_id?: string;
  metadata?: Record<string, any>;
}

interface BrainResponse {
  success: boolean;
  message?: string;
  data?: Record<string, any>;
  error?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

interface BrainState {
  loading: boolean;
  error: string | null;
  response: BrainResponse | null;
}

// Main hook for backend Brain communication
export function useBackendBrain() {
  const [state, setState] = useState<BrainState>({
    loading: false,
    error: null,
    response: null
  });

  const sendMessage = useCallback(async (request: BrainRequest): Promise<BrainResponse> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${apiUrl}/api/brain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BrainResponse = await response.json();
      
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        response: data,
        error: data.success ? null : data.error || 'Unknown error'
      }));

      return data;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage,
        response: null
      }));

      // Return error response
      return {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString()
      };
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      response: null
    });
  }, []);

  return {
    ...state,
    sendMessage,
    clearError,
    reset
  };
}

// Application-specific hooks
export function useHealingRoomsBrain() {
  const brain = useBackendBrain();

  const sendHealingMessage = useCallback(async (
    message: string, 
    userContext?: Record<string, any>,
    sessionId?: string
  ) => {
    return brain.sendMessage({
      message,
      application: 'healing-rooms',
      user_context: userContext,
      session_id: sessionId,
      metadata: {
        trauma_safe: true,
        healing_focused: true
      }
    });
  }, [brain]);

  return {
    ...brain,
    sendHealingMessage
  };
}

export function useAIAwarenessBrain() {
  const brain = useBackendBrain();

  const sendEducationalMessage = useCallback(async (
    message: string,
    userContext?: Record<string, any>,
    sessionId?: string
  ) => {
    return brain.sendMessage({
      message,
      application: 'ai-awareness',
      user_context: userContext,
      session_id: sessionId,
      metadata: {
        educational: true,
        ethics_focused: true
      }
    });
  }, [brain]);

  return {
    ...brain,
    sendEducationalMessage
  };
}

export function useChatbotBrain() {
  const brain = useBackendBrain();

  const sendChatMessage = useCallback(async (
    message: string,
    userContext?: Record<string, any>,
    sessionId?: string
  ) => {
    return brain.sendMessage({
      message,
      application: 'chatbot',
      user_context: userContext,
      session_id: sessionId
    });
  }, [brain]);

  return {
    ...brain,
    sendChatMessage
  };
}

export function useComplianceBrain() {
  const brain = useBackendBrain();

  const sendComplianceMessage = useCallback(async (
    message: string,
    userContext?: Record<string, any>,
    sessionId?: string
  ) => {
    return brain.sendMessage({
      message,
      application: 'compliance',
      user_context: userContext,
      session_id: sessionId,
      metadata: {
        regulatory_focus: true,
        compliance_check: true
      }
    });
  }, [brain]);

  return {
    ...brain,
    sendComplianceMessage
  };
}

export function useExteriorSpacesBrain() {
  const brain = useBackendBrain();

  const sendCreativeMessage = useCallback(async (
    message: string,
    userContext?: Record<string, any>,
    sessionId?: string
  ) => {
    return brain.sendMessage({
      message,
      application: 'exterior-spaces',
      user_context: userContext,
      session_id: sessionId,
      metadata: {
        creative: true,
        design_focused: true
      }
    });
  }, [brain]);

  return {
    ...brain,
    sendCreativeMessage
  };
}

// Health check hook
export function useBrainHealth() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${apiUrl}/api/brain/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setHealth(data);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Health check failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    health,
    loading,
    error,
    checkHealth
  };
}

// Analytics hook
export function useBrainAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${apiUrl}/api/brain/analytics`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalytics(data);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Analytics fetch failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    analytics,
    loading,
    error,
    fetchAnalytics
  };
} 