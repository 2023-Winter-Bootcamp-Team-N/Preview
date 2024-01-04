from rest_framework import serializers
from .models import Subscribe, User

class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['user_id', 'subcribe_channel']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name']