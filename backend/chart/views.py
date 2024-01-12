from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from summary.models import Summary, Category
from summary.serializers import UserIdParameterSerializer, MessageResponseSerializer
from django.db.models import Count

from drf_yasg.utils import swagger_auto_schema

class CategoryChartAPIView(APIView):
    @swagger_auto_schema(query_serializer=UserIdParameterSerializer, responses={"200":MessageResponseSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id', None)
        if not user_id:
            return Response({'error': '유저가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        user_summaries = Summary.objects.filter(user_id=user_id)

        category_counts = Category.objects.filter(summary_id__in=user_summaries).values('category').annotate(count=Count('summary_id'))

        data = {
            'categories': [{'category': item['category'], 'count': item['count']} for item in category_counts]
        }

        return Response(data)
    

class SubscribeChartAPIView(APIView):
    @swagger_auto_schema(query_serializer=UserIdParameterSerializer, responses={"200":MessageResponseSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id', None)
        if not user_id:
            return Response({'error': '유저가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        user_subscribes = Summary.objects.filter(user_id=user_id).values('youtube_channel').annotate(count=Count('youtube_channel'))

        data = {
            'subscribes': [{'youtube_channel': item['youtube_channel'], 'count': item['count']} for item in user_subscribes]
        }
        
        return Response(data)