from rest_framework import serializers
from .models import Subscribe

class SubscribeSerialzer(serializers.Serializer):
    user_id = serializers.IntegerField()
    channel_url = serializers.CharField()

class SubscribeCancelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['user_id']

class SubscribeCancleResponseSerializer(serializers.Serializer):
    message = serializers.CharField()

class SubscribeResponseSerializer(serializers.Serializer):
    message = serializers.CharField()
    subscribe_channel_name = serializers.CharField()


class SubscribeListSerializer(serializers.Serializer):
    subscribe_channel_name = serializers.CharField()
    channel_image_url = serializers.CharField()
