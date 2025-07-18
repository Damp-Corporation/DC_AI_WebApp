from rest_framework import serializers
from .models import Feedback, User

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '_all_'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['fullname', 'phone', 'email', 'address', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user