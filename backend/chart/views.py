from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from summary.models import Summary, Category
from summary.serializers import UserIdParameterSerializer
from .serializers import CategoryChartResponseSerializer, SubscribeChartResponseSerializer
from django.db.models import Count

from drf_yasg.utils import swagger_auto_schema

class CategoryChartAPIView(APIView):
    @swagger_auto_schema(operation_summary="카테고리 차트", query_serializer=UserIdParameterSerializer, responses={"200":CategoryChartResponseSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id', None)
        if not user_id:
            return Response({'error': '유저가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        user_summaries = Summary.objects.filter(user_id=user_id, deleted_at__isnull=True)

        category_counts = Category.objects.filter(summary_id__in=user_summaries).values('category').annotate(count=Count('summary_id'))

        if not category_counts.exists():
            return Response({"error": "해당 정보가 없습니다"}, status=status.HTTP_404_NOT_FOUND)
        
        data = {
            'categories': [{'category': item['category'], 'count': item['count']} for item in category_counts]
        }

        return Response(data, status=status.HTTP_200_OK)
    

class SubscribeChartAPIView(APIView):
    @swagger_auto_schema(operation_summary="채널 차트", query_serializer=UserIdParameterSerializer, responses={"200":SubscribeChartResponseSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id', None)
        if not user_id:
            return Response({'error': '유저가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 유저의 각 구독 채널 정보 가져오기
        user_subscribes = Summary.objects.filter(user_id=user_id, deleted_at__isnull=True).values('youtube_channel').distinct()

        channels = []
        for subscribe in user_subscribes:
            channel_name = subscribe['youtube_channel']
            summary_count = Summary.objects.filter(user_id=user_id, youtube_channel=channel_name, deleted_at__isnull=True).count()

            channels.append({
                'youtube_channel': channel_name,
                'count': summary_count,
            })

        if not channels:
            response = {
                "error": "해당되는 정보가 없습니다.",
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        
        # API 응답 데이터 생성
        data = {
            'subscribes': channels
        }

        return Response(data, status=status.HTTP_200_OK)