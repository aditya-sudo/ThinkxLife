"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  BarChart3,
  Users,
  AlertTriangle,
  Clock,
  MessageSquare,
  TrendingUp,
  Calendar,
  User
} from "lucide-react";

type SessionAnalytics = {
  age_groups: Array<{
    age_group: string;
    session_count: number;
    avg_aces: number;
  }>;
  active_users: Array<{
    userId: string;
    session_count: number;
    total_messages: number;
    last_activity: string | null;
  }>;
  high_aces_sessions: Array<{
    id: string;
    userId: string;
    aceScore: number;
    age: number;
    message_count: number;
    createdAt: string | null;
  }>;
  user_sessions?: Array<{
    id: string;
    title: string | null;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    message_count: number;
  }>;
};

type SessionSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
};

export default function SessionSidebar({ isOpen, onClose, userId }: SessionSidebarProps) {
  const [analytics, setAnalytics] = useState<SessionAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions'>('overview');

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
    }
  }, [isOpen, userId]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const url = userId
        ? `/api/session-analytics?userId=${userId}`
        : '/api/session-analytics';

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Session Analytics</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex mt-3 bg-white/20 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-blue-600'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Overview
          </button>
          {userId && (
            <button
              onClick={() => setActiveTab('sessions')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'sessions'
                  ? 'bg-white text-blue-600'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              My Sessions
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : analytics ? (
          <>
            {activeTab === 'overview' && (
              <>
                {/* Active Users */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-green-500" />
                    <h3 className="font-semibold text-slate-800">Most Active Users</h3>
                  </div>
                  <div className="space-y-3">
                    {analytics.active_users.slice(0, 5).map((user) => (
                      <div key={user.userId} className="border-l-2 border-green-500 pl-3">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-slate-400" />
                          <span className="text-xs font-mono text-slate-600">
                            {user.userId.slice(0, 8)}...
                          </span>
                        </div>
                        <div className="text-sm font-medium">
                          {user.total_messages} messages
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.session_count} sessions
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'sessions' && analytics.user_sessions && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <h3 className="font-semibold text-slate-800">Your Sessions</h3>
                </div>

                {analytics.user_sessions.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No sessions found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {analytics.user_sessions.map((session) => (
                      <div key={session.id} className="bg-white rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              session.isActive ? 'bg-green-500' : 'bg-slate-400'
                            }`} />
                            <span className="text-sm font-medium">
                              {session.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {session.message_count} messages
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 space-y-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Created: {formatDate(session.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Updated: {formatDate(session.updatedAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No analytics data available</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <Button
          onClick={fetchAnalytics}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>
    </div>
  );
}
