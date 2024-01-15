from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from summary.models import Summary
from django.db.models import Q

from summary.serializers import (
    SearchSerializer,
    MainPageCategorySerializer,
    ChannelSearchSerializer,
    KeywordSearchSerializer
)

from drf_yasg.utils import swagger_auto_schema

class CategorySearchAPIView(APIView):
    @swagger_auto_schema(operation_summary="카테고리 검색", query_serializer=MainPageCategorySerializer, responses={"200":SearchSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id')
        category = request.query_params.get('category')
        if not user_id:
            return Response({'error': '유저가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        
        result = []

        summaries = Summary.objects.filter(
            Q(deleted_at__isnull=True),
            Q(user_id=user_id),
            Q(category__category=category)
        ).prefetch_related('category_set', 'summary_by_time_set')

        # 각 Summary 객체에 대해 정보 추출
        for summary in summaries:
            summary_data = {

                "summary_id": str(summary.id),
                "youtube_title": summary.youtube_title,
                "youtube_channel": summary.youtube_channel,
                "youtube_url": summary.youtube_url,
                "youtube_thumbnail": summary.youtube_thumbnail,
                "content": summary.content,
                "created_at": summary.created_at.strftime("%Y-%m-%d"),
            }

            # Category 정보 추출
            categories_data = [{"category": category.category} for category in summary.category_set.all()]

            # Summary_By_Time 정보 추출
            summary_by_times_data = [
                {
                    "start_time": time.start_time.strftime("%H:%M"),
                    "image_url": time.image_url,
                    "content": time.content,
                }
                for time in summary.summary_by_time_set.all()
            ]

            # 결과에 추가
            result.append({
                "summary": summary_data,
                "categories": categories_data,
                "summary_by_times": summary_by_times_data,
            })
        return Response({'summaries': result}, status=status.HTTP_200_OK)

class KeywordSearchView(APIView):
    @swagger_auto_schema(operation_summary="키워드 검색", query_serializer=KeywordSearchSerializer, responses={"200":SearchSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id')
        keyword = request.query_params.get('keyword')
    
        query = Q(youtube_title__icontains=keyword)|\
                Q(youtube_channel__icontains=keyword)|\
                Q(content__icontains=keyword) |\
                Q(category__category__icontains=keyword)|\
                Q(summary_by_time__content__icontains=keyword)
        
        if user_id:
            query &= Q(user_id=user_id)

        query &= Q(deleted_at__isnull=True)
        
        summaries = Summary.objects.filter(query).distinct().prefetch_related('category_set', 'summary_by_time_set')
        print(user_id)
        serializer = SearchSerializer(summaries, many=True)
        
        return Response({'summaries': serializer.data}, status=status.HTTP_200_OK)
    
class ChannelSearchView(APIView):
    @swagger_auto_schema(operation_summary="채널 검색", query_serializer=ChannelSearchSerializer, responses={"200":SearchSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id')
        channel = request.query_params.get('channel')
        if not user_id:
            return Response({'error': '유저가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        
        result = []

        summaries = Summary.objects.filter(
            Q(deleted_at__isnull=True),
            Q(user_id=user_id),
            Q(youtube_channel=channel)
        ).prefetch_related('category_set', 'summary_by_time_set')

        # 각 Summary 객체에 대해 정보 추출
        for summary in summaries:
            summary_data = {

                "summary_id": str(summary.id),
                "youtube_title": summary.youtube_title,
                "youtube_channel": summary.youtube_channel,
                "youtube_url": summary.youtube_url,
                "youtube_thumbnail": summary.youtube_thumbnail,
                "content": summary.content,
                "created_at": summary.created_at.strftime("%Y-%m-%d"),
            }

            # Category 정보 추출
            categories_data = [{"category": category.category} for category in summary.category_set.all()]

            # Summary_By_Time 정보 추출
            summary_by_times_data = [
                {
                    "start_time": time.start_time.strftime("%H:%M"),
                    "image_url": time.image_url,
                    "content": time.content,
                }
                for time in summary.summary_by_time_set.all()
            ]

            # 결과에 추가
            result.append({
                "summary": summary_data,
                "categories": categories_data,
                "summary_by_times": summary_by_times_data,
            })
        return Response({'summaries': result}, status=status.HTTP_200_OK)