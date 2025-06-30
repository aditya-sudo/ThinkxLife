"""
Local Provider - Integrates with existing ThinkxLife chatbot backend

This provider serves as a bridge between the new Brain system and the existing
ThinkxLife chatbot functionality, ensuring backward compatibility while enabling
new features.
"""

import asyncio
import logging
import time
from typing import Dict, List, Optional, Any

from ..types import ProviderConfig

logger = logging.getLogger(__name__)


class LocalProvider:
    """
    Local AI provider that integrates with the existing ThinkxLife chatbot backend.
    
    This provider maintains compatibility with the existing ThinkxLife 
    chatbot_core.py functionality, maintaining backward compatibility while
    enabling the new Brain orchestration system.
    
    The provider handles:
    - Request processing through existing chatbot core
    - Response formatting for Brain system
    - Session management integration
    - Health monitoring
    """
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize local provider with configuration"""
        self.config = config
        self.endpoint = config.get("endpoint", "http://localhost:8000")
        self.timeout = config.get("timeout", 30.0)
        self.enabled = config.get("enabled", True)
        
        # Note: Local provider now integrates with Zoe through the Brain system
        # Direct chatbot core integration has been replaced with Brain orchestration
        self.chatbot_core = None
        self.session_manager = None
        logger.info("Local provider initialized (Zoe integration through Brain system)")
    
    async def process_request(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a request using the local chatbot system
        
        Args:
            request_data: Dictionary containing the request information
            
        Returns:
            Dictionary containing the response
        """
        start_time = time.time()
        
        try:
            # Extract request information
            message = request_data.get("message", "")
            application = request_data.get("application", "general")
            user_context = request_data.get("user_context", {})
            session_id = request_data.get("session_id")
            
            if not message:
                return {
                    "success": False,
                    "error": "No message provided",
                    "timestamp": time.time()
                }
            
            # Since we're now using Zoe through Brain orchestration,
            # this provider returns a simple response indicating the integration
            if not self.chatbot_core:
                return {
                    "success": False,
                    "error": "Chatbot core not available",
                    "message": "Local provider is now integrated through Zoe AI Companion",
                    "timestamp": time.time()
                }
            
            # Legacy support - this code path is maintained for backward compatibility
            # but should not be reached in the new Zoe integration
            
            # Extract user context for chatbot
            user_id = user_context.get("user_id", "anonymous")
            age = user_context.get("user_profile", {}).get("age")
            ace_score = user_context.get("trauma_context", {}).get("ace_score")
            
            # Create enhanced context for chatbot core
            enhanced_context = {
                "user_id": user_id,
                "session_id": session_id,
                "age": age,
                "ace_score": ace_score,
                "application": application,
                "user_context": user_context
            }
            
            # Process with existing chatbot core
            chatbot_response = await self._process_with_chatbot_core(
                message, enhanced_context
            )
            
            # Transform response to Brain format
            processing_time = time.time() - start_time
            response = self._transform_chatbot_response(
                chatbot_response,
                application,
                processing_time
            )
            
            return response
            
        except Exception as e:
            logger.error(f"Error in local provider: {str(e)}")
            processing_time = time.time() - start_time
            
            return {
                "success": False,
                "error": str(e),
                "message": "Local provider encountered an error",
                "metadata": {
                    "provider": "local",
                    "processing_time": processing_time
                },
                "timestamp": time.time()
            }
    
    async def _process_with_chatbot_core(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Process message with existing chatbot core"""
        try:
            # This method is kept for backward compatibility
            # Use existing chatbot core functionality
            if hasattr(self.chatbot_core, 'process_message'):
                # If chatbot core has async process_message
                response = await self.chatbot_core.process_message(
                    message=message,
                    user_id=context.get("user_id"),
                    session_id=context.get("session_id"),
                    age=context.get("age"),
                    ace_score=context.get("ace_score")
                )
            else:
                # Fallback to synchronous method
                response = self.chatbot_core.generate_response(
                    message=message,
                    session_id=context.get("session_id"),
                    user_id=context.get("user_id"),
                    age=context.get("age"),
                    ace_score=context.get("ace_score")
                )
            
            return {"success": True, "response": response}
            
        except Exception as e:
            logger.error(f"Error processing with chatbot core: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "response": "I apologize, but I'm having technical difficulties."
            }
    
    def _transform_chatbot_response(self, chatbot_response: Dict[str, Any], application: str, processing_time: float) -> Dict[str, Any]:
        """Transform chatbot response to Brain response format"""
        
        # Extract message from chatbot response
        message = chatbot_response.get("response", chatbot_response.get("message", ""))
        
        # Determine success status
        success = chatbot_response.get("success", True) and bool(message)
        
        # Create Brain-compatible response
        brain_response = {
            "success": success,
            "message": message,
            "metadata": {
                "provider": "local",
                "model": "chatbot_core",
                "application": application,
                "processing_time": processing_time,
                "tokens_used": None,  # Not available from chatbot core
                "confidence": None
            },
            "timestamp": time.time()
        }
        
        # Add error information if present
        if not success:
            brain_response["error"] = chatbot_response.get("error", "Unknown error")
        
        # Add additional data if present
        if "data" in chatbot_response:
            brain_response["data"] = chatbot_response["data"]
        
        # Add session information if present
        if "session_id" in chatbot_response:
            brain_response["session_id"] = chatbot_response["session_id"]
        
        return brain_response
    
    async def health_check(self) -> Dict[str, Any]:
        """
        Check the health of the local provider
        
        Returns:
            Dictionary containing health status
        """
        try:
            # Basic connectivity check
            health_status = {
                "status": "healthy",
                "provider": "local",
                "endpoint": self.endpoint,
                "enabled": self.enabled,
                "timestamp": time.time()
            }
            
            # Check chatbot core availability
            if not self.chatbot_core:
                health_status.update({
                    "status": "degraded",
                    "message": "Chatbot core not available"
                })
                return health_status
            
            # Test chatbot core with a simple request
            test_response = await self._process_with_chatbot_core(
                "Health check", {"user_id": "health_check"}
            )
            
            if test_response.get("success", False):
                health_status.update({
                    "chatbot_core": "available",
                    "test_response": "success"
                })
            else:
                health_status.update({
                    "status": "degraded",
                    "chatbot_core": "error",
                    "test_response": test_response.get("error", "Unknown error")
                })
            
            return health_status
            
        except Exception as e:
            logger.error(f"Error in local provider health check: {str(e)}")
            return {
                "status": "unhealthy",
                "provider": "local",
                "error": str(e),
                "timestamp": time.time()
            }
    
    async def shutdown(self):
        """Shutdown the local provider"""
        try:
            logger.info("Shutting down local provider...")
            
            # Clean up chatbot core if available
            if self.chatbot_core and hasattr(self.chatbot_core, 'close'):
                await self.chatbot_core.close()
            
            logger.info("Local provider shutdown complete")
            
        except Exception as e:
            logger.error(f"Error during local provider shutdown: {str(e)}")
    
    def get_stats(self) -> Dict[str, Any]:
        """
        Get provider statistics
        
        Returns:
            Dictionary containing provider stats
        """
        return {
            "provider": "local",
            "enabled": self.enabled,
            "endpoint": self.endpoint,
            "timeout": self.timeout,
            "chatbot_core_available": self.chatbot_core is not None,
            "session_manager_available": self.session_manager is not None
        } 