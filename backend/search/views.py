from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import status
from summary.models import Summary
from django.db.models import Q

from summary.serializers import (
    SearchSerializer,
    MainPageCategorySerializer,
    ChannelSearchSerializer,
    KeywordSearchSerializer
)

from .pagination import ScrollPagination

from drf_yasg.utils import swagger_auto_schema

class CategorySearchAPIView(ListAPIView):
    pagination_class = ScrollPagination

    @swagger_auto_schema(operation_summary="카테고리 검색", query_serializer=MainPageCategorySerializer, responses={"200":SearchSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id')
        category = request.query_params.get('category')
        if not user_id:
            return Response({'error': '유저가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        
        result = []

        if category == '전체':
            # 'all'이면 모든 요약본 정보를 불러옴
            summaries = Summary.objects.filter(
                Q(deleted_at__isnull=True),
                Q(user_id=user_id)
            ).prefetch_related('category_set', 'summary_by_time_set')
        else:
            # 특정 카테고리에 해당하는 요약본 정보만 불러옴
            summaries = Summary.objects.filter(
                Q(deleted_at__isnull=True),
                Q(user_id=user_id),
                Q(category__category=category)
            ).prefetch_related('category_set', 'summary_by_time_set')

        # 페이징 처리
        page = self.paginate_queryset(summaries)

        if page is not None:
            serializer = SearchSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
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
        
        if not result:
            response = {
                "error": "해당되는 결과가 없습니다.",
                "category" : category
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'summaries': result}, status=status.HTTP_200_OK)

class KeywordSearchView(ListAPIView):
    pagination_class = ScrollPagination

    @swagger_auto_schema(operation_summary="키워드 검색", query_serializer=KeywordSearchSerializer, responses={"200":SearchSerializer})    
    def get(self, request):
        user_id = request.query_params.get('user_id')
        keyword = request.query_params.get('keyword')
        category = request.query_params.get('category')

    
        keyword_query = Q(youtube_title__icontains=keyword)|\
                        Q(youtube_channel__icontains=keyword)|\
                        Q(content__icontains=keyword) |\
                        Q(summary_by_time__content__icontains=keyword)
                
        # 사용자 ID와 카테고리에 대한 필수 쿼리
        user_query = Q(user_id=user_id)

        if category.lower() != '전체':
            category_query = Q(category__category__icontains=category)

        else:
            category_query = Q()  


        # 삭제되지 않은 요약에 대한 쿼리
        not_deleted_query = Q(deleted_at__isnull=True)

        # 최종 쿼리 조합
        query = keyword_query & user_query & category_query & not_deleted_query
        
        summaries = Summary.objects.filter(query).distinct().prefetch_related('category_set', 'summary_by_time_set')

        # 페이징 처리
        page = self.paginate_queryset(summaries)

        if page is not None:
            serializer = SearchSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = SearchSerializer(summaries, many=True)

        if not serializer.data:
            response = {
                "error": "해당되는 결과가 없습니다.",
                "keyword" : keyword,
                "category" : category
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'summaries': serializer.data}, status=status.HTTP_200_OK)
    
class ChannelSearchView(ListAPIView):
    pagination_class = ScrollPagination

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
        ).prefetch_related('category_set', 'summary_by_time_set').order_by('-created_at')

        result = []
        
        page = self.paginate_queryset(summaries)

        if page is not None:
            serializer = SearchSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

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

        if not result:
            response = {
                "error": "해당되는 결과가 없습니다.",
                "channel" : channel
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST )
        
        return Response({'summaries': result}, status=status.HTTP_200_OK)