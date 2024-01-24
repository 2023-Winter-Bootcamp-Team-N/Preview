from rest_framework import serializers
from .models import Subscribe

class SubscribeSerialzer(serializers.Serializer):
    user_id = serializers.IntegerField()
    channel_url = serializers.CharField()

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