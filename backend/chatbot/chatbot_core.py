import datetime
import json
import os
import tempfile
import re

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from openai import OpenAI
from .session_manager import session_manager

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY missing in .env")

# Initialize OpenAI v1 client
client = OpenAI(api_key=OPENAI_API_KEY)

# Initialize embeddings and RAG retriever
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
CHROMA_DB_DIR = os.getenv("CHROMA_DB_DIR", "chroma_db")
try:
    _vectorstore = Chroma(
        persist_directory=CHROMA_DB_DIR, embedding_function=embeddings
    )
    retriever = _vectorstore.as_retriever(search_kwargs={"k": 10})
except Exception as e:
    print(f"Warning: Could not load Chroma DB from {CHROMA_DB_DIR}: {e}")

    class DummyRetriever:
        def get_relevant_documents(self, query):
            return []

    retriever = DummyRetriever()

# Logging configuration - make it optional for deployment
LOG_FILE_PATH = os.getenv("LOG_FILE_PATH")
if LOG_FILE_PATH:
    log_dir = os.path.dirname(LOG_FILE_PATH)
    if log_dir and not os.path.exists(log_dir):
        try:
            os.makedirs(log_dir, exist_ok=True)
        except (OSError, PermissionError) as e:
            print(f"Warning: Could not create log directory {log_dir}: {e}")
            # Use temp directory as fallback
            LOG_FILE_PATH = os.path.join(
                tempfile.gettempdir(), "zoe_conversations.jsonl"
            )
            print(f"Using fallback log file: {LOG_FILE_PATH}")
else:
    # Use temp directory if no log path specified
    LOG_FILE_PATH = os.path.join(tempfile.gettempdir(), "zoe_conversations.jsonl")
    print(f"No LOG_FILE_PATH specified, using: {LOG_FILE_PATH}")


def log_conversation_fallback(
    message: str,
    response: str,
    retrieved: list,
    session_id: str = None,
    user_id: str = None,
    age: int = None,
    ace_score: float = None,
):
    """Fallback logging function for development/debugging"""
    if not LOG_FILE_PATH:
        return

    entry = {
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "session_id": session_id,
        "user_id": user_id,
        "message": message,
        "retrieved_docs": [doc.metadata for doc in retrieved],
        "response": response,
        "user_age": age,
        "user_ace_score": ace_score,
    }

    try:
        with open(LOG_FILE_PATH, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry) + "\n")
    except (OSError, PermissionError) as e:
        print(f"Warning: Could not write to log file {LOG_FILE_PATH}: {e}")


def is_off_topic_request(message: str) -> bool:
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


def get_redirect_response() -> str:
    """
    Generate a gentle redirect response when user asks off-topic questions.
    """
    responses = [
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
        ),
    ]

    import random

    return random.choice(responses)


def generate_response(
    message: str,
    session_id: str = None,
    user_id: str = None,
    age: int = None,
    ace_score: float = None,
) -> str:
    """
    Generate a RAG-augmented, empathetic response using retrieved context.
    Uses session-based conversation management with database storage.
    Includes guardrails to keep conversations focused on therapeutic support.
    """
    try:
        # Check if the message is off-topic
        if is_off_topic_request(message):
            return get_redirect_response()

        # Get or create session if user_id provided
        if user_id and not session_id:
            session_id = session_manager.get_or_create_session(user_id, age, ace_score)

        # Get session info if session_id provided but age/ace_score missing
        if session_id and (age is None or ace_score is None):
            session_info = session_manager.get_session_info(session_id)
            if session_info:
                age = age or session_info.get("age")
                ace_score = ace_score or session_info.get("aceScore")

        # Get conversation history from database
        history = []
        if session_id:
            history = session_manager.get_session_history(session_id)

        # Create personalized system prompt based on user data
        base_prompt = (
            "You are Zoe, an empathetic AI assistant of Think Round, Inc., "
            "providing trauma-informed support. "
            "IMPORTANT GUIDELINES:\n"
            "- ONLY respond to questions about personal experiences, emotions, "
            "feelings, and mental health\n"
            "- DO NOT answer questions about news, politics, entertainment, "
            "technology, sports, weather, or general knowledge\n"
            "- DO NOT provide medical diagnoses or specific medical advice\n"
            "- If asked about unrelated topics, gently redirect the "
            "conversation back to the user's personal experiences\n"
            "- Focus on being a supportive listener and emotional companion\n"
            "- Ask open-ended questions to encourage the user to share their "
            "story\n"
            "- Validate their feelings and experiences\n"
            "- Provide emotional support and coping strategies when "
            "appropriate\n\n"
            "You generate responses solely within the scope of "
            "Think Round's mission of emotional support and trauma-informed "
            "care. Answer the user's questions by grounding your response "
            "in the provided context documents when relevant, but always keep "
            "the focus on the user's personal journey and emotional well-being."
        )

        # Add age-appropriate guidance
        age_guidance = ""
        if age is not None:
            if 18 <= age <= 25:
                age_guidance = (
                    " The user is a young adult (18-25), so be mindful of "
                    "developmental challenges like identity formation, career "
                    "decisions, and relationship building."
                )
            elif 26 <= age <= 35:
                age_guidance = (
                    " The user is in their late twenties to early thirties, "
                    "often dealing with career establishment, relationships, "
                    "and life transitions."
                )
            elif 36 <= age <= 50:
                age_guidance = (
                    " The user is in midlife, potentially dealing with career "
                    "changes, family responsibilities, and personal growth "
                    "challenges."
                )
            elif age > 50:
                age_guidance = (
                    " The user is in their later years, possibly dealing with "
                    "life reflection, health concerns, and legacy "
                    "considerations."
                )

        # Add ACEs-informed guidance
        ace_guidance = ""
        if ace_score is not None:
            if ace_score <= 3:
                ace_guidance = (
                    " The user has a lower ACEs score, indicating fewer "
                    "childhood adversities. Focus on growth, resilience "
                    "building, and preventive support."
                )
            elif ace_score <= 6:
                ace_guidance = (
                    " The user has a moderate ACEs score, indicating some "
                    "childhood adversities. Be especially empathetic and focus "
                    "on healing, coping strategies, and building resilience. "
                    "Acknowledge their strength in sharing."
                )
            else:
                ace_guidance = (
                    " The user has a higher ACEs score, indicating significant "
                    "childhood adversities. Approach with extra sensitivity, "
                    "validate their experiences, focus on safety, healing, and "
                    "trauma-informed responses. Recognize their tremendous "
                    "courage in seeking support."
                )

        # Combine all guidance into system prompt
        system_prompt = {
            "role": "system",
            "content": base_prompt + age_guidance + ace_guidance,
        }

        # Retrieve relevant docs
        docs = retriever.get_relevant_documents(message)
        print(f"Retrieved {len(docs)} context documents for query: '{message}'")

        # Combine context into a single system message
        if docs:
            context_text = "\n---\n".join([doc.page_content for doc in docs])
            context_message = {
                "role": "system",
                "content": (
                    "Contextual information retrieved for your question:\n"
                    f"{context_text}"
                ),
            }
            convo = [system_prompt, context_message]
        else:
            convo = [system_prompt]

        # Append previous history and the new user turn
        convo += history
        convo.append({"role": "user", "content": message})

        # Call OpenAI chat completion via v1 API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=convo,
            temperature=0.7,
            max_tokens=512,
        )
        bot_reply = response.choices[0].message.content.strip()

        # Save messages to database if session exists
        if session_id:
            session_manager.save_message(
                session_id, "user", message, [doc.metadata for doc in docs]
            )
            session_manager.save_message(session_id, "assistant", bot_reply)

        # Fallback logging for development
        log_conversation_fallback(
            message, bot_reply, docs, session_id, user_id, age, ace_score
        )

        return bot_reply

    except Exception as e:
        print(f"Error in generate_response: {e}")
        # Return a safe fallback response
        return (
            "I'm sorry, I'm having trouble processing your message right now. "
            "Please try again in a moment."
        )
