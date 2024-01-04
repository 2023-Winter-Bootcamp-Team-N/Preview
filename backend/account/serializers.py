from rest_framework import serializers
from .models import Subscribe

class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['user_id', 'subscribe_channel']