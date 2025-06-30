/**
 * Local Provider - Integration with existing ThinkxLife chatbot
 *
 * This provider connects the Brain to your existing Python backend
 * chatbot system, allowing seamless integration while adding Brain
 * orchestration capabilities.
 */

import { AIProvider, AIRequest, AIResponse, LocalConfig, UserContext } from '../types';

export class LocalProvider implements AIProvider {
  public readonly name = 'local';
  private config: LocalConfig;
  private healthStatus: boolean = true;
  private lastHealthCheck: Date = new Date();

  constructor(config: LocalConfig) {
    this.config = config;
  }

  /**
   * Process AI request through local chatbot backend
   */
  async process(request: AIRequest, userContext: UserContext): Promise<AIResponse> {
    const startTime = Date.now();

    try {
      // Prepare request for your existing backend
      const backendRequest = this.prepareBackendRequest(request, userContext);

      // Call your existing chatbot API
      const response = await this.callChatbotAPI(backendRequest);

      // Transform response to Brain format
      return this.transformResponse(response, startTime);

    } catch (error) {
      console.error('Local provider error:', error);
      return {
        success: false,
        error: 'Failed to process request through local provider',
        timestamp: new Date().toISOString(),
        metadata: {
          provider: this.name,
          model: 'local-chatbot',
          processingTime: Date.now() - startTime
        }
      };
    }
  }

  /**
   * Prepare request for your existing backend format
   */
  private prepareBackendRequest(request: AIRequest, userContext: UserContext) {
    return {
      message: request.message,
      user_id: userContext.userId,
      session_id: userContext.sessionId,
      age: userContext.userProfile?.age,
      ace_score: userContext.userProfile?.aceScore,
      context: {
        application: request.application,
        conversation_history: request.context?.conversationHistory || [],
        user_preferences: userContext.preferences,
        retrieved_docs: request.context?.retrievedDocs,
        // Add Brain-specific context
        brain_context: {
          trauma_informed: request.context?.traumaInformed || false,
          educational: request.context?.educational || false,
          compliance: request.context?.compliance || false,
          creative: request.context?.creative || false,
          safety_protocols: request.context?.safetyProtocols || false
        }
      },
      metadata: {
        timestamp: request.timestamp,
        request_id: request.id,
        user_agent: request.metadata?.userAgent,
        device_type: request.metadata?.deviceType
      }
    };
  }

  /**
   * Call your existing chatbot API
   */
  private async callChatbotAPI(backendRequest: any): Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(`${this.config.endpoint}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: JSON.stringify(backendRequest),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Transform backend response to Brain format
   */
  private transformResponse(backendResponse: any, startTime: number): AIResponse {
    return {
      id: backendResponse.response_id || undefined,
      success: true,
      message: backendResponse.response || backendResponse.message,
      data: {
        conversation_id: backendResponse.conversation_id,
        retrieved_docs: backendResponse.retrieved_docs,
        confidence: backendResponse.confidence,
        sources: backendResponse.sources,
        // Include any additional data from your backend
        ...backendResponse.additional_data
      },
      metadata: {
        provider: this.name,
        model: 'local-chatbot',
        tokensUsed: backendResponse.tokens_used,
        processingTime: Date.now() - startTime,
        confidence: backendResponse.confidence,
        sources: backendResponse.sources || []
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Check health of local provider
   */
  async isHealthy(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(`${this.config.endpoint}/health`, {
        method: 'GET',
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      this.healthStatus = response.ok;
      this.lastHealthCheck = new Date();

      return this.healthStatus;
    } catch (error) {
      console.error('Local provider health check failed:', error);
      this.healthStatus = false;
      this.lastHealthCheck = new Date();
      return false;
    }
  }

  /**
   * Get detailed health information
   */
  async getHealthDetails(): Promise<{
    status: boolean;
    lastCheck: Date;
    endpoint: string;
    responseTime?: number;
    version?: string;
  }> {
    const startTime = Date.now();
    const isHealthy = await this.isHealthy();
    const responseTime = Date.now() - startTime;

    return {
      status: isHealthy,
      lastCheck: this.lastHealthCheck,
      endpoint: this.config.endpoint,
      responseTime,
      version: await this.getBackendVersion()
    };
  }

  /**
   * Get backend version information
   */
  private async getBackendVersion(): Promise<string | undefined> {
    try {
      const response = await fetch(`${this.config.endpoint}/version`, {
        method: 'GET',
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.version;
      }
    } catch (error) {
      // Version endpoint might not exist, that's okay
    }
    return undefined;
  }

  /**
   * Disconnect from provider
   */
  async disconnect(): Promise<void> {
    // Local provider doesn't need explicit disconnection
    // but we can log the disconnection
    console.log('Local provider disconnected');
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: LocalConfig): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): LocalConfig {
    return { ...this.config };
  }

  /**
   * Test connection with a simple ping
   */
  async ping(): Promise<{ success: boolean; responseTime: number }> {
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.config.endpoint}/ping`, {
        method: 'GET',
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        }
      });

      return {
        success: response.ok,
        responseTime: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        responseTime: Date.now() - startTime
      };
    }
  }
}
