from rest_framework import serializers

from .models import Subscribe
from .models import Member

class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['user_id', 'subscribe_channel']

class SubscribeCancelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['user_id', 'subscribe_channel']

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['email', 'password']

