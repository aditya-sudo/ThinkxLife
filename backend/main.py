import os
import traceback

from chatbot.chatbot_core import generate_response
from chatbot.session_manager import SessionManager
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any


class ChatRequest(BaseModel):
    message: str
    sessionId: str | None = None  # Chat session ID
    userId: str | None = None  # User ID for session management
    age: int | None = None  # user's age
    aceScore: float | None = None  # ACEs assessment score


class ChatResponse(BaseModel):
    response: str


class SessionAnalytics(BaseModel):
    age_groups: List[Dict[str, Any]]
    active_users: List[Dict[str, Any]]
    high_aces_sessions: List[Dict[str, Any]]
    user_sessions: Optional[List[Dict[str, Any]]] = None


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize session manager
session_manager = SessionManager()


@app.get("/")
async def root():
    return {"status": "Zoe backend is up!"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        # DEBUG: print the API key to verify .env loaded
        key = os.getenv("OPENAI_API_KEY")
        print("OPENAI_API_KEY =", (key[:8] + "…") if key else "(not set)")
        reply = generate_response(
            req.message, req.sessionId, req.userId, req.age, req.aceScore
        )
        return ChatResponse(response=reply)

    except Exception as e:
        # print full traceback to your Uvicorn console
        print("Exception in /chat:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/session-analytics", response_model=SessionAnalytics)
async def get_session_analytics(userId: Optional[str] = Query(None)):
    try:
        with session_manager.get_connection() as conn:
            with conn.cursor() as cur:
                # Age groups analytics
                cur.execute(
                    """
                    SELECT
                        CASE
                            WHEN age BETWEEN 18 AND 25 THEN '18-25'
                            WHEN age BETWEEN 26 AND 35 THEN '26-35'
                            WHEN age BETWEEN 36 AND 50 THEN '36-50'
                            ELSE '50+'
                        END as age_group,
                        COUNT(*) as session_count,
                        AVG("aceScore") as avg_aces
                    FROM "ChatSession"
                    WHERE age IS NOT NULL
                    GROUP BY age_group
                    ORDER BY age_group
                """
                )
                age_groups = [
                    {
                        "age_group": row[0],
                        "session_count": row[1],
                        "avg_aces": float(row[2]) if row[2] else 0,
                    }
                    for row in cur.fetchall()
                ]

                # Most active users
                cur.execute(
                    """
                    SELECT
                        "userId",
                        COUNT(DISTINCT cs.id) as session_count,
                        COUNT(cm.id) as total_messages,
                        MAX(cs."updatedAt") as last_activity
                    FROM "ChatSession" cs
                    LEFT JOIN "ChatMessage" cm ON cs.id = cm."sessionId"
                    GROUP BY "userId"
                    ORDER BY total_messages DESC
                    LIMIT 10
                """
                )
                active_users = [
                    {
                        "userId": row[0],
                        "session_count": row[1],
                        "total_messages": row[2],
                        "last_activity": row[3].isoformat() if row[3] else None,
                    }
                    for row in cur.fetchall()
                ]

                # High ACEs sessions
                cur.execute(
                    """
                    SELECT
                        cs.id,
                        cs."userId",
                        cs."aceScore",
                        cs.age,
                        COUNT(cm.id) as message_count,
                        cs."createdAt"
                    FROM "ChatSession" cs
                    LEFT JOIN "ChatMessage" cm ON cs.id = cm."sessionId"
                    WHERE cs."aceScore" >= 7
                    GROUP BY cs.id, cs."userId", cs."aceScore", cs.age, cs."createdAt"
                    ORDER BY cs."aceScore" DESC
                    LIMIT 10
                """
                )
                high_aces_sessions = [
                    {
                        "id": row[0],
                        "userId": row[1],
                        "aceScore": float(row[2]) if row[2] else 0,
                        "age": row[3],
                        "message_count": row[4],
                        "createdAt": row[5].isoformat() if row[5] else None,
                    }
                    for row in cur.fetchall()
                ]

                # User-specific sessions if userId provided
                user_sessions = None
                if userId:
                    user_sessions = session_manager.get_user_sessions(userId, limit=20)
                    # Convert datetime objects to ISO strings
                    for session in user_sessions:
                        if session.get("createdAt"):
                            session["createdAt"] = session["createdAt"].isoformat()
                        if session.get("updatedAt"):
                            session["updatedAt"] = session["updatedAt"].isoformat()

                return SessionAnalytics(
                    age_groups=age_groups,
                    active_users=active_users,
                    high_aces_sessions=high_aces_sessions,
                    user_sessions=user_sessions,
                )

    except Exception as e:
        print("Exception in /session-analytics:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
