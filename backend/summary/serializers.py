from rest_framework import serializers
from .models import Subscribe, Summary, Category, Summary_By_Time, User


class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['user_id', 'subscribe_channel']

class SubscribeCancelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = ['user_id', 'subscribe_channel']

class SummarySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields= ['user_id', 'youtube_channel', 'youtube_title', 'youtube_url', 'youtube_thumbnail', 'content']

class CategorySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['summary_id', 'category']

class SummaryByTimeSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary_By_Time
        fields = ['summary_id','start_time', 'end_time', 'content']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField()

class SummaryRequestSerializer(serializers.Serializer):
    url = serializers.CharField()