from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from summary.models import Summary, Category
from summary.serializers import UserIdParameterSerializer, MessageResponseSerializer
from django.db.models import Count

from googleapiclient.discovery import build
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

        # 유저의 각 구독 채널 정보 가져오기
        user_subscribes = Summary.objects.filter(user_id=user_id).values('youtube_channel').distinct()

        # 각 채널의 이미지 URL 및 summary_count 가져오기
        channel_images = []
        for subscribe in user_subscribes:
            channel_name = subscribe['youtube_channel']
            summary_count = Summary.objects.filter(user_id=user_id, youtube_channel=channel_name).count()

            try:
                # 유튜브 API 클라이언트 생성
                DEVELOPER_KEY = ''  # 본인의 YouTube API 키로 변경
                YOUTUBE_API_SERVICE_NAME = "youtube"
                YOUTUBE_API_VERSION = "v3"
                youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)

                # 채널 검색
                search_response = youtube.search().list(
                    q=channel_name,
                    order="relevance",
                    part="snippet",
                    type="channel",
                    maxResults=1
                ).execute()

                # 검색 결과에서 채널 ID 추출
                channel_id = search_response['items'][0]['id']['channelId']

                # 채널 정보 가져오기
                channel_response = youtube.channels().list(
                    part='snippet',
                    id=channel_id
                ).execute()

                # 채널 이미지 URL 추출
                channel_image_url = channel_response['items'][0]['snippet']['thumbnails']['high']['url']

                channel_images.append({
                    'youtube_channel': channel_name,
                    'summary_count': summary_count,
                    'channel_image_url': channel_image_url
                })

            except Exception as e:
                print(f"Error: {e}")
                channel_images.append({
                    'youtube_channel': channel_name,
                    'summary_count': summary_count,
                    'channel_image_url': None
                })

        # API 응답 데이터 생성
        data = {
            'subscribes': channel_images
        }

        return Response(data)