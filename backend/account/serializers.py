from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField()