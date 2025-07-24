#!/usr/bin/env python3
"""
ThinkxLife Backend Startup Script

This script validates the environment and starts the FastAPI server
with proper configuration.
"""

import os
import sys
import logging
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def validate_environment():
    """Validate required environment variables and dependencies"""
    logger.info("Validating environment...")
    
    # Check Python version
    if sys.version_info < (3, 8):
        logger.error("Python 3.8+ is required")
        return False
    
    # Check for .env file
    env_file = Path(".env")
    if not env_file.exists():
        logger.warning(".env file not found - using default configuration")
    
    # Try to import required packages
    try:
        import fastapi
        import uvicorn
        import pydantic
        logger.info("Core dependencies available")
    except ImportError as e:
        logger.error(f"Missing required dependency: {e}")
        logger.error("Run: pip install -r requirements.txt")
        return False
    
    # Check Brain system
    try:
        from brain import ThinkxLifeBrain
        logger.info("Brain system available")
    except ImportError as e:
        logger.error(f"Brain system not available: {e}")
        return False
    
    # Check Zoe system
    try:
        from zoe import ZoeCore
        logger.info("Zoe system available")
    except ImportError as e:
        logger.error(f"Zoe system not available: {e}")
        return False
    
    logger.info("Environment validation passed")
    return True


def check_optional_services():
    """Check availability of optional services"""
    logger.info("Checking optional services...")
    
    # Check OpenAI API key
    if os.getenv("OPENAI_API_KEY"):
        logger.info("OpenAI API key found")
    else:
        logger.info("OpenAI API key not found (optional)")
    
    # Check Anthropic API key
    if os.getenv("ANTHROPIC_API_KEY"):
        logger.info("Anthropic API key found")
    else:
        logger.info("Anthropic API key not found (optional)")


def start_server():
    """Start the FastAPI server"""
    logger.info("Starting ThinkxLife Backend...")
    
    try:
        import uvicorn
        
        # Server configuration
        config = {
            "app": "main:app",
            "host": os.getenv("HOST", "0.0.0.0"),
            "port": int(os.getenv("PORT", 8000)),
            "reload": os.getenv("RELOAD", "true").lower() == "true",
            "log_level": os.getenv("LOG_LEVEL", "info").lower(),
        }
        
        logger.info(f"Server will start on {config['host']}:{config['port']}")
        logger.info(f"Reload mode: {config['reload']}")
        logger.info(f"Log level: {config['log_level']}")
        
        # Start the server
        uvicorn.run(**config)
        
    except KeyboardInterrupt:
        logger.info("Server shutdown requested")
    except Exception as e:
        logger.error(f"Error starting server: {e}")
        sys.exit(1)


def main():
    """Main startup function"""
    print("ThinkxLife Backend Startup")
    print("=" * 50)
    
    # Validate environment
    if not validate_environment():
        logger.error("Environment validation failed")
        sys.exit(1)
    
    # Check optional services
    check_optional_services()
    
    print("=" * 50)
    logger.info("Environment ready - starting server...")
    
    # Start the server
    start_server()


if __name__ == "__main__":
    main() 