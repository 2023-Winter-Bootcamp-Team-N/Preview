from rest_framework import serializers

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField();