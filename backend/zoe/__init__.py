"""
Zoe - AI Companion for ThinkxLife
Integrates with the Brain module for LLM calls and responses
"""

from .zoe_core import ZoeCore
from .conversation_manager import ConversationManager
from .personality import ZoePersonality

__all__ = ["ZoeCore", "ConversationManager", "ZoePersonality"] 