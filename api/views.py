from django.shortcuts import render
from rest_framework import viewsets
from .models import Feedback, User, PasswordResetCode
from .serializers import FeedbackSerializer, UserSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer 
from .analysis import translate_text, analyze_feedback
from .notifier import send_reminder
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
import random 
from django.contrib.auth.hashers import make_password  
from django.core.mail import send_mail 
from twilio.rest import Client 
from django.utils import timezone  
import datetime




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



class PasswordResetRequestView(APIView): 
      def post(self, request): 
            serializer = PasswordResetRequestSerializer(data=request.data) 
            if serializer.is_valid(): 
                identifier = serializer.validated_data['identifier'] 
                method = serializer.validated_data['method'] 
                code = str(random.randint(100000, 999999)) 
                expiry = timezone.now() + datetime.timedelta(minutes=10)

                try:
                    user = User.objects.get(phone=identifier) if method == 'phone' else User.objects.get(email=identifier)
                except User.DoesNotExist:
                    return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

                PasswordResetCode.objects.update_or_create(user=user, defaults={"code": code, "expires_at": expiry})

                if method == 'email':
                    send_mail(
                        'Your Password Reset Code',
                        f'Your reset code is: {code}',
                        'noreply@example.com',
                        [user.email],
                    )
                else:
                    client = Client()  # Twilio creds should be set in env
                    client.messages.create(
                        body=f"Your password reset code is {code}",
                        from_='+1234567890',  # Replace with Twilio number
                        to=user.phone
                    )
                return Response({"message": "Reset code sent."})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView): 
     def post(self, request): 
          serializer = PasswordResetConfirmSerializer(data=request.data) 
          if serializer.is_valid(): 
            code = serializer.validated_data['code'] 
            new_password = serializer.validated_data['new_password']

            try:
                        reset_entry = PasswordResetCode.objects.get(code=code)
                        if reset_entry.expires_at < timezone.now():
                            return Response({"error": "Code expired."}, status=status.HTTP_400_BAD_REQUEST)
                        user = reset_entry.user
                        user.password = make_password(new_password)
                        user.save()
                        reset_entry.delete()
                        return Response({"message": "Password reset successful."})
            except PasswordResetCode.DoesNotExist:
                        return Response({"error": "Invalid code."}, status=status.HTTP_400_BAD_REQUEST)
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    