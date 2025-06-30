"""
Conversation Manager for Zoe
Handles session management and conversation history
"""

import logging
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any

logger = logging.getLogger(__name__)


class ConversationManager:
    """
    Manages conversation sessions and message history for Zoe
    
    This is a simplified in-memory implementation that can be extended
    to use database storage for persistence.
    """
    
    def __init__(self):
        self.sessions = {}  # session_id -> session_data
        self.user_sessions = {}  # user_id -> list of session_ids
        self.session_timeout_hours = 24
        self.max_sessions_per_user = 10
        
        logger.info("Zoe ConversationManager initialized")
    
    def get_or_create_session(
        self,
        user_id: str,
        session_id: Optional[str] = None,
        user_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Get existing session or create a new one
        
        Args:
            user_id: User identifier
            session_id: Optional existing session ID
            user_context: User context information
            
        Returns:
            Session data dictionary
        """
        # If session_id provided, try to get existing session
        if session_id and session_id in self.sessions:
            session = self.sessions[session_id]
            if self._is_session_valid(session):
                session["last_activity"] = datetime.now()
                return session
            else:
                # Session expired, remove it
                self._remove_session(session_id)
        
        # Create new session
        if not session_id:
            session_id = str(uuid.uuid4())
        
        session_data = {
            "session_id": session_id,
            "user_id": user_id,
            "created_at": datetime.now(),
            "last_activity": datetime.now(),
            "messages": [],
            "user_context": user_context or {},
            "metadata": {
                "message_count": 0,
                "total_tokens": 0,
                "personality_mode": "empathetic_companion"
            }
        }
        
        # Store session
        self.sessions[session_id] = session_data
        
        # Track user sessions
        if user_id not in self.user_sessions:
            self.user_sessions[user_id] = []
        
        self.user_sessions[user_id].append(session_id)
        
        # Cleanup old sessions for this user
        self._cleanup_user_sessions(user_id)
        
        logger.info(f"Created new Zoe session {session_id} for user {user_id}")
        return session_data
    
    def add_message(
        self,
        session_id: str,
        role: str,
        content: str,
        metadata: Optional[Dict[str, Any]] = None
    ):
        """
        Add a message to the conversation session
        
        Args:
            session_id: Session identifier
            role: Message role (user, assistant, system)
            content: Message content
            metadata: Optional message metadata
        """
        if session_id not in self.sessions:
            logger.warning(f"Attempted to add message to non-existent session {session_id}")
            return
        
        session = self.sessions[session_id]
        
        message = {
            "id": str(uuid.uuid4()),
            "role": role,
            "content": content,
            "timestamp": datetime.now(),
            "metadata": metadata or {}
        }
        
        session["messages"].append(message)
        session["last_activity"] = datetime.now()
        session["metadata"]["message_count"] += 1
        
        # Limit conversation history (keep last 50 messages)
        if len(session["messages"]) > 50:
            session["messages"] = session["messages"][-50:]
        
        logger.debug(f"Added {role} message to session {session_id}")
    
    def get_session_history(self, session_id: str) -> List[Dict[str, Any]]:
        """
        Get conversation history for a session
        
        Args:
            session_id: Session identifier
            
        Returns:
            List of messages in the session
        """
        if session_id not in self.sessions:
            return []
        
        session = self.sessions[session_id]
        if not self._is_session_valid(session):
            self._remove_session(session_id)
            return []
        
        return session["messages"].copy()
    
    def get_session_info(self, session_id: str) -> Optional[Dict[str, Any]]:
        """
        Get session information
        
        Args:
            session_id: Session identifier
            
        Returns:
            Session information or None if not found
        """
        if session_id not in self.sessions:
            return None
        
        session = self.sessions[session_id]
        if not self._is_session_valid(session):
            self._remove_session(session_id)
            return None
        
        return {
            "session_id": session["session_id"],
            "user_id": session["user_id"],
            "created_at": session["created_at"],
            "last_activity": session["last_activity"],
            "message_count": session["metadata"]["message_count"],
            "user_context": session["user_context"]
        }
    
    def end_session(self, session_id: str):
        """
        End a conversation session
        
        Args:
            session_id: Session identifier
        """
        if session_id in self.sessions:
            session = self.sessions[session_id]
            user_id = session["user_id"]
            
            # Remove from user sessions list
            if user_id in self.user_sessions:
                self.user_sessions[user_id] = [
                    sid for sid in self.user_sessions[user_id] 
                    if sid != session_id
                ]
            
            # Remove session
            del self.sessions[session_id]
            
            logger.info(f"Ended Zoe session {session_id}")
    
    def get_user_sessions(self, user_id: str, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Get recent sessions for a user
        
        Args:
            user_id: User identifier
            limit: Maximum number of sessions to return
            
        Returns:
            List of session information
        """
        if user_id not in self.user_sessions:
            return []
        
        user_session_ids = self.user_sessions[user_id]
        sessions_info = []
        
        for session_id in user_session_ids:
            if session_id in self.sessions:
                session = self.sessions[session_id]
                if self._is_session_valid(session):
                    sessions_info.append({
                        "session_id": session_id,
                        "created_at": session["created_at"],
                        "last_activity": session["last_activity"],
                        "message_count": session["metadata"]["message_count"]
                    })
        
        # Sort by last activity (most recent first)
        sessions_info.sort(key=lambda x: x["last_activity"], reverse=True)
        
        return sessions_info[:limit]
    
    def cleanup_expired_sessions(self):
        """Clean up expired sessions"""
        expired_sessions = []
        
        for session_id, session in self.sessions.items():
            if not self._is_session_valid(session):
                expired_sessions.append(session_id)
        
        for session_id in expired_sessions:
            self._remove_session(session_id)
        
        if expired_sessions:
            logger.info(f"Cleaned up {len(expired_sessions)} expired Zoe sessions")
    
    def health_check(self) -> Dict[str, Any]:
        """
        Check the health of the conversation manager
        
        Returns:
            Health status information
        """
        try:
            # Clean up expired sessions first
            self.cleanup_expired_sessions()
            
            total_sessions = len(self.sessions)
            total_users = len(self.user_sessions)
            
            return {
                "healthy": True,
                "total_sessions": total_sessions,
                "total_users": total_users,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error in ConversationManager health check: {str(e)}")
            return {
                "healthy": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def _is_session_valid(self, session: Dict[str, Any]) -> bool:
        """Check if a session is still valid (not expired)"""
        timeout = timedelta(hours=self.session_timeout_hours)
        return datetime.now() - session["last_activity"] < timeout
    
    def _remove_session(self, session_id: str):
        """Remove a session and clean up references"""
        if session_id in self.sessions:
            session = self.sessions[session_id]
            user_id = session["user_id"]
            
            # Remove from user sessions list
            if user_id in self.user_sessions:
                self.user_sessions[user_id] = [
                    sid for sid in self.user_sessions[user_id] 
                    if sid != session_id
                ]
                
                # Remove user entry if no sessions left
                if not self.user_sessions[user_id]:
                    del self.user_sessions[user_id]
            
            # Remove session
            del self.sessions[session_id]
    
    def _cleanup_user_sessions(self, user_id: str):
        """Clean up old sessions for a user to enforce limits"""
        if user_id not in self.user_sessions:
            return
        
        user_session_ids = self.user_sessions[user_id]
        valid_sessions = []
        
        # Check which sessions are still valid
        for session_id in user_session_ids:
            if session_id in self.sessions:
                session = self.sessions[session_id]
                if self._is_session_valid(session):
                    valid_sessions.append((session_id, session["last_activity"]))
                else:
                    # Remove expired session
                    del self.sessions[session_id]
        
        # Sort by last activity (most recent first)
        valid_sessions.sort(key=lambda x: x[1], reverse=True)
        
        # Keep only the most recent sessions
        if len(valid_sessions) > self.max_sessions_per_user:
            # Remove older sessions
            for session_id, _ in valid_sessions[self.max_sessions_per_user:]:
                if session_id in self.sessions:
                    del self.sessions[session_id]
            
            valid_sessions = valid_sessions[:self.max_sessions_per_user]
        
        # Update user sessions list
        self.user_sessions[user_id] = [session_id for session_id, _ in valid_sessions] 