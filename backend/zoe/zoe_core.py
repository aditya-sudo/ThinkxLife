"""
Zoe Core - Main AI companion that interfaces with the Brain module
"""

import logging
import uuid
from datetime import datetime
from typing import Dict, List, Optional, Any

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from brain import ThinkxLifeBrain
from brain.types import BrainRequest, UserContext, RequestContext, ApplicationType
from .conversation_manager import ConversationManager
from .personality import ZoePersonality

logger = logging.getLogger(__name__)


class ZoeCore:
    """
    Zoe AI Companion - Main interface that connects to ThinkxLife Brain
    
    This class handles:
    - Conversation management
    - Personality-based responses
    - Integration with Brain module for LLM calls
    - Session management
    - Context awareness
    """
    
    def __init__(self, brain_instance: Optional[ThinkxLifeBrain] = None):
        """Initialize Zoe with Brain integration"""
        self.brain = brain_instance or ThinkxLifeBrain()
        self.conversation_manager = ConversationManager()
        self.personality = ZoePersonality()
        
        logger.info("Zoe AI Companion initialized with Brain integration")
    
    async def process_message(
        self,
        message: str,
        user_id: str,
        session_id: Optional[str] = None,
        user_context: Optional[Dict[str, Any]] = None,
        application: str = "chatbot"
    ) -> Dict[str, Any]:
        """
        Process a user message through Zoe's personality and Brain system
        
        Args:
            message: User's message
            user_id: User identifier
            session_id: Optional session ID
            user_context: User context information (age, ACE score, etc.)
            application: Application type (defaults to chatbot)
            
        Returns:
            Dictionary containing Zoe's response and metadata
        """
        try:
            # Generate session ID if not provided
            if not session_id:
                session_id = str(uuid.uuid4())
            
            # Get or create conversation session
            conversation = self.conversation_manager.get_or_create_session(
                user_id=user_id,
                session_id=session_id,
                user_context=user_context or {}
            )
            
            # Check if message needs redirection (off-topic)
            if self.personality.is_off_topic_request(message):
                redirect_response = self.personality.get_redirect_response()
                
                # Save the interaction
                self.conversation_manager.add_message(
                    session_id=session_id,
                    role="user",
                    content=message
                )
                self.conversation_manager.add_message(
                    session_id=session_id,
                    role="assistant",
                    content=redirect_response
                )
                
                return {
                    "success": True,
                    "response": redirect_response,
                    "session_id": session_id,
                    "redirected": True,
                    "timestamp": datetime.now().isoformat()
                }
            
            # Prepare enhanced context for Brain
            enhanced_context = self._prepare_brain_context(
                conversation=conversation,
                user_context=user_context or {},
                message=message
            )
            
            # Create Brain request
            brain_request_data = {
                "id": str(uuid.uuid4()),
                "message": message,
                "application": application,
                "user_context": enhanced_context,
                "session_id": session_id,
                "metadata": {
                    "source": "zoe",
                    "personality_mode": "empathetic_companion"
                }
            }
            
            # Process through Brain system
            brain_response = await self.brain.process_request(brain_request_data)
            
            if brain_response.get("success", False):
                ai_response = brain_response.get("message", "")
                
                # Apply Zoe's personality filter to the response
                filtered_response = self.personality.filter_response(
                    response=ai_response,
                    user_context=user_context or {},
                    conversation_context=conversation
                )
                
                # Save the interaction
                self.conversation_manager.add_message(
                    session_id=session_id,
                    role="user",
                    content=message
                )
                self.conversation_manager.add_message(
                    session_id=session_id,
                    role="assistant",
                    content=filtered_response,
                    metadata={
                        "brain_response": brain_response,
                        "personality_applied": True
                    }
                )
                
                return {
                    "success": True,
                    "response": filtered_response,
                    "session_id": session_id,
                    "brain_metadata": brain_response.get("metadata", {}),
                    "timestamp": datetime.now().isoformat()
                }
            else:
                # Handle Brain processing error
                error_response = self.personality.get_error_response()
                
                self.conversation_manager.add_message(
                    session_id=session_id,
                    role="user",
                    content=message
                )
                self.conversation_manager.add_message(
                    session_id=session_id,
                    role="assistant",
                    content=error_response,
                    metadata={
                        "error": brain_response.get("error"),
                        "brain_failed": True
                    }
                )
                
                return {
                    "success": False,
                    "response": error_response,
                    "session_id": session_id,
                    "error": brain_response.get("error", "Unknown error"),
                    "timestamp": datetime.now().isoformat()
                }
                
        except Exception as e:
            logger.error(f"Error processing message in Zoe: {str(e)}")
            
            # Fallback response
            fallback_response = self.personality.get_fallback_response()
            
            return {
                "success": False,
                "response": fallback_response,
                "session_id": session_id,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def _prepare_brain_context(
        self,
        conversation: Dict[str, Any],
        user_context: Dict[str, Any],
        message: str
    ) -> Dict[str, Any]:
        """Prepare enhanced context for Brain processing"""
        
        # Get conversation history
        conversation_history = conversation.get("messages", [])
        
        # Prepare user context with Zoe-specific enhancements
        enhanced_context = {
            "user_id": conversation.get("user_id"),
            "session_id": conversation.get("session_id"),
            "is_authenticated": True,  # Assume authenticated for now
            "user_profile": {
                "age": user_context.get("age"),
                "ace_score": user_context.get("ace_score"),
                "ai_knowledge_level": user_context.get("ai_knowledge_level", "beginner")
            },
            "preferences": {
                "communication_style": "empathetic",
                "ai_personality": "supportive",
                "privacy_level": "medium",
                "content_filtering": True
            },
            "trauma_context": {
                "ace_score": user_context.get("ace_score", 0.0),
                "trauma_types": user_context.get("trauma_types", []),
                "trigger_words": user_context.get("trigger_words", []),
                "safety_preferences": {
                    "trauma_safe_mode": True,
                    "gentle_language": True,
                    "avoid_overwhelming": True
                }
            },
            "conversation_context": {
                "history": conversation_history[-10:],  # Last 10 messages
                "session_length": len(conversation_history),
                "current_message": message,
                "zoe_personality_active": True
            }
        }
        
        return enhanced_context
    
    async def get_session_history(self, session_id: str) -> List[Dict[str, Any]]:
        """Get conversation history for a session"""
        return self.conversation_manager.get_session_history(session_id)
    
    async def end_session(self, session_id: str):
        """End a conversation session"""
        self.conversation_manager.end_session(session_id)
        logger.info(f"Zoe session {session_id} ended")
    
    async def get_user_sessions(self, user_id: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Get recent sessions for a user"""
        return self.conversation_manager.get_user_sessions(user_id, limit)
    
    async def health_check(self) -> Dict[str, Any]:
        """Check Zoe's health status"""
        try:
            # Check Brain health
            brain_health = await self.brain.get_health_status()
            
            # Check conversation manager
            conversation_health = self.conversation_manager.health_check()
            
            overall_health = "healthy"
            if brain_health.get("overall") != "healthy" or not conversation_health.get("healthy", True):
                overall_health = "degraded"
            
            return {
                "overall": overall_health,
                "components": {
                    "brain": brain_health,
                    "conversation_manager": conversation_health,
                    "personality": {"status": "healthy"}
                },
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error in Zoe health check: {str(e)}")
            return {
                "overall": "unhealthy",
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            } 