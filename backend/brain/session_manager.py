"""
Session Manager for ThinkxLife Brain
"""

from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
import uuid
import logging

logger = logging.getLogger(__name__)


class SessionManager:
    """
    Manages user sessions and session-related data
    """
    
    def __init__(self):
        self.sessions = {}  # session_id -> session_data
        self.user_sessions = {}  # user_id -> list of session_ids
        self.timeout_minutes = 30
        self.max_concurrent_sessions = 5
    
    def create_session(self, user_id: str, application: str = "general") -> str:
        """Create a new session for a user"""
        session_id = str(uuid.uuid4())
        
        session_data = {
            "id": session_id,
            "user_id": user_id,
            "application": application,
            "created_at": datetime.now(),
            "last_activity": datetime.now(),
            "is_active": True,
            "metadata": {}
        }
        
        self.sessions[session_id] = session_data
        
        # Track user sessions
        if user_id not in self.user_sessions:
            self.user_sessions[user_id] = []
        
        self.user_sessions[user_id].append(session_id)
        
        # Limit concurrent sessions
        self._cleanup_user_sessions(user_id)
        
        logger.info(f"Created session {session_id} for user {user_id}")
        return session_id
    
    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        """Get session data"""
        session = self.sessions.get(session_id)
        if session and self._is_session_valid(session):
            session["last_activity"] = datetime.now()
            return session
        return None
    
    def update_session(self, session_id: str, updates: Dict[str, Any]):
        """Update session data"""
        if session_id in self.sessions:
            self.sessions[session_id].update(updates)
            self.sessions[session_id]["last_activity"] = datetime.now()
    
    def end_session(self, session_id: str):
        """End a session"""
        if session_id in self.sessions:
            self.sessions[session_id]["is_active"] = False
            logger.info(f"Ended session {session_id}")
    
    def _is_session_valid(self, session: Dict[str, Any]) -> bool:
        """Check if a session is still valid"""
        if not session.get("is_active", False):
            return False
        
        timeout = timedelta(minutes=self.timeout_minutes)
        return datetime.now() - session["last_activity"] < timeout
    
    def _cleanup_user_sessions(self, user_id: str):
        """Clean up old sessions for a user"""
        if user_id not in self.user_sessions:
            return
        
        user_session_ids = self.user_sessions[user_id]
        active_sessions = []
        
        for session_id in user_session_ids:
            session = self.sessions.get(session_id)
            if session and self._is_session_valid(session):
                active_sessions.append(session_id)
            elif session_id in self.sessions:
                del self.sessions[session_id]
        
        # Keep only the most recent sessions
        if len(active_sessions) > self.max_concurrent_sessions:
            # Sort by last activity and keep the most recent
            sorted_sessions = sorted(
                active_sessions,
                key=lambda sid: self.sessions[sid]["last_activity"],
                reverse=True
            )
            
            # End older sessions
            for session_id in sorted_sessions[self.max_concurrent_sessions:]:
                self.end_session(session_id)
                active_sessions.remove(session_id)
        
        self.user_sessions[user_id] = active_sessions
    
    def cleanup_expired_sessions(self):
        """Remove expired sessions"""
        expired_sessions = []
        
        for session_id, session in self.sessions.items():
            if not self._is_session_valid(session):
                expired_sessions.append(session_id)
        
        for session_id in expired_sessions:
            user_id = self.sessions[session_id]["user_id"]
            del self.sessions[session_id]
            
            if user_id in self.user_sessions:
                self.user_sessions[user_id] = [
                    sid for sid in self.user_sessions[user_id] 
                    if sid != session_id
                ]
        
        if expired_sessions:
            logger.info(f"Cleaned up {len(expired_sessions)} expired sessions") 