/**
 * Security Manager for ThinkxLife Brain
 *
 * Handles security validation, rate limiting, and content filtering
 */

import { AIRequest, UserContext } from './types';

export class SecurityManager {
  private rateLimitCache: Map<string, { count: number; resetTime: number }> = new Map();

  async validateRequest(request: AIRequest, userContext: UserContext): Promise<void> {
    // Rate limiting
    await this.checkRateLimit(userContext.userId);

    // Content filtering
    this.filterContent(request.message);

    // User validation
    this.validateUser(userContext);
  }

  private async checkRateLimit(userId: string): Promise<void> {
    const now = Date.now();
    const userLimit = this.rateLimitCache.get(userId);

    if (!userLimit || now > userLimit.resetTime) {
      // Reset rate limit
      this.rateLimitCache.set(userId, {
        count: 1,
        resetTime: now + (60 * 1000) // 1 minute
      });
      return;
    }

    if (userLimit.count >= 60) { // 60 requests per minute
      throw new Error('Rate limit exceeded');
    }

    userLimit.count++;
  }

  private filterContent(message: string): void {
    // Basic content filtering
    const blockedWords = ['spam', 'abuse']; // Add more as needed

    for (const word of blockedWords) {
      if (message.toLowerCase().includes(word)) {
        throw new Error('Content contains blocked words');
      }
    }
  }

  private validateUser(userContext: UserContext): void {
    if (!userContext.isAuthenticated) {
      throw new Error('User must be authenticated');
    }
  }
}
