# app/routes.py

from flask import Blueprint, request, jsonify, session
from app.questionnaire import validate_questionnaire
from app.chatbot import generate_response
from app.embeddings import get_relevant_context

bp = Blueprint("main", __name__)

@bp.route("/start", methods=["POST"])
def start():
    data = request.json
    is_valid, context = validate_questionnaire(data)
    
    if not is_valid:
        return jsonify({"error": "Invalid questionnaire inputs"}), 400

    # Store context in session or memory (for simplicity, we just pass it back for now)
    return jsonify({"status": "ready", "message": "You can now chat!", "user_context": context})


@bp.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "")
    user_context = data.get("user_context", {})  # could be passed from frontend or stored in session

    if not user_input:
        return jsonify({"error": "Message cannot be empty"}), 400

    # Retrieve relevant knowledge base info using FAISS
    retrieved_docs = get_relevant_context(user_input)

    # Generate response using LLM
    reply = generate_response(user_input, user_context, retrieved_docs)

    return jsonify({"response": reply})
