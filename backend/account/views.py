from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404

from .models import Subscribe, User, Summary, Summary_By_Time, Category
from .serializers import SubscribeSerializer, SubscribeCancelSerializer 
from .serializers import SummarySaveSerializer, CategorySaveSerializer, SummaryByTimeSaveSerializer

class SubscribeAPIView(APIView):
    def post(self, request):
        serializer = SubscribeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubscribeCancelAPIView(APIView):
    def post(self, request):
        serializer = SubscribeCancelSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data.get('user_id')
            subscribe_channel = serializer.validated_data.get('subscribe_channel')
            subscription = Subscribe.objects.get(user_id=user_id, subscribe_channel=subscribe_channel)
            if subscription:
                subscription.deleted_at = timezone.now()
                subscription.save()
                return Response({"message": "구독이 성공적으로 해지되었습니다."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "구독 정보를 찾지 못했습니다"}, status=status.HTTP_404_NOT_FOUND)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    

class SummarySaveAPIView(APIView):
    def post(self, request):
        # 요약본 저장
        summary_serializer = SummarySaveSerializer(data=request.data.get('summary'))
        if summary_serializer.is_valid():
            summary = summary_serializer.save()
        else:
            return Response(summary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # 카테고리 저장
        for category_data in request.data.get('categories', []):
            category_data['summary_id'] = summary.id
            category_serializer = CategorySaveSerializer(data=category_data)
            if category_serializer.is_valid():
                category_serializer.save()
            else:
                return Response(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

        # 시간대별 요약
        for summary_by_time_data in request.data.get('summary_by_times', []):
            summary_by_time_data['summary_id'] = summary.id
            summary_by_time_serializer = SummaryByTimeSaveSerializer(data=summary_by_time_data)
            if summary_by_time_serializer.is_valid():
                summary_by_time_serializer.save()
            else:
                return Response(summary_by_time_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({"message": "요약본 저장을 성공했습니다."}, status=status.HTTP_201_CREATED)
        
# class SummarySaveAPIView(APIView):
#     def post(self, request):
#         serializer = SummarySaveSerializer(data=request.data.summaries)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "저장을 성공했습니다."}, status=status.HTTP_201_CREATED)
#         else:
#             return Response({"error", "저장에 실패했습니다."}, status=status.HTTP_400_BAD_REQUEST)


# class CategorySaveAPIView(APIView):
#     def post(self, request):
#         for category_data in request.data.get('categories', []):
#             serializer = CategorySaveSerializer(data=category_data)
#             if serializer.is_valid():
#                 serializer.save()
#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response({"message": "카테고리 저장을 완료했습니다."}, status=status.HTTP_201_CREATED)
        

# class SummaryByTimeAPIView(APIView):
#     def post(self, request):
#         for summary_by_time_data in request.data.get('summary_by_times', []):
#             serializer = SummaryByTimeSaveSerializer(data=summary_by_time_data)
#             if serializer.is_valid():
#                 serializer.save()
#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response({"message": "시간대별 요약에 성공했습니다."}, status=status.HTTP_201_CREATED)
    
        