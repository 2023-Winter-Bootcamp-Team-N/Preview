from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404

from .models import Subscribe, User, Summary, Summary_By_Time, Category
from django.db.models import Count
from django.db.models import Q

from .serializers import (
    SummarySaveSerializer, 
    CategorySaveSerializer, 
    SummaryByTimeSaveSerializer, 
    SearchSerializer, 
    SubscribeSerializer, 
    SubscribeCancelSerializer, 
    UserSerializer
)

from .swagger_serializer import (
    MessageResponseSerializer,
    UserIdParameterSerializer,
    SummarySaveCompositeSerializer,
    CategoryResponseSerializer
)

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class SubscribeAPIView(APIView):
    @swagger_auto_schema(tags=['구독'], request_body=SubscribeSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        serializer = SubscribeSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data.get('user_id')
            subscribe_channel = serializer.validated_data.get('subscribe_channel')
            if Subscribe.objects.filter(user_id=user_id, subscribe_channel=subscribe_channel).exists():
                return Response({"message": "이미 구독된 채널입니다."}, status=status.HTTP_400_BAD_REQUEST)
                
            serializer.save()
            return Response({"구독되었습니다."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubscribeCancelAPIView(APIView):
    @swagger_auto_schema(tags=['구독 해지'], request_body=SubscribeCancelSerializer, responses={"200":MessageResponseSerializer})
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
    @swagger_auto_schema(tags=['요약본 저장'], request_body=SummarySaveCompositeSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        summary_data = request.data.get('summary')
        user_id = summary_data.get('user_id')
        # User 모델에서 user_id가 존재하는지 확인
        if not User.objects.filter(id=user_id).exists():
            return Response({"error": "유저가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)
        
        # 요약본 저장
        summary_serializer = SummarySaveSerializer(data=summary_data)
        if summary_serializer.is_valid():
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


class MembersAPIView(APIView):
    @swagger_auto_schema(tags=['회원 가입'], request_body=UserSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            if User.objects.filter(email=email).exists():
                return Response({"이미 존재하는 회원입니다."}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({"회원가입이 완료되었습니다."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MaincategoryAPIView(APIView):
    @swagger_auto_schema(tags=['메인페이지 카테고리'], query_serializer=UserIdParameterSerializer, responses = {"200":CategoryResponseSerializer})
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
      
class CategoryListAPIView(APIView):
    @swagger_auto_schema(tags=['카테고리 검색'], query_serializer=UserIdParameterSerializer)
    def get(self, request, category):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'error': '유저가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        
        result = []

        summaries = Summary.objects.filter(user_id=user_id, category__category=category).prefetch_related('category_set', 'summary_by_time_set')

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
                    "end_time": time.end_time.strftime("%H:%M"),
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
        return Response({'summaries': result})
       
class ChartAPIView(APIView):
    @swagger_auto_schema(tags=['차트 정보 제공'], query_serializer=UserIdParameterSerializer, responses={"200":MessageResponseSerializer})
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

class SearchView(APIView):
    @swagger_auto_schema(tags=['키워드 검색 기능'], query_serializer=UserIdParameterSerializer, responses={"200":MessageResponseSerializer})
    def get(self, request, keyword):
        user_id = request.query_params.get('user_id')
        

        query = Q(youtube_title__icontains=keyword)|\
                Q(youtube_channel__icontains=keyword)|\
                Q(content__icontains=keyword) |\
                Q(category__category__icontains=keyword)|\
                Q(summary_by_time__content__icontains=keyword)
        
        if user_id:
            query &= Q(user_id=user_id)
        
        summaries = Summary.objects.filter(query).distinct().prefetch_related('category_set', 'summary_by_time_set')
        print(user_id)
        serializer = SearchSerializer(summaries, many=True)
        
        return Response({'summaries': serializer.data})