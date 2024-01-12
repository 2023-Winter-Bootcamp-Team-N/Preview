from rest_framework import serializers
from summary.serializers import CategorySaveSerializer, SummaryByTimeSaveSerializer

class SearchSerializer(serializers.Serializer):
    categories = CategorySaveSerializer(many=True, read_only=True, source='category_set')
    summary_by_times = SummaryByTimeSaveSerializer(many=True, read_only=True, source='summary_by_time_set')