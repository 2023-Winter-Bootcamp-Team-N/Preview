from rest_framework import serializers

class CategoryCountSerializer(serializers.Serializer):
    category = serializers.CharField()
    count = serializers.IntegerField()

class CategoryChartResponseSerializer(serializers.Serializer):
    categories = CategoryCountSerializer(many=True)

class SubscribeCounSerializer(serializers.Serializer):
    youtube_channel = serializers.CharField()
    count = serializers.IntegerField()
    channel_image_url = serializers.CharField()

class SubscribeChartResponseSerializer(serializers.Serializer):
    subscribes = SubscribeCounSerializer(many=True)