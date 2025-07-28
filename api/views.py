from django.shortcuts import render
from rest_framework import viewsets
from .models import Feedback, User
from .serializers import FeedbackSerializer, UserSerializer
from .analysis import translate_text, analyze_feedback
from .notifier import send_reminder
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate



class LoginAPIView(APIView):
    def post(self, request):
        fullname = request.data.get('phone')
        password = request.data.get('password')
        user = authenticate(username=fullname, password=password)  # fullname used as username
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    def perform_create(self, serializer):
        feedback = serializer.save()
        translated = translate_text(feedback.feedback_text)
        sentiment, theme, summary, alert = analyze_feedback(translated)
        feedback.sentiment = sentiment
        feedback.theme = theme
        feedback.summary = summary
        feedback.alert_flag = alert
        feedback.save()
        if alert:
            send_reminder('+1234567890', f"⚠ Negative feedback detected: {summary}")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    