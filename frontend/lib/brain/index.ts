/**
 * ThinkxLife Brain - Central AI Orchestrator
 *
 * This is the core intelligence system that manages all AI operations
 * across the ThinkxLife platform. It serves as the central hub for:
 * - AI model management
 * - Request routing
 * - Context management
 * - Session handling
 * - Data flow coordination
 */

import { AIProvider, AIRequest, AIResponse, BrainConfig, UserContext } from './types';
import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { LocalProvider } from './providers/local';
import { ContextManager } from './context-manager';
import { SessionManager } from './session-manager';
import { SecurityManager } from './security-manager';

export class ThinkxLifeBrain {
  private providers: Map<string, AIProvider> = new Map();
  private contextManager: ContextManager;
  private sessionManager: SessionManager;
  private securityManager: SecurityManager;
  private config: BrainConfig;

  constructor(config: BrainConfig) {
    this.config = config;
    this.contextManager = new ContextManager();
    this.sessionManager = new SessionManager();
    this.securityManager = new SecurityManager();

    this.initializeProviders();
  }

  /**
   * Initialize all AI providers
   */
  private initializeProviders(): void {
    // OpenAI Provider (GPT models)
    if (this.config.providers.openai?.enabled) {
      this.providers.set('openai', new OpenAIProvider(this.config.providers.openai));
    }

    // Anthropic Provider (Claude models)
    if (this.config.providers.anthropic?.enabled) {
      this.providers.set('anthropic', new AnthropicProvider(this.config.providers.anthropic));
    }

    // Local Provider (your existing chatbot)
    if (this.config.providers.local?.enabled) {
      this.providers.set('local', new LocalProvider(this.config.providers.local));
    }
  }

  /**
   * Main entry point for all AI requests
   */
  async processRequest(request: AIRequest, userContext: UserContext): Promise<AIResponse> {
    try {
      // Security validation
      await this.securityManager.validateRequest(request, userContext);

      // Route to appropriate application handler
      switch (request.application) {
        case 'healing-rooms':
          return await this.handleHealingRooms(request, userContext);

        case 'ai-awareness':
          return await this.handleAIAwareness(request, userContext);

        case 'chatbot':
          return await this.handleChatbot(request, userContext);

        case 'compliance':
          return await this.handleCompliance(request, userContext);

        case 'exterior-spaces':
          return await this.handleExteriorSpaces(request, userContext);

        default:
          return await this.handleGeneral(request, userContext);
      }
    } catch (error) {
      console.error('Brain processing error:', error);
      return {
        success: false,
        error: 'An error occurred while processing your request',
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Handle Healing Rooms AI interactions
   */
  private async handleHealingRooms(request: AIRequest, userContext: UserContext): Promise<AIResponse> {
    // Get user's trauma context and ACE score
    const traumaContext = await this.contextManager.getTraumaContext(userContext.userId);

    // Use empathetic AI model with trauma-informed responses
    const provider = this.selectProvider('healing', userContext);

    const enhancedRequest = {
      ...request,
      context: {
        ...request.context,
        traumaInformed: true,
        aceScore: traumaContext.aceScore,
        sessionType: 'healing',
        safetyProtocols: true
      }
    };

    return await provider.process(enhancedRequest, userContext);
  }

  /**
   * Handle AI Awareness educational interactions
   */
  private async handleAIAwareness(request: AIRequest, userContext: UserContext): Promise<AIResponse> {
    // Get user's AI knowledge level
    const knowledgeContext = await this.contextManager.getAIKnowledgeContext(userContext.userId);

    const provider = this.selectProvider('educational', userContext);

    const enhancedRequest = {
      ...request,
      context: {
        ...request.context,
        educational: true,
        knowledgeLevel: knowledgeContext.level,
        learningStyle: knowledgeContext.preferredStyle,
        ethicalFocus: true
      }
    };

    return await provider.process(enhancedRequest, userContext);
  }

  /**
   * Handle general chatbot interactions
   */
  private async handleChatbot(request: AIRequest, userContext: UserContext): Promise<AIResponse> {
    // Use your existing chatbot logic but enhanced through Brain
    const provider = this.selectProvider('general', userContext);

    // Retrieve relevant documents from your existing system
    const retrievedDocs = await this.contextManager.retrieveRelevantDocs(request.message);

    const enhancedRequest = {
      ...request,
      context: {
        ...request.context,
        retrievedDocs,
        conversational: true
      }
    };

    return await provider.process(enhancedRequest, userContext);
  }

  /**
   * Handle compliance and ethics queries
   */
  private async handleCompliance(request: AIRequest, userContext: UserContext): Promise<AIResponse> {
    const provider = this.selectProvider('compliance', userContext);

    const enhancedRequest = {
      ...request,
      context: {
        ...request.context,
        compliance: true,
        regulatory: true,
        ethicalGuidelines: true
      }
    };

    return await provider.process(enhancedRequest, userContext);
  }

  /**
   * Handle exterior spaces and design interactions
   */
  private async handleExteriorSpaces(request: AIRequest, userContext: UserContext): Promise<AIResponse> {
    const provider = this.selectProvider('creative', userContext);

    const enhancedRequest = {
      ...request,
      context: {
        ...request.context,
        creative: true,
        designFocused: true,
        spatialAwareness: true
      }
    };

    return await provider.process(enhancedRequest, userContext);
  }

  /**
   * Handle general requests
   */
  private async handleGeneral(request: AIRequest, userContext: UserContext): Promise<AIResponse> {
    const provider = this.selectProvider('general', userContext);
    return await provider.process(request, userContext);
  }

  /**
   * Intelligent provider selection based on request type and user context
   */
  private selectProvider(requestType: string, userContext: UserContext): AIProvider {
    // Smart routing logic
    switch (requestType) {
      case 'healing':
        // Use most empathetic model for trauma-informed care
        return this.providers.get('anthropic') || this.providers.get('local')!;

      case 'educational':
        // Use model best for explanations
        return this.providers.get('openai') || this.providers.get('local')!;

      case 'compliance':
        // Use most accurate model for regulatory content
        return this.providers.get('anthropic') || this.providers.get('local')!;

      case 'creative':
        // Use model best for creative tasks
        return this.providers.get('openai') || this.providers.get('local')!;

      default:
        // Fallback to local provider
        return this.providers.get('local')!;
    }
  }

  /**
   * Get Brain status and health metrics
   */
  async getStatus(): Promise<{
    healthy: boolean;
    providers: { [key: string]: boolean };
    activeConnections: number;
    uptime: number;
  }> {
    const providerStatus: { [key: string]: boolean } = {};

    for (const [name, provider] of this.providers) {
      providerStatus[name] = await provider.isHealthy();
    }

    return {
      healthy: Object.values(providerStatus).some(status => status),
      providers: providerStatus,
      activeConnections: this.sessionManager.getActiveSessionCount(),
      uptime: process.uptime()
    };
  }

  /**
   * Update Brain configuration
   */
  async updateConfig(newConfig: Partial<BrainConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig };

    // Reinitialize providers if needed
    if (newConfig.providers) {
      this.initializeProviders();
    }
  }

  /**
   * Graceful shutdown
   */
  async shutdown(): Promise<void> {
    console.log('ThinkxLife Brain shutting down...');

    // Close all provider connections
    for (const provider of this.providers.values()) {
      await provider.disconnect();
    }

    // Save any pending context data
    await this.contextManager.saveAll();

    console.log('ThinkxLife Brain shutdown complete');
  }
}

// Singleton instance
let brainInstance: ThinkxLifeBrain | null = null;

/**
 * Get the global Brain instance
 */
export function getBrain(config?: BrainConfig): ThinkxLifeBrain {
  if (!brainInstance && config) {
    brainInstance = new ThinkxLifeBrain(config);
  }

  if (!brainInstance) {
    throw new Error('Brain not initialized. Call getBrain(config) first.');
  }

  return brainInstance;
}

/**
 * Initialize the Brain with configuration
 */
export function initializeBrain(config: BrainConfig): ThinkxLifeBrain {
  brainInstance = new ThinkxLifeBrain(config);
  return brainInstance;
}
