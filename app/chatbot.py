# app/chatbot.py

from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM

# Load model and tokenizer once during startup
model_name = "OpenAssistant/oasst-sft-1-pythia-12b"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

def generate_response(user_input, user_context, retrieved_docs):
    """
    Construct a custom prompt with empathy + retrieved info + context.
    """
    context_str = f"Name: {user_context.get('name')}, Age: {user_context.get('age')}, Mood: {user_context.get('mood')}, Goal: {user_context.get('goal')}"
    docs_str = "\n".join(retrieved_docs)

    prompt = (
        f"You are a friendly and empathetic chatbot.\n"
        f"User Context: {context_str}\n"
        f"Relevant Information:\n{docs_str}\n\n"
        f"User: {user_input}\n"
        f"Zoe:"
    )

    result = generator(prompt, max_length=256, do_sample=True, top_k=50, top_p=0.95)
    response = result[0]["generated_text"].split("Zoe:")[-1].strip()

    return response
