from rest_framework import serializers
from .models import Summary, Category, Summary_By_Time

class SummarySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields= ['user_id', 'youtube_channel', 'youtube_title', 'youtube_url', 'youtube_thumbnail']

class CategorySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['summary_id', 'category']

class SummaryByTimeSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary_By_Time
        fields = ['summary_id','start_time', 'end_time', 'image_url', 'content']

class SearchSerializer(serializers.ModelSerializer):
    categories = CategorySaveSerializer(many=True, read_only=True, source='category_set')
    summary_by_times = SummaryByTimeSaveSerializer(many=True, read_only=True, source='summary_by_time_set')

class SearchCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category']

class SearchByTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary_By_Time
        fields = ['start_time', 'end_time', 'content', 'image_url']

class SearchSummarySerializer(serializers.ModelSerializer):
    summary_id = serializers.IntegerField(source='id', read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Summary
        fields = ['summary_id','youtube_channel', 'youtube_title', 'youtube_url', 'youtube_thumbnail', 'content', 'created_at']


class SearchSerializer(serializers.ModelSerializer):
    summary = SearchSummarySerializer(source='*')
    categories = SearchCategorySerializer(many=True, read_only=True, source='category_set')
    summary_by_times = SearchByTimeSerializer(many=True, read_only=True, source='summary_by_time_set')
    
    class Meta:
        model = Summary

        # fields = ['user_id', 'youtube_channel', 'youtube_title', 'youtube_url', 'youtube_thumbnail', 'content', 'created_at', 'categories', 'summary_by_times']

        fields = ['summary', 'categories', 'summary_by_times']

class SummaryDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = ['user_id']

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField()

    class Meta:
        ref_name = 'summary_message_response'

class SummarySaveCompositeSerializer(serializers.Serializer):
    summary = SummarySaveSerializer()
    categories = CategorySaveSerializer(many=True)
    summary_by_times = SummaryByTimeSaveSerializer(many=True)

class UserIdParameterSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()

class CategoryResponseSerializer(serializers.Serializer):
    category = serializers.CharField()