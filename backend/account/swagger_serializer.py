from rest_framework import serializers
from .serializers import SummarySaveSerializer, CategorySaveSerializer, SummaryByTimeSaveSerializer

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.CharField()

class SummarySaveCompositeSerializer(serializers.Serializer):
    summary = SummarySaveSerializer()
    categories = CategorySaveSerializer(many=True)
    summary_by_times = SummaryByTimeSaveSerializer(many=True)

class UserIdParameterSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()

class CategoryResponseSerializer(serializers.Serializer):
    category = serializers.CharField()
