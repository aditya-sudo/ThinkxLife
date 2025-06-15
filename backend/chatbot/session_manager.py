"""
Session-based conversation management for Zoe chatbot.
Handles database operations for chat sessions and message history.
"""

import os
import json
import uuid
from datetime import datetime
from typing import List, Dict, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class SessionManager:
    def __init__(self):
        self.db_url = os.getenv("DATABASE_URL")
        if not self.db_url:
            raise RuntimeError("DATABASE_URL missing in .env")

    def get_connection(self):
        """Get database connection"""
        return psycopg2.connect(self.db_url)

    def get_or_create_session(
        self, user_id: str, age: int = None, ace_score: float = None
    ) -> str:
        """
        Get active session for user or create a new one.
        Returns session_id.
        """
        with self.get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Check for active session
                cur.execute(
                    """
                    SELECT id FROM "ChatSession"
                    WHERE "userId" = %s AND "isActive" = true
                    ORDER BY "createdAt" DESC LIMIT 1
                """,
                    (user_id,),
                )

                result = cur.fetchone()
                if result:
                    return result["id"]

                # Create new session
                session_id = str(uuid.uuid4())
                cur.execute(
                    """
                    INSERT INTO "ChatSession"
                    (id, "userId", age, "aceScore", "createdAt", "updatedAt")
                    VALUES (%s, %s, %s, %s, %s, %s)
                """,
                    (
                        session_id,
                        user_id,
                        age,
                        ace_score,
                        datetime.utcnow(),
                        datetime.utcnow(),
                    ),
                )

                return session_id

    def get_session_history(self, session_id: str) -> List[Dict]:
        """
        Get conversation history for a session.
        Returns list of messages in OpenAI format.
        """
        with self.get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    SELECT role, content FROM "ChatMessage"
                    WHERE "sessionId" = %s
                    ORDER BY timestamp ASC
                """,
                    (session_id,),
                )

                messages = []
                for row in cur.fetchall():
                    messages.append({"role": row["role"], "content": row["content"]})

                return messages

    def save_message(
        self, session_id: str, role: str, content: str, retrieved_docs: List = None
    ):
        """Save a message to the session"""
        with self.get_connection() as conn:
            with conn.cursor() as cur:
                message_id = str(uuid.uuid4())
                retrieved_json = json.dumps(retrieved_docs) if retrieved_docs else None

                cur.execute(
                    """
                    INSERT INTO "ChatMessage"
                    (id, "sessionId", role, content, "retrievedDocs")
                    VALUES (%s, %s, %s, %s, %s)
                """,
                    (message_id, session_id, role, content, retrieved_json),
                )

                # Update session timestamp
                cur.execute(
                    """
                    UPDATE "ChatSession"
                    SET "updatedAt" = %s
                    WHERE id = %s
                """,
                    (datetime.utcnow(), session_id),
                )

    def get_session_info(self, session_id: str) -> Optional[Dict]:
        """Get session information including user age and ACEs score"""
        with self.get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    SELECT "userId", age, "aceScore"
                    FROM "ChatSession"
                    WHERE id = %s
                """,
                    (session_id,),
                )

                result = cur.fetchone()
                if result:
                    return {
                        "userId": result["userId"],
                        "age": result["age"],
                        "aceScore": result["aceScore"],
                    }
                return None

    def end_session(self, session_id: str):
        """Mark a session as inactive"""
        with self.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE "ChatSession"
                    SET "isActive" = false, "updatedAt" = %s
                    WHERE id = %s
                """,
                    (datetime.utcnow(), session_id),
                )

    def get_user_sessions(self, user_id: str, limit: int = 10) -> List[Dict]:
        """Get recent sessions for a user"""
        with self.get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    SELECT id, title, "createdAt", "updatedAt", "isActive",
                           (SELECT COUNT(*) FROM "ChatMessage"
                            WHERE "sessionId" = "ChatSession".id) as message_count
                    FROM "ChatSession"
                    WHERE "userId" = %s
                    ORDER BY "updatedAt" DESC
                    LIMIT %s
                """,
                    (user_id, limit),
                )

                return [dict(row) for row in cur.fetchall()]


# Global session manager instance
session_manager = SessionManager()
