import chromadb
from sentence_transformers import SentenceTransformer

chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="chat_memory")

model = SentenceTransformer("all-MiniLM-L6-v2")

def store_message(user_id, message, response):
    embeddings = model.encode([message])
    collection.add(
        documents=[message],
        metadatas=[{"user_id": user_id, "response": response}],
        ids=[f"{user_id}-{message[:10].strip().replace(' ', '_')}"]
    )

def retrieve_context(user_id, query):
    query_embedding = model.encode([query])
    results = collection.query(
        query_embeddings=query_embedding,
        n_results=3,
        where={"user_id": user_id}
    )
    return results.get("metadatas", [])