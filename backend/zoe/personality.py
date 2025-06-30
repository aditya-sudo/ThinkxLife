"""
Zoe Personality Module
Defines Zoe's personality traits, response filtering, and behavioral patterns
"""

import logging
import re
import random
from typing import Dict, List, Optional, Any

logger = logging.getLogger(__name__)


class ZoePersonality:
    """
    Zoe's personality system that defines her character traits and response patterns
    
    Zoe is designed to be:
    - Empathetic and supportive
    - Trauma-informed and safe
    - Gentle but authentic
    - Focused on emotional well-being
    - Redirects off-topic conversations gracefully
    """
    
    def __init__(self):
        self.personality_traits = {
            "empathetic": True,
            "supportive": True,
            "trauma_informed": True,
            "gentle": True,
            "authentic": True,
            "professional": False,  # More friend-like than clinical
            "boundaries_aware": True
        }
        
        # Initialize response templates
        self._init_response_templates()
        
        logger.info("Zoe personality system initialized")
    
    def _init_response_templates(self):
        """Initialize response templates for different situations"""
        
        self.redirect_responses = [
            (
                "I'm here to support you with your personal experiences and "
                "emotional well-being. Would you like to share what's on your mind "
                "or how you're feeling today?"
            ),
            (
                "I focus on providing emotional support and listening to your "
                "personal story. Is there something you'd like to talk through or "
                "share about your experiences?"
            ),
            (
                "My role is to be here for you as a supportive companion for your "
                "personal journey. What would you like to explore about your "
                "thoughts or feelings?"
            ),
            (
                "I'm designed to help with emotional support and personal "
                "reflection. Would you like to share what's been on your heart or "
                "mind lately?"
            ),
            (
                "I'm here to listen and support you through your personal "
                "experiences. Is there something you're going through that you'd "
                "like to talk about?"
            )
        ]
        
        self.error_responses = [
            (
                "I'm having a moment where I can't process that properly. "
                "Would you mind sharing that again? I'm here to listen."
            ),
            (
                "Something seems to have gotten mixed up on my end. "
                "I'm still here for you though - what would you like to talk about?"
            ),
            (
                "I'm experiencing a small hiccup right now, but I'm still here "
                "to support you. How are you feeling today?"
            ),
            (
                "I'm having some technical difficulties, but my care for you "
                "remains the same. What's on your mind?"
            )
        ]
        
        self.fallback_responses = [
            (
                "I want to make sure I'm really hearing you. Sometimes I need "
                "a moment to process things properly. What's most important "
                "for you to share right now?"
            ),
            (
                "I'm here with you, even when technology doesn't cooperate perfectly. "
                "What would feel most supportive for you in this moment?"
            ),
            (
                "I care about what you're going through, and I want to be present "
                "for you. Can you help me understand what you need right now?"
            )
        ]
    
    def is_off_topic_request(self, message: str) -> bool:
        """
        Check if the user's message is asking about topics outside of Zoe's scope.
        Returns True if the message should be redirected back to therapeutic support.
        """
        message_lower = message.lower()

        # Keywords that indicate off-topic requests
        off_topic_patterns = [
            # News and current events
            r"\b(news|breaking|headlines|current events|latest)\b",
            (
                r"\b(what happened|what\'s happening|tell me about)\b.*"
                r"\b(today|yesterday|this week|recently)\b"
            ),
            # Politics and government
            (
                r"\b(politics|political|government|president|election|vote|voting|"
                r"democrat|republican|congress|senate)\b"
            ),
            r"\b(biden|trump|politician|policy|law|legislation)\b",
            # Entertainment and celebrities
            (
                r"\b(celebrity|celebrities|movie|movies|tv show|television|actor|"
                r"actress|singer|musician)\b"
            ),
            r"\b(what\'s on tv|recommend a movie|latest episode)\b",
            # Technology and products (unless related to mental health)
            (
                r"\b(iphone|android|computer|laptop|software|app)\b"
                r"(?!.*\b(mental health|therapy|wellness|meditation)\b)"
            ),
            r"\b(buy|purchase|price|cost|shopping)\b",
            # Sports and games
            (r"\b(sports|football|basketball|baseball|soccer|game|match|score|" r"team)\b"),
            # Weather (unless metaphorical)
            (
                r"\b(weather|temperature|rain|snow|sunny|cloudy)\b"
                r"(?!.*\b(feel|feeling|mood|like)\b)"
            ),
            # General knowledge/trivia
            (
                r"\b(what is|define|explain)\b.*"
                r"\b(capital|country|history|science|math|physics|chemistry)\b"
            ),
            (r"\b(how to)\b.*" r"\b(cook|recipe|fix|repair|install|download)\b"),
            # Financial advice
            (r"\b(invest|investment|stock|crypto|bitcoin|money|" r"financial advice)\b"),
            # Medical diagnosis (redirect to professionals)
            (
                r"\b(diagnose|diagnosis|medication|prescription|doctor|hospital|"
                r"medical)\b(?!.*\b(feeling|experience|story)\b)"
            ),
        ]

        # Check for off-topic patterns
        for pattern in off_topic_patterns:
            if re.search(pattern, message_lower):
                return True

        # Check for requests that seem like they're asking for factual information
        # rather than sharing personal experiences
        factual_patterns = [
            (
                r"^(what|when|where|who|how|why)\s+"
                r"(?!.*\b(feel|felt|feeling|think|thought|experience|story|"
                r"happened to me|my)\b)"
            ),
            (
                r"\b(tell me about|explain|describe)\b"
                r"(?!.*\b(my|me|I|feeling|experience)\b)"
            ),
        ]

        for pattern in factual_patterns:
            if re.search(pattern, message_lower):
                return True

        return False
    
    def get_redirect_response(self) -> str:
        """Get a gentle redirect response when user asks off-topic questions"""
        return random.choice(self.redirect_responses)
    
    def get_error_response(self) -> str:
        """Get an error response that maintains Zoe's personality"""
        return random.choice(self.error_responses)
    
    def get_fallback_response(self) -> str:
        """Get a fallback response for unexpected situations"""
        return random.choice(self.fallback_responses)
    
    def filter_response(
        self,
        response: str,
        user_context: Dict[str, Any],
        conversation_context: Dict[str, Any]
    ) -> str:
        """
        Filter and enhance AI response through Zoe's personality lens
        
        Args:
            response: Raw AI response
            user_context: User context information
            conversation_context: Current conversation context
            
        Returns:
            Filtered response with Zoe's personality applied
        """
        if not response:
            return self.get_fallback_response()
        
        filtered_response = response
        
        # Apply trauma-informed filtering
        filtered_response = self._apply_trauma_safe_filtering(
            filtered_response, user_context
        )
        
        # Apply empathetic tone adjustments
        filtered_response = self._apply_empathetic_tone(
            filtered_response, user_context, conversation_context
        )
        
        # Apply boundary awareness
        filtered_response = self._apply_boundary_awareness(filtered_response)
        
        # Ensure appropriate length and pacing
        filtered_response = self._apply_pacing_control(filtered_response)
        
        return filtered_response
    
    def _apply_trauma_safe_filtering(self, response: str, user_context: Dict[str, Any]) -> str:
        """Apply trauma-informed filtering to the response"""
        
        # Get ACE score if available
        ace_score = user_context.get("ace_score", 0)
        
        # For higher ACE scores, be extra gentle
        if ace_score and ace_score > 4:
            # Add gentle language markers
            if not any(word in response.lower() for word in ["gently", "softly", "carefully"]):
                # Add gentle framing occasionally
                if random.random() < 0.3:  # 30% chance
                    gentle_starters = [
                        "I want to gently share that ",
                        "I'd like to carefully offer that ",
                        "With tenderness, I'd say "
                    ]
                    response = random.choice(gentle_starters) + response.lower()
        
        # Remove potentially triggering language
        triggering_words = {
            "must": "might consider",
            "should": "could",
            "have to": "might want to",
            "need to": "could try to",
            "failure": "challenge",
            "broken": "hurting",
            "damaged": "healing"
        }
        
        for trigger_word, replacement in triggering_words.items():
            response = re.sub(
                r'\b' + re.escape(trigger_word) + r'\b',
                replacement,
                response,
                flags=re.IGNORECASE
            )
        
        return response
    
    def _apply_empathetic_tone(
        self,
        response: str,
        user_context: Dict[str, Any],
        conversation_context: Dict[str, Any]
    ) -> str:
        """Apply empathetic tone adjustments"""
        
        # Add validation phrases occasionally
        validation_phrases = [
            "That sounds really difficult. ",
            "I can hear how much this matters to you. ",
            "It makes sense that you'd feel that way. ",
            "Thank you for sharing something so personal. ",
            "I'm honored that you trust me with this. "
        ]
        
        # Check if response could benefit from validation
        user_emotion_indicators = [
            "feel", "feeling", "felt", "hurt", "pain", "difficult",
            "hard", "struggle", "struggling", "sad", "angry", "scared"
        ]
        
        # Look at recent conversation for emotional content
        recent_messages = conversation_context.get("messages", [])[-3:]
        has_emotional_content = any(
            any(indicator in msg.get("content", "").lower() 
                for indicator in user_emotion_indicators)
            for msg in recent_messages
            if msg.get("role") == "user"
        )
        
        if has_emotional_content and random.random() < 0.4:  # 40% chance
            response = random.choice(validation_phrases) + response
        
        return response
    
    def _apply_boundary_awareness(self, response: str) -> str:
        """Apply boundary awareness to maintain appropriate therapeutic boundaries"""
        
        # Avoid overly clinical language
        clinical_replacements = {
            "patient": "person",
            "client": "you",
            "therapy": "our conversation",
            "treatment": "support",
            "diagnosis": "understanding"
        }
        
        for clinical_term, replacement in clinical_replacements.items():
            response = re.sub(
                r'\b' + re.escape(clinical_term) + r'\b',
                replacement,
                response,
                flags=re.IGNORECASE
            )
        
        # Ensure appropriate boundaries around advice-giving
        if "you should" in response.lower():
            response = response.replace("you should", "you might consider")
            response = response.replace("You should", "You might consider")
        
        return response
    
    def _apply_pacing_control(self, response: str) -> str:
        """Control the pacing and length of responses"""
        
        # If response is too long, suggest breaking it up
        if len(response) > 800:
            # Find a good breaking point
            sentences = response.split('. ')
            if len(sentences) > 3:
                # Take first 2-3 sentences and add a gentle continuation
                shorter_response = '. '.join(sentences[:3]) + '.'
                shorter_response += "\n\nThere's more I'd like to share about this. Would you like me to continue, or is there something specific you'd like to explore first?"
                return shorter_response
        
        return response
    
    def get_personality_context(self) -> Dict[str, Any]:
        """Get context information about Zoe's personality for the Brain system"""
        return {
            "name": "Zoe",
            "role": "Empathetic AI Companion",
            "traits": self.personality_traits,
            "communication_style": "empathetic_supportive",
            "boundaries": {
                "focus": "emotional_support_and_personal_growth",
                "avoid": "medical_diagnosis_legal_advice_factual_information",
                "redirect_to": "personal_experience_and_feelings"
            },
            "trauma_informed": True,
            "safety_first": True
        } 