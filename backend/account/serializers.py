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

class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        field = ['summary_id', 'category']

class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        field = ['id', 'youtube_channel', 'youtube_title', 'youtube_url', 'youtube_thumbnail', 'content']

class ListSerializer(serializers.Serializer):
    summary = SummarySerializer(many=True)
    categories = CategorySaveSerializer(many=True, read_only=True, source='category_set')
    summary_by_times = SummaryByTimeSaveSerializer(many=True, read_only=True, source='summary_by_time_set')