"""
Zoe Core - Main AI companion that interfaces with the Brain module
"""

import logging
import uuid
from datetime import datetime
from typing import Dict, Optional, Any

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from brain import ThinkxLifeBrain
from brain.types import BrainRequest, UserContext, RequestContext, ApplicationType
# Removed conversation manager - no session management needed
from .personality import ZoePersonality

logger = logging.getLogger(__name__)


class ZoeCore:
    """
    Zoe AI Companion - Main interface that connects to ThinkxLife Brain
    
    This class handles:
    - Personality-based responses
    - Integration with Brain module for LLM calls
    - Context awareness
    """
    
    def __init__(self, brain_instance: Optional[ThinkxLifeBrain] = None):
        """Initialize Zoe with Brain integration"""
        self.brain = brain_instance or ThinkxLifeBrain()
        self.personality = ZoePersonality()
        
        logger.info("Zoe AI Companion initialized with Brain integration")
    
    async def process_message(
        self,
        message: str,
        user_context: Optional[Dict[str, Any]] = None,
        application: str = "chatbot"
    ) -> Dict[str, Any]:
        """
        Process a user message through Zoe's personality and Brain system
        
        Args:
            message: User's message
            user_context: User context information (age, ACE score, etc.)
            application: Application type (defaults to chatbot)
            
        Returns:
            Dictionary containing Zoe's response and metadata
        """
        try:
            # Check if message needs redirection (off-topic)
            if self.personality.is_off_topic_request(message):
                redirect_response = self.personality.get_redirect_response()
                
                return {
                    "success": True,
                    "response": redirect_response,
                    "redirected": True,
                    "timestamp": datetime.now().isoformat()
                }
            
            # Prepare enhanced context for Brain
            enhanced_context = self._prepare_brain_context(
                user_context=user_context or {},
                message=message
            )
            
            # Create Brain request
            brain_request_data = {
                "id": str(uuid.uuid4()),
                "message": message,
                "application": application,
                "user_context": enhanced_context,
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
                    conversation_context={}
                )
                
                return {
                    "success": True,
                    "response": filtered_response,
                    "brain_metadata": brain_response.get("metadata", {}),
                    "timestamp": datetime.now().isoformat()
                }
            else:
                # Brain processing failed, use fallback
                fallback_response = self.personality.get_fallback_response()
                
                return {
                    "success": True,
                    "response": fallback_response,
                    "fallback": True,
                    "timestamp": datetime.now().isoformat()
                }
                
        except Exception as e:
            logger.error(f"Error processing message in Zoe: {str(e)}")
            error_response = self.personality.get_error_response()
            
            return {
                "success": False,
                "response": error_response,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def _prepare_brain_context(
        self,
        user_context: Dict[str, Any],
        message: str
    ) -> Dict[str, Any]:
        """Prepare enhanced context for Brain processing"""
        
        # Prepare user context with Zoe-specific enhancements
        enhanced_context = {
            "is_authenticated": True,
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
                "trauma_aware": True,
                "safety_first": True
            },
            "zoe_context": {
                "personality_mode": "empathetic_companion",
                "response_style": "trauma_informed",
                "focus_areas": ["healing", "support", "growth", "resilience"]
            }
        }
        
        return enhanced_context
    
    async def health_check(self) -> Dict[str, Any]:
        """Check Zoe's health status"""
        try:
            # Check Brain health
            brain_health = await self.brain.get_health_status()
            
            overall_health = "healthy"
            if brain_health.get("overall") != "healthy":
                overall_health = "degraded"
            
            return {
                "overall": overall_health,
                "components": {
                    "brain": brain_health,
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