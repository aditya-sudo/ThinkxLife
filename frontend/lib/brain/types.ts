/**
 * Type definitions for the ThinkxLife Brain system
 */

// Core Brain Configuration
export interface BrainConfig {
  providers: {
    openai?: OpenAIConfig;
    anthropic?: AnthropicConfig;
    local?: LocalConfig;
  };
  security: SecurityConfig;
  context: ContextConfig;
  session: SessionConfig;
}

// Provider Configurations
export interface OpenAIConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  organization?: string;
}

export interface AnthropicConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export interface LocalConfig {
  enabled: boolean;
  endpoint: string;
  apiKey?: string;
  timeout: number;
}

// Security Configuration
export interface SecurityConfig {
  rateLimiting: {
    enabled: boolean;
    maxRequestsPerMinute: number;
    maxRequestsPerHour: number;
  };
  contentFiltering: {
    enabled: boolean;
    blockedWords: string[];
    traumaSafeMode: boolean;
  };
  userValidation: {
    requireAuth: boolean;
    allowAnonymous: boolean;
  };
}

// Context Configuration
export interface ContextConfig {
  maxHistoryLength: number;
  retentionDays: number;
  enableCrossAppContext: boolean;
  enablePersonalization: boolean;
}

// Session Configuration
export interface SessionConfig {
  maxConcurrentSessions: number;
  sessionTimeoutMinutes: number;
  enableSessionPersistence: boolean;
}

// Request/Response Types
export interface AIRequest {
  id: string;
  application: 'healing-rooms' | 'ai-awareness' | 'chatbot' | 'compliance' | 'exterior-spaces' | 'general';
  message: string;
  context?: RequestContext;
  metadata?: RequestMetadata;
  timestamp: string;
}

export interface RequestContext {
  sessionId?: string;
  conversationHistory?: Message[];
  userPreferences?: UserPreferences;
  applicationState?: any;
  retrievedDocs?: any[];
  [key: string]: any;
}

export interface RequestMetadata {
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  language?: string;
}

export interface AIResponse {
  id?: string;
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
  metadata?: ResponseMetadata;
  timestamp: string;
}

export interface ResponseMetadata {
  provider: string;
  model: string;
  tokensUsed?: number;
  processingTime: number;
  confidence?: number;
  sources?: string[];
}

// User Context
export interface UserContext {
  userId: string;
  sessionId: string;
  isAuthenticated: boolean;
  userProfile?: UserProfile;
  permissions: string[];
  preferences: UserPreferences;
}

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  age?: number;
  aceScore?: number;
  aiKnowledgeLevel?: 'beginner' | 'intermediate' | 'advanced';
  traumaHistory?: TraumaContext;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark';
  communicationStyle: 'formal' | 'casual' | 'empathetic';
  aiPersonality: 'supportive' | 'educational' | 'professional';
  privacyLevel: 'high' | 'medium' | 'low';
  contentFiltering: boolean;
}

// Context Types
export interface TraumaContext {
  aceScore: number;
  traumaTypes: string[];
  triggerWords: string[];
  safetyPreferences: {
    requireWarnings: boolean;
    avoidTopics: string[];
    preferredApproach: 'gentle' | 'direct' | 'clinical';
  };
  healingGoals: string[];
  lastAssessment: string;
}

export interface AIKnowledgeContext {
  level: 'beginner' | 'intermediate' | 'advanced';
  completedModules: string[];
  currentInterests: string[];
  preferredStyle: 'visual' | 'textual' | 'interactive';
  ethicsUnderstanding: number; // 0-100 score
  lastQuizScore?: number;
}

// Message Types
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: {
    application: string;
    provider?: string;
    confidence?: number;
    sources?: string[];
  };
}

// Provider Interface
export interface AIProvider {
  name: string;
  isHealthy(): Promise<boolean>;
  process(request: AIRequest, userContext: UserContext): Promise<AIResponse>;
  disconnect(): Promise<void>;
}

// Brain Events
export interface BrainEvent {
  type: 'request' | 'response' | 'error' | 'health_check' | 'config_update';
  timestamp: string;
  data: any;
  userId?: string;
  sessionId?: string;
}

// Analytics Types
export interface BrainAnalytics {
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  providerUsage: { [provider: string]: number };
  applicationUsage: { [app: string]: number };
  userSatisfaction: number;
  errorRate: number;
  uptime: number;
}

// Health Status
export interface HealthStatus {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  providers: {
    [name: string]: {
      status: 'up' | 'down' | 'degraded';
      responseTime: number;
      lastCheck: string;
      errorRate: number;
    };
  };
  system: {
    memory: number;
    cpu: number;
    connections: number;
    uptime: number;
  };
}

// Configuration Validation
export interface ConfigValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
}

// Export utility types
export type ApplicationType = AIRequest['application'];
export type ProviderType = 'openai' | 'anthropic' | 'local';
export type MessageRole = Message['role'];
export type UserRole = 'user' | 'admin' | 'moderator' | 'therapist';

// Brain State
export interface BrainState {
  initialized: boolean;
  configuration: BrainConfig;
  activeProviders: string[];
  activeSessions: number;
  lastHealthCheck: string;
  version: string;
}
