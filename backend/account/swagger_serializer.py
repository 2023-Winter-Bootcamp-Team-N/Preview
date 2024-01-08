from rest_framework import serializers

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField();

class SummaryRequestSerializer(serializers.Serializer):
    url = serializers.CharField();