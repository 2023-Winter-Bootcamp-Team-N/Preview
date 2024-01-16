from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User, Summary, Category

import random, json

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from nTeamProject.celery import app as celery_app
from .tasks import extract_image_from_video

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

# @require_http_methods(["POST"])
class TestView(APIView):
    def post(self, request):
        try:
            # 요청에서 JSON 데이터 추출
            # data = json.loads(request.body)
            video_url = request.data.get('video_url')
            start_times = request.data.get('start_times')

            # 입력값 검증
            if not video_url or not start_times:
                return Response({'error': '해당 비디오가 존재하지 않거나 사진을 출력할 시간대가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

            # Celery 태스크 실행
            task_result = extract_image_from_video.delay(video_url, start_times)

            # 결과 반환
            return Response({'message': '성공적으로 실행되었습니다.', 'task_id': task_result.id})

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from drf_yasg.utils import swagger_auto_schema
from langchain.document_loaders import YoutubeLoader

from .s3 import get_file_url

class SummaryAPIView(APIView):
    @swagger_auto_schema(operation_summary="요약본 저장", request_body=SummarySaveCompositeSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        summary_data = request.data.get('summary')
        user_id = summary_data.get('user_id')
        youtube_url = summary_data.get('youtube_url')

        # User 모델에서 user_id가 존재하는지 확인
        if not User.objects.filter(id=user_id).exists():
            return Response({"error": "유저가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)
        
        # if Summary.objects.filter(user_id=user_id, youtube_url=youtube_url).exists():
        #     return Response({"error: ""저장된 요약본이 이미 존재합니다."}, status=status.HTTP_400_BAD_REQUEST)
        
        result = None
        try:
            loader = YoutubeLoader.from_youtube_url(
                str(youtube_url),
                add_video_info=True,
                language=["ko"],
                translation="ko"
            )
            result = loader.load()
            # 이후 정상적인 처리를 진행
        except Exception as e:
            return Response({"error" : "url이 올바르지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

        meta_data = result[0].metadata
        summary_data['youtube_title'] = meta_data['title']
        summary_data['youtube_channel'] = meta_data['author']
        summary_data['youtube_thumbnail'] = meta_data['thumbnail_url']
        
        # 요약본 저장
        summary_serializer = SummarySaveSerializer(data=summary_data)
        if summary_serializer.is_valid():
            summary = summary_serializer.save()
            # return Response(summary_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(summary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # 카테고리 저장
        base_category = ['요리', '게임', '과학', '경제', '여행', '미술', '스포츠', '사회', '건강', '동물', '코미디', '교육', '연예', '음악', '기타']

        # 카테고리 가져오기
        category_list = request.data.get('category')
        # 카테고리 추출
        result = category_list.split(": ")[1].split(",")

        categories = []
        # 결과 출력
        print(result)
        for cateogry in result:
            category = cateogry.strip()
            if category not in base_category:
                continue
            categories.append({"category":cateogry.strip()})

        if (len(categories) == 0): categories.append({"category":"기타"})
        print(categories)
        # saved_categories = []
        for category_data in categories:
            category_data['summary_id'] = summary.id
            category_serializer = CategorySaveSerializer(data=category_data)
            if category_serializer.is_valid():
                category_serializer.save()
                # saved_categories.append(category_serializer.data)
            else:
                return Response(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # return Response(saved_categories, status=status.HTTP_201_CREATED)

        # 시간대별 요약
        image_url = "이미지"
        summary_by_times = request.data.get('summary_by_times', [])
        start_times = []
        for data in summary_by_times:
            start_times.append(data['start_time'])
        
        task_result = extract_image_from_video.delay(youtube_url, start_times)

        
        # for summary_by_time_data in :
        #     summary_by_time_data['summary_id'] = summary.id
        #     summary_by_time_data['image_url'] = image_url
        #     summary_by_time_serializer = SummaryByTimeSaveSerializer(data=summary_by_time_data)
        #     if summary_by_time_serializer.is_valid():
        #         summary_by_time_serializer.save()
        #     else:
        #         return Response(summary_by_time_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "요약본 저장을 성공했습니다."}, status=status.HTTP_201_CREATED)
    
class SummaryDeleteAPIView(APIView):
    @swagger_auto_schema(operation_summary="요약본 삭제", query_serializer=SummaryDeleteSerializer, responses = {"200":MessageResponseSerializer})
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
    @swagger_auto_schema(operation_summary="메인페이지 카테고리", query_serializer=UserIdParameterSerializer, responses = {"200":CategoryResponseSerializer})
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

class ImageView(APIView):
    def post(self, request):
        url = get_file_url()
