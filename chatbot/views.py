from rest_framework.views import APIView
from rest_framework.response import Response
from .chroma_db import store_message, retrieve_context
import openai
import os

from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatbotView(APIView):
    def post(self, request):
        message = request.data.get("message")
        language = request.data.get("language", "en")
        user_id = str(request.user.id) if request.user.is_authenticated else "anonymous"

        if not message:
            return Response({"error": "No message provided"}, status=400)

        context_results = retrieve_context(user_id, message)
        past_context = " ".join([m.get("response", "") for m in context_results])

        prompt = f"You are a multilingual healthcare assistant. Previous context: {past_context}\n\nUser: {message}\nAI:"

        try:
            res = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}]
            )
            reply = res.choices[0].message["content"]
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        store_message(user_id, message, reply)
        return Response({"reply": reply})