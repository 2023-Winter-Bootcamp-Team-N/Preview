from rest_framework import serializers
from .models import Subscribe

class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['user_id', 'subscribe_channel_id']

class SubscribeCancelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['user_id']

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField()

    class Meta:
        ref_name = 'subscribe_message_response'

class SubscribeListSerializer(serializers.Serializer):
    subscribe_channel_name = serializers.CharField()