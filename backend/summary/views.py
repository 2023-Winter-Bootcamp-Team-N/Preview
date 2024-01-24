from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Summary, Category


from .tasks import save


from .serializers import (
    SummaryDeleteSerializer,
    MessageResponseSerializer,
    UserIdParameterSerializer,
    SummarySaveCompositeSerializer,
    CategoryResponseSerializer
)

from drf_yasg.utils import swagger_auto_schema

class SummaryAPIView(APIView):
    @swagger_auto_schema(operation_summary="요약본 저장", request_body=SummarySaveCompositeSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):

        summary_data = request.data.get('summary')
        category_list = request.data.get('category')
        summary_by_times = request.data.get('summary_by_times', [])
        
        save.delay(summary_data, category_list, summary_by_times)

        return Response({"message": "요약본 저장 중"}, status=status.HTTP_201_CREATED)
    
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