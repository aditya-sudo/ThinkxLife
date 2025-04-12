# app/embeddings.py

import faiss
import numpy as np
import json
from sentence_transformers import SentenceTransformer

# Load embedding model
embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Load knowledge base
with open("data/knowledge_base.json", "r") as f:
    documents = json.load(f)["documents"]

# Create embeddings and FAISS index
document_embeddings = embedder.encode(documents, convert_to_tensor=False)
dimension = document_embeddings[0].shape[0]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(document_embeddings))

def get_relevant_context(query, top_k=5):
    """
    Search FAISS index and return top_k most relevant documents for the query.
    """
    query_embedding = embedder.encode([query])[0]
    D, I = index.search(np.array([query_embedding]), k=top_k)

    return [documents[i] for i in I[0]]
