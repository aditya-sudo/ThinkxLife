/**
 * Session Manager for ThinkxLife Brain
 *
 * Manages user sessions and concurrent connections
 */

export class SessionManager {
  private activeSessions: Map<string, any> = new Map();

  getActiveSessionCount(): number {
    return this.activeSessions.size;
  }

  async createSession(userId: string, sessionId: string): Promise<void> {
    this.activeSessions.set(sessionId, {
      userId,
      startTime: new Date(),
      lastActivity: new Date()
    });
  }

  async endSession(sessionId: string): Promise<void> {
    this.activeSessions.delete(sessionId);
  }

  async updateSessionActivity(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      session.lastActivity = new Date();
    }
  }
}
