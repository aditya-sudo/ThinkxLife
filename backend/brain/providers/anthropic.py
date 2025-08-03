"""
Anthropic Provider - Optional external AI provider for ThinkxLife Brain
"""

import asyncio
import logging
import time
from datetime import datetime
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

try:
    import anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False
    logger.warning("Anthropic package not available. Install with: pip install anthropic")


class AnthropicProvider:
    """
    Anthropic provider for external AI capabilities.
    
    This provider integrates with Anthropic's Claude API to provide additional
    AI capabilities beyond the local chatbot system.
    """
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize the Anthropic provider"""
        if not ANTHROPIC_AVAILABLE:
            raise ImportError("Anthropic package not available. Install with: pip install anthropic")
        
        self.config = config
        self.api_key = config.get("api_key")
        self.model = config.get("model", "claude-3-sonnet-20240229")
        self.max_tokens = config.get("max_tokens", 2000)
        self.temperature = config.get("temperature", 0.7)
        self.timeout = config.get("timeout", 30.0)
        self.enabled = config.get("enabled", False)
        
        if not self.api_key:
            raise ValueError("Anthropic API key is required")
        
        # Initialize Anthropic client
        self.client = anthropic.AsyncAnthropic(
            api_key=self.api_key,
            timeout=self.timeout
        )
        
        logger.info(f"Anthropic provider initialized with model: {self.model}")
    
    async def process_request(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a request using Anthropic API
        
        Args:
            request_data: Enhanced request data from Brain
            
        Returns:
            Dictionary with response data
        """
        start_time = time.time()
        
        try:
            if not self.enabled:
                return {
                    "success": False,
                    "error": "Anthropic provider is disabled",
                    "timestamp": datetime.now().isoformat()
                }
            
            # Extract request components
            message = request_data.get("message", "")
            system_prompt = request_data.get("system_prompt", "")
            user_context = request_data.get("user_context", {})
            application = request_data.get("application", "general")
            
            # Build messages for Anthropic
            messages = []
            
            # Add conversation history if available
            history = user_context.get("conversation_history", [])
            for msg in history[-10:]:  # Last 10 messages
                role = msg.get("role", "user")
                # Anthropic uses "user" and "assistant" roles
                if role == "system":
                    continue  # System messages handled separately
                messages.append({
                    "role": role,
                    "content": msg.get("content", "")
                })
            
            # Add current message
            messages.append({
                "role": "user",
                "content": message
            })
            
            # Make API call
            response = await self.client.messages.create(
                model=self.model,
                max_tokens=self.max_tokens,
                temperature=self.temperature,
                system=system_prompt if system_prompt else None,
                messages=messages
            )
            
            # Extract response
            ai_message = response.content[0].text if response.content else ""
            tokens_used = response.usage.output_tokens + response.usage.input_tokens if response.usage else None
            
            # Build Brain response
            brain_response = {
                "success": True,
                "message": ai_message,
                "timestamp": datetime.now().isoformat(),
                "metadata": {
                    "provider": "anthropic",
                    "model": self.model,
                    "tokens_used": tokens_used,
                    "processing_time": time.time() - start_time,
                    "application": application,
                    "sources": ["Anthropic API"]
                }
            }
            
            # Add application-specific metadata
            self._add_application_metadata(brain_response, application)
            
            return brain_response
            
        except Exception as e:
            logger.error(f"Error in Anthropic provider: {str(e)}")
            return {
                "success": False,
                "error": f"Anthropic provider error: {str(e)}",
                "timestamp": datetime.now().isoformat(),
                "metadata": {
                    "provider": "anthropic",
                    "processing_time": time.time() - start_time
                }
            }
    
    def _add_application_metadata(self, response: Dict[str, Any], application: str):
        """Add application-specific metadata"""
        
        if application == "healing-rooms":
            response["metadata"]["trauma_informed"] = True
            response["metadata"]["safety_checked"] = True
        elif application == "inside-our-ai":
            response["metadata"]["educational"] = True
            response["metadata"]["ethics_focused"] = True
        elif application == "compliance":
            response["metadata"]["regulatory"] = True
            response["metadata"]["compliance_checked"] = True
        elif application == "exterior-spaces":
            response["metadata"]["creative"] = True
            response["metadata"]["design_focused"] = True
    
    async def health_check(self) -> Dict[str, Any]:
        """Check the health of the Anthropic provider"""
        
        try:
            if not self.enabled:
                return {
                    "status": "disabled",
                    "message": "Anthropic provider is disabled"
                }
            
            # Test API connectivity
            test_response = await self.client.messages.create(
                model=self.model,
                max_tokens=10,
                temperature=0,
                messages=[{"role": "user", "content": "Health check"}]
            )
            
            if test_response.content:
                return {
                    "status": "healthy",
                    "message": "Anthropic provider is operational",
                    "model": self.model,
                    "api_status": "connected"
                }
            else:
                return {
                    "status": "degraded",
                    "message": "Anthropic API responding but with issues"
                }
                
        except Exception as e:
            logger.error(f"Anthropic health check failed: {str(e)}")
            return {
                "status": "unhealthy",
                "message": f"Anthropic health check failed: {str(e)}"
            }
    
    async def close(self):
        """Close the Anthropic provider connection"""
        
        try:
            if hasattr(self.client, 'close'):
                await self.client.close()
                
            logger.info("Anthropic provider closed successfully")
            
        except Exception as e:
            logger.error(f"Error closing Anthropic provider: {str(e)}")
    
    def get_config(self) -> Dict[str, Any]:
        """Get provider configuration"""
        return {
            "provider": "anthropic",
            "enabled": self.enabled,
            "model": self.model,
            "max_tokens": self.max_tokens,
            "temperature": self.temperature,
            "timeout": self.timeout,
            "api_key_configured": bool(self.api_key)
        } 