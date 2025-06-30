# ThinkxLife Brain - Centralized AI System

## 🧠 Overview

The ThinkxLife Brain is a centralized AI orchestration system that manages all AI operations across your platform. It serves as the intelligent core that:

- **Routes requests** to appropriate AI providers
- **Manages context** across different applications
- **Handles security** and rate limiting
- **Coordinates data flow** between frontend and backend
- **Provides intelligent switching** between AI models

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ThinkxLife Brain                         │
├─────────────────────────────────────────────────────────────┤
│  Request Router │ Context Manager │ Security Manager        │
│  Session Manager│ Analytics       │ Health Monitor          │
├─────────────────────────────────────────────────────────────┤
│  AI Providers:                                              │
│  ├── Local Provider (Your existing chatbot)                 │
│  ├── OpenAI Provider (GPT models)                          │
│  └── Anthropic Provider (Claude models)                    │
├─────────────────────────────────────────────────────────────┤
│  Applications:                                              │
│  ├── Healing Rooms (Trauma-informed AI)                    │
│  ├── AI Awareness (Educational AI)                         │
│  ├── Chatbot (General conversation)                        │
│  ├── Compliance (Regulatory AI)                            │
│  └── Exterior Spaces (Creative AI)                         │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Brain is Already Integrated!

The Brain system is already set up and ready to use. Here's what's included:

- ✅ **Core Brain Engine** - Central orchestration system
- ✅ **Local Provider** - Integrates with your existing Python backend
- ✅ **API Endpoints** - `/api/brain` for all AI requests
- ✅ **React Hooks** - Easy frontend integration
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Security** - Rate limiting and content filtering

### 2. Using the Brain in Your Applications

#### Option A: Use Specialized Hooks

```typescript
// In Healing Rooms
import { useHealingRoomsBrain } from '@/hooks/use-brain';

function HealingRoomsChat() {
  const { sendHealingMessage, isLoading, error } = useHealingRoomsBrain();
  
  const handleMessage = async (message: string) => {
    const response = await sendHealingMessage(message, {
      aceScore: userAceScore,
      traumaHistory: userTraumaHistory
    });
    
    if (response.success) {
      // Handle successful response
      console.log(response.message);
    }
  };
}
```

```typescript
// In AI Awareness
import { useAIAwarenessBrain } from '@/hooks/use-brain';

function AIEducationChat() {
  const { sendEducationalMessage, isLoading } = useAIAwarenessBrain();
  
  const askQuestion = async (question: string) => {
    const response = await sendEducationalMessage(question, {
      knowledgeLevel: 'beginner',
      currentModule: 'ethics'
    });
    
    return response;
  };
}
```

#### Option B: Use Generic Brain Hook

```typescript
import { useBrain } from '@/hooks/use-brain';

function CustomAIComponent() {
  const { sendMessage, isLoading, error } = useBrain();
  
  const handleRequest = async () => {
    const response = await sendMessage({
      message: "Hello Brain!",
      application: 'general',
      context: {
        customData: 'value'
      }
    });
    
    console.log(response);
  };
}
```

### 3. Brain Status Monitoring

```typescript
import { useBrain } from '@/hooks/use-brain';

function BrainStatusDashboard() {
  const { getBrainStatus } = useBrain();
  
  const checkStatus = async () => {
    const status = await getBrainStatus();
    console.log('Brain Status:', status);
    /*
    {
      brain: "ThinkxLife Brain v1.0.0",
      status: "operational",
      healthy: true,
      providers: {
        local: true,
        openai: false,
        anthropic: false
      },
      activeConnections: 5,
      uptime: 3600
    }
    */
  };
}
```

## 🔧 Configuration

### Environment Variables

Add these to your `.env.local`:

```env
# Your existing backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: OpenAI Integration
OPENAI_API_KEY=your-openai-api-key

# Optional: Anthropic Integration
ANTHROPIC_API_KEY=your-anthropic-api-key
```

### Brain Configuration

The Brain is configured in `/app/api/brain/route.ts`:

```typescript
const brainConfig: BrainConfig = {
  providers: {
    local: {
      enabled: true,
      endpoint: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      timeout: 30000
    },
    // Add other providers as needed
  },
  security: {
    rateLimiting: {
      enabled: true,
      maxRequestsPerMinute: 60,
      maxRequestsPerHour: 1000
    },
    // ... other security settings
  }
};
```

## 🎯 Application-Specific Features

### Healing Rooms
- **Trauma-informed responses** - Gentle, empathetic communication
- **ACE score integration** - Personalized based on trauma history
- **Safety protocols** - Content filtering and trigger warnings
- **Crisis detection** - Automatic escalation for safety concerns

### AI Awareness
- **Educational focus** - Teaching AI concepts and ethics
- **Knowledge level adaptation** - Adjusts complexity to user level
- **Interactive learning** - Quizzes and assessments
- **Progress tracking** - Monitors learning journey

### Chatbot
- **General conversation** - Your existing chatbot enhanced
- **Document retrieval** - Integrates with your knowledge base
- **Context awareness** - Remembers conversation history
- **Multi-modal** - Text, voice, and visual inputs

### Compliance
- **Regulatory knowledge** - GDPR, AI Act, ethics guidelines
- **Risk assessment** - Evaluates AI implementation risks
- **Audit trails** - Tracks compliance-related interactions
- **Policy guidance** - Helps with AI governance

### Exterior Spaces
- **Creative AI** - Design and spatial intelligence
- **Visual understanding** - Analyzes Figma designs
- **Spatial reasoning** - 3D and architectural concepts
- **Design feedback** - Critiques and suggestions

## 🔒 Security Features

### Rate Limiting
- **60 requests per minute** per user
- **1000 requests per hour** per user
- **Automatic throttling** and graceful degradation

### Content Filtering
- **Trauma-safe mode** - Filters potentially triggering content
- **Blocked words** - Customizable content filters
- **Safety protocols** - Crisis intervention capabilities

### User Validation
- **Authentication required** - All requests need valid session
- **Permission checking** - Role-based access control
- **Audit logging** - All interactions tracked

## 📊 Monitoring & Analytics

### Health Monitoring
- **Provider status** - Real-time health checks
- **Response times** - Performance monitoring
- **Error rates** - Failure tracking
- **Uptime monitoring** - System availability

### Usage Analytics
- **Request patterns** - Usage by application
- **User engagement** - Interaction metrics
- **Performance metrics** - Response times and success rates
- **Cost tracking** - API usage and costs

## 🔄 Integration with Existing Backend

The Brain seamlessly integrates with your existing Python backend:

### Request Flow
1. **Frontend** → Brain Hook → `/api/brain`
2. **Brain API** → Local Provider → **Your Python Backend**
3. **Python Backend** → Response → Brain API → **Frontend**

### Backend Compatibility
The Local Provider formats requests to match your existing API:

```python
# Your existing backend receives:
{
    "message": "User's message",
    "user_id": "user123",
    "session_id": "session456",
    "age": 25,
    "ace_score": 3,
    "context": {
        "application": "healing-rooms",
        "conversation_history": [...],
        "brain_context": {
            "trauma_informed": true,
            "safety_protocols": true
        }
    }
}
```

## 🚀 Next Steps

### Immediate Benefits
1. **Unified AI Interface** - All apps use the same Brain API
2. **Enhanced Context** - Cross-application user understanding
3. **Intelligent Routing** - Best AI model for each task
4. **Security & Monitoring** - Built-in protection and analytics

### Future Enhancements
1. **Multi-Modal AI** - Voice, image, and video processing
2. **Advanced Personalization** - ML-driven user adaptation
3. **Predictive Analytics** - Anticipate user needs
4. **Integration Ecosystem** - Connect with external AI services

### Getting Started
1. **Test the Brain** - Use the hooks in your existing components
2. **Monitor Usage** - Check Brain status and analytics
3. **Customize Context** - Add application-specific data
4. **Enhance Security** - Configure rate limits and filters

## 📚 API Reference

### Brain Request Format
```typescript
interface BrainRequest {
  message: string;
  application: 'healing-rooms' | 'ai-awareness' | 'chatbot' | 'compliance' | 'exterior-spaces' | 'general';
  context?: {
    sessionId?: string;
    conversationHistory?: Message[];
    userPreferences?: UserPreferences;
    applicationState?: any;
    [key: string]: any;
  };
  metadata?: {
    userAgent?: string;
    deviceType?: 'desktop' | 'mobile' | 'tablet';
    language?: string;
    [key: string]: any;
  };
}
```

### Brain Response Format
```typescript
interface BrainResponse {
  success: boolean;
  message?: string;
  data?: {
    conversation_id?: string;
    retrieved_docs?: any[];
    confidence?: number;
    sources?: string[];
    [key: string]: any;
  };
  error?: string;
  metadata?: {
    provider: string;
    model: string;
    tokensUsed?: number;
    processingTime: number;
    confidence?: number;
    sources?: string[];
  };
  timestamp: string;
}
```

## 🎉 Congratulations!

Your ThinkxLife Brain is now operational and ready to power all your AI applications with centralized intelligence, security, and monitoring. The Brain will grow smarter as you add more data and interactions across your platform.

**Welcome to the future of centralized AI orchestration!** 🧠✨ 