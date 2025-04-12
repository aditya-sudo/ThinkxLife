# app/chatbot.py

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from config import MODEL_NAME  # Use config to define MODEL_NAME

# Load model and tokenizer (FLAN-T5 Small is very lightweight)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
generator = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

def generate_response(user_input, user_context, retrieved_docs):
    """
    Generate an empathetic response using FLAN-T5.
    """
    context_str = f"Name: {user_context.get('name')}, Age: {user_context.get('age')}, Mood: {user_context.get('mood')}, Goal: {user_context.get('goal')}"
    docs_str = "\n".join(retrieved_docs)

    prompt = (
        f"Act as a friendly, empathetic chatbot named Zoe.\n"
        f"User Info: {context_str}\n"
        f"Helpful Info: {docs_str}\n"
        f"User said: {user_input}\n"
        f"How would Zoe respond?"
    )

    result = generator(prompt, max_length=128)[0]['generated_text']
    return result.strip()
