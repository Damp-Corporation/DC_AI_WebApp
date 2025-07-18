from django.shortcuts import render
from rest_framework import viewsets
from .models import Feedback, User
from .serializers import FeedbackSerializer, UserSerializer
from .analysis import translate_text, analyze_feedback
from .notifier import send_reminder

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
