### app.py (Flask API)
from flask import Flask, request, jsonify
from chatbot.ace import process_ace_questionnaire
from chatbot.chat import get_chat_response
import json, os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Empathetic ACE Chatbot is running. Use /questionnaire/form or /chat."})

@app.route("/questionnaire/form", methods=["GET"])
def get_questionnaire():
    with open("questionnaire/ace_questions.json") as f:
        questions = json.load(f)
    return jsonify(questions)

@app.route("/questionnaire", methods=["POST"])
def submit_questionnaire():
    data = request.get_json()
    user_id = data.get("user_id")
    responses = data.get("responses")
    result = process_ace_questionnaire(user_id, responses)
    return jsonify({"message": "Questionnaire received", "data": result})

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_id = data.get("user_id")
    message = data.get("message")
    response = get_chat_response(user_id, message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
