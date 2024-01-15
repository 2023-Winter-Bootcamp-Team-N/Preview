from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField()

    class Meta:
        ref_name = 'acccount_message_response'