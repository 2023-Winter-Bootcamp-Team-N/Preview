from rest_framework import serializers

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField();

class UserIdParameterSerilaizer(serializers.Serializer):
    user_id = serializers.IntegerField()