"""
ThinkxLife Brain - Backend AI Orchestration System

This module contains the centralized AI Brain that manages all AI operations
across the ThinkxLife platform from the backend.
"""

from .brain_core import ThinkxLifeBrain
from .types import BrainRequest, BrainResponse, BrainConfig
# Providers are imported dynamically in brain_core.py

__version__ = "1.0.0"
__all__ = [
    "ThinkxLifeBrain",
    "BrainRequest", 
    "BrainResponse",
    "BrainConfig"
] 