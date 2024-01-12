from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User, Summary, Category

from .serializers import (
    SummarySaveSerializer, 
    CategorySaveSerializer, 
    SummaryByTimeSaveSerializer, 
    SummaryDeleteSerializer,
    MessageResponseSerializer,
    UserIdParameterSerializer,
    SummarySaveCompositeSerializer,
    CategoryResponseSerializer
)

from drf_yasg.utils import swagger_auto_schema

class SummaryAPIView(APIView):
    @swagger_auto_schema(request_body=SummarySaveCompositeSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        summary_data = request.data.get('summary')
        user_id = summary_data.get('user_id')
        # User 모델에서 user_id가 존재하는지 확인
        if not User.objects.filter(id=user_id).exists():
            return Response({"error": "유저가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)
        
        # 요약본 저장
        summary_serializer = SummarySaveSerializer(data=summary_data)
        if summary_serializer.is_valid():
            youtube_url = summary_data.get('youtube_url')

            if Summary.objects.filter(user_id=user_id, youtube_url=youtube_url).exists():
                return Response({"error: ""저장된 요약본이 이미 존재합니다."}, status=status.HTTP_400_BAD_REQUEST)

            summary = summary_serializer.save()
            # return Response(summary_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(summary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # 카테고리 저장
        saved_categories = []
        for category_data in request.data.get('categories', []):
            category_data['summary_id'] = summary.id
            category_serializer = CategorySaveSerializer(data=category_data)
            if category_serializer.is_valid():
                category_serializer.save()
                saved_categories.append(category_serializer.data)
            else:
                return Response(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # return Response(saved_categories, status=status.HTTP_201_CREATED)

        # 시간대별 요약
        for summary_by_time_data in request.data.get('summary_by_times', []):
            summary_by_time_data['summary_id'] = summary.id
            summary_by_time_serializer = SummaryByTimeSaveSerializer(data=summary_by_time_data)
            if summary_by_time_serializer.is_valid():
                summary_by_time_serializer.save()
            else:
                return Response(summary_by_time_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({"message": "요약본 저장을 성공했습니다."}, status=status.HTTP_201_CREATED)
    
class SummaryDeleteAPIView(APIView):
    @swagger_auto_schema(query_serializer=SummaryDeleteSerializer, responses = {"200":MessageResponseSerializer})
    def delete(self, request, summary_id):
        user_id = request.query_params.get('user_id', None)
        try:
            summary = Summary.objects.get(id=summary_id, user_id=user_id, deleted_at__isnull=True)
            # 요약본의 삭제 시간을 현재 시간으로 업데이트
            summary.deleted_at = timezone.now()
            summary.save()
            return Response("요약본이 정상적으로 삭제되었습니다.", status=status.HTTP_200_OK)
        except Summary.DoesNotExist:
            return Response("해당 요약본을 찾을 수 없습니다.", status=status.HTTP_404_NOT_FOUND)

class MainPageCategoryAPIView(APIView):
    @swagger_auto_schema(query_serializer=UserIdParameterSerializer, responses = {"200":CategoryResponseSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id', None)
        if not user_id:
            return Response({'error': '유저가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        summaries = Summary.objects.filter(user_id=user_id)

        if not summaries:
            return Response({'message': '요약본이 존재하지 않습니다.', 'categories': []}, status=status.HTTP_200_OK)
        
        categories = set()
        for summary in summaries:
            summary_id = summary.id
            categories_for_summary = Category.objects.filter(summary_id=summary_id)
            
            for category in categories_for_summary:
                categories.add(category.category)

        sorted_categories = sorted(list(categories))
        formatted_categories = [{'category': category} for category in sorted_categories]
        
        return Response({'categories': formatted_categories}, status=status.HTTP_200_OK)   

