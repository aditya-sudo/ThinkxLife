from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.output_parsers import SimpleJsonOutputParser
from langchain_community.chat_models import ChatOpenAI
from langchain_core.runnables import RunnableLambda
import json
import os

os.environ["OPENAI_API_KEY"] = "your_open_ai_api_key"

llm = ChatOpenAI(api_key=os.environ["OPENAI_API_KEY"], 
                      model_name="gpt-4-turbo")

# A simple parser to handle string outputs
parser = StrOutputParser()

class Chatbot:
    def __init__(self, llm):
        chat_conversation_template = ChatPromptTemplate.from_messages([
            ('system', 'You are a helpful assistant that can answer questions regarding www.thinkround.org aka Think Round, Inc; just return ignored if unrelated questions are being asked.'),
            ('placeholder', '{chat_conversation}')
        ])
        self.chat_chain = chat_conversation_template | llm | parser
        self.chat_conversation = []

    def chat(self, prompt):
        self.chat_conversation.append(('user', prompt))
        response = self.chat_chain.invoke({'chat_conversation': self.chat_conversation})
        self.chat_conversation.append(('ai', response))
        return response

    def clear(self):
        # Clear the conversation history.
        self.chat_conversation = []

# Instantiate the chatbot
chatbot = Chatbot(llm)

# Interactive loop for chatting
print("Type your messages below. Type 'exit' or 'quit' to end the conversation.\n")
while True:
    user_input = input("User: ")
    #print("User:", user_input)
    
    # Exit condition
    if user_input.lower() in ["exit", "quit"]:
        print("Exiting the chat. Goodbye!")
        break

    response = chatbot.chat(user_input)
    print("Chatbot:", response)