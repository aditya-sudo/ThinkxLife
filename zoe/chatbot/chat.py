### chatbot/chat.py
import os
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from dotenv import load_dotenv

load_dotenv()
MODEL_NAME = os.getenv("HF_MODEL", "facebook/blenderbot-400M-distill")
HF_TOKEN = os.getenv("HF_TOKEN")

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_auth_token=HF_TOKEN)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, use_auth_token=HF_TOKEN)
chatbot = pipeline("text-generation", model=model, tokenizer=tokenizer)

def get_chat_response(user_id, message):
    prompt = f"User: {message}\nChatbot (empathetic):"
    generated = chatbot(prompt, max_new_tokens=200)
    return generated[0]["generated_text"]
