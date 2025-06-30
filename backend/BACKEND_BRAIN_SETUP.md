# ThinkxLife Backend Brain System

## 🧠 Overview

The ThinkxLife Backend Brain is a centralized AI orchestration system that manages all AI operations across the ThinkxLife platform. Unlike the previous frontend-based approach, the Brain now lives in the Python backend, providing better performance, security, and scalability.

## 🏗️ Architecture

```
Frontend (Next.js)
    ↓ HTTP Requests
Backend Brain (Python/FastAPI)
    ↓ Orchestrates
AI Providers (Local/OpenAI/Anthropic)
    ↓ Processes
Response → Frontend
```

### Key Components

1. **Brain Core** (`brain/brain_core.py`)
   - Central orchestration engine
   - Application-specific routing
   - Provider management
   - Analytics and health monitoring

2. **Providers** (`brain/providers/`)
   - **Local Provider**: Integrates with existing chatbot core
   - **OpenAI Provider**: Optional external AI capabilities
   - **Anthropic Provider**: Optional Claude integration

3. **API Endpoints** (`main.py`)
   - `/api/brain` - Main Brain endpoint
   - `/api/brain/health` - Health monitoring
   - `/api/brain/analytics` - Usage analytics
   - Application-specific endpoints

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Configuration

Create/update `.env` file:

```bash
# Required
OPENAI_API_KEY=your_openai_key_here  # Optional

# Optional AI Providers
ANTHROPIC_API_KEY=your_anthropic_key_here  # Optional

# Provider Configuration (Optional)
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7

ANTHROPIC_MODEL=claude-3-sonnet-20240229
ANTHROPIC_MAX_TOKENS=2000
ANTHROPIC_TEMPERATURE=0.7
```

### 3. Start the Backend

```bash
cd backend
python main.py
```

The server will start on `http://localhost:8000`

### 4. Test the Brain

```bash
curl -X POST "http://localhost:8000/api/brain" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, how are you?",
    "application": "chatbot",
    "user_context": {
      "user_id": "test_user",
      "session_id": "test_session"
    }
  }'
```

## 📡 API Reference

### Main Brain Endpoint

**POST** `/api/brain`

```json
{
  "message": "User's message",
  "application": "healing-rooms|ai-awareness|chatbot|compliance|exterior-spaces|general",
  "user_context": {
    "user_id": "string",
    "session_id": "string",
    "age": 25,
    "ace_score": 3.5,
    "ai_knowledge_level": "beginner"
  },
  "metadata": {
    "additional": "context"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "AI response message",
  "data": {
    "session_id": "updated_session_id"
  },
  "metadata": {
    "provider": "local",
    "model": "chatbot_core",
    "processing_time": 0.5,
    "application": "chatbot",
    "sources": ["ThinkxLife Knowledge Base"]
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Health Check

**GET** `/api/brain/health`

```json
{
  "status": "healthy",
  "brain_status": {
    "overall": "healthy",
    "providers": {
      "local": {
        "status": "healthy",
        "message": "Local provider is operational"
      }
    },
    "system": {
      "uptime_seconds": 3600,
      "total_requests": 150,
      "success_rate": 0.98,
      "error_rate": 0.02
    }
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Analytics

**GET** `/api/brain/analytics`

```json
{
  "success": true,
  "data": {
    "total_requests": 1000,
    "success_rate": 0.95,
    "average_response_time": 1.2,
    "provider_usage": {
      "local": 800,
      "openai": 200
    },
    "application_usage": {
      "chatbot": 400,
      "healing-rooms": 300,
      "ai-awareness": 200,
      "compliance": 100
    },
    "error_rate": 0.05,
    "uptime": 24.5
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## 🎯 Application-Specific Features

### Healing Rooms (`healing-rooms`)
- Trauma-informed responses
- ACE score integration
- Safety protocols
- Crisis detection

### AI Awareness (`ai-awareness`)
- Educational content
- Ethics-focused responses
- Knowledge level adaptation
- Interactive learning

### Chatbot (`chatbot`)
- General conversation
- Document retrieval
- Session management
- User context awareness

### Compliance (`compliance`)
- Regulatory guidance
- Risk assessment
- Audit trails
- Legal framework information

### Exterior Spaces (`exterior-spaces`)
- Creative AI assistance
- Design feedback
- Spatial reasoning
- Sustainability focus

## 🔧 Configuration

### Provider Configuration

The Brain automatically configures providers based on available API keys:

```python
# In main.py
brain_config = {
    "providers": {
        "local": {
            "enabled": True,  # Always enabled
            "endpoint": "http://localhost:8000",
            "timeout": 30.0
        },
        "openai": {
            "enabled": bool(os.getenv("OPENAI_API_KEY")),
            "api_key": os.getenv("OPENAI_API_KEY"),
            "model": os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        },
        "anthropic": {
            "enabled": bool(os.getenv("ANTHROPIC_API_KEY")),
            "api_key": os.getenv("ANTHROPIC_API_KEY"),
            "model": os.getenv("ANTHROPIC_MODEL", "claude-3-sonnet-20240229")
        }
    }
}
```

### Security Features

- Request validation
- Rate limiting (60/min, 1000/hour)
- Content filtering
- Trauma-safe mode
- User authentication integration

## 🔄 Frontend Integration

### Using the Backend Brain Hooks

```typescript
import { useChatbotBrain, useHealingRoomsBrain } from '@/hooks/use-backend-brain';

// General chatbot
const { loading, error, sendChatMessage } = useChatbotBrain();

// Healing rooms
const { loading, error, sendHealingMessage } = useHealingRoomsBrain();

// Send message
const response = await sendChatMessage(
  "Hello!",
  { user_id: "123", session_id: "abc" },
  "session_123"
);
```

### Available Hooks

- `useBackendBrain()` - Generic Brain communication
- `useChatbotBrain()` - General chatbot
- `useHealingRoomsBrain()` - Trauma-informed healing
- `useAIAwarenessBrain()` - Educational AI
- `useComplianceBrain()` - Regulatory guidance
- `useExteriorSpacesBrain()` - Creative design AI
- `useBrainHealth()` - Health monitoring
- `useBrainAnalytics()` - Usage analytics

## 📊 Monitoring & Analytics

### Health Monitoring

The Brain provides comprehensive health monitoring:

- Overall system status
- Individual provider health
- Performance metrics
- Error tracking
- Uptime monitoring

### Analytics Dashboard

Track usage patterns:

- Request volume by application
- Provider utilization
- Response times
- Success/error rates
- User engagement metrics

## 🛠️ Development

### Adding New Applications

1. Add application type to `brain/types.py`
2. Create handler in `brain_core.py`
3. Add endpoint in `main.py`
4. Create frontend hook
5. Update documentation

### Adding New Providers

1. Create provider class in `brain/providers/`
2. Implement required methods:
   - `process_request()`
   - `health_check()`
   - `close()`
3. Update provider initialization
4. Add configuration options

### Testing

```bash
# Run backend tests
cd backend
python -m pytest tests/

# Test specific Brain functionality
python -m pytest tests/test_brain.py -v
```

## 🚨 Troubleshooting

### Common Issues

1. **Brain not initializing**
   - Check Python imports
   - Verify chatbot core availability
   - Review error logs

2. **Provider errors**
   - Validate API keys
   - Check network connectivity
   - Review provider-specific logs

3. **Frontend connection issues**
   - Verify NEXT_PUBLIC_API_URL
   - Check CORS configuration
   - Test endpoint accessibility

### Debug Mode

Enable detailed logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Health Check

Always check Brain health:

```bash
curl http://localhost:8000/api/brain/health
```

## 📈 Performance Optimization

### Caching
- Response caching for repeated queries
- Session context caching
- Provider response caching

### Load Balancing
- Multiple provider instances
- Request distribution
- Failover mechanisms

### Monitoring
- Response time tracking
- Resource usage monitoring
- Error rate analysis

## 🔒 Security

### Data Protection
- User context encryption
- Secure API communication
- Privacy-compliant logging

### Access Control
- Authentication integration
- Rate limiting
- Request validation

### Trauma Safety
- Content filtering
- Crisis detection
- Safe response protocols

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Backend Brain implementation
- ✅ Local provider integration
- ✅ Basic frontend hooks
- ✅ Health monitoring

### Phase 2 (Next)
- 🔄 Advanced analytics dashboard
- 🔄 Enhanced caching system
- 🔄 Multi-language support
- 🔄 Advanced trauma detection

### Phase 3 (Future)
- 📋 Machine learning optimization
- 📋 Real-time collaboration
- 📋 Advanced personalization
- 📋 Integration with external systems

## 💡 Best Practices

1. **Always use application-specific hooks** for better context
2. **Handle errors gracefully** with user-friendly messages
3. **Monitor Brain health** regularly
4. **Use appropriate user context** for personalized responses
5. **Implement proper loading states** for better UX
6. **Log important events** for debugging and analytics
7. **Test with different providers** to ensure reliability

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review the API documentation
3. Test with health check endpoint
4. Check application logs
5. Verify configuration settings

The Backend Brain system provides a robust, scalable foundation for all AI operations in ThinkxLife, ensuring consistent, secure, and efficient AI interactions across the platform. 