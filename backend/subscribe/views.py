from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from .models import Subscribe, User
from .serializers import (
    SubscribeSerialzer,
    SubscribeCancelSerializer,
    MessageResponseSerializer,
    SubscribeListSerializer,
)
from summary.serializers import UserIdParameterSerializer

from drf_yasg.utils import swagger_auto_schema

import os
import dotenv
import re

dotenv.load_dotenv()

from googleapiclient.discovery import build
DEVELOPER_KEY1 = os.environ.get("DEVELOPER_KEY1")
DEVELOPER_KEY2 = os.environ.get("DEVELOPER_KEY2")
keys = [DEVELOPER_KEY1, DEVELOPER_KEY2]


class SubscribeAPIView(APIView):
    @swagger_auto_schema(operation_summary="구독", request_body=SubscribeSerialzer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        user_id = request.data.get('user_id')
        print(user_id)
        channel_url = request.data.get('channel_url')
        print(channel_url)

        subscribe_channel_id = self.get_channel_id(channel_url)

        print(subscribe_channel_id)

        if user_id and subscribe_channel_id:
            if Subscribe.objects.filter(user_id=user_id, subscribe_channel_id=subscribe_channel_id).exists():
                return Response({"error": "이미 구독 중인 채널입니다."}, status=status.HTTP_400_BAD_REQUEST)

            print("channel name 받아오기")
            subscribe_channel_name = self.get_channel_name(subscribe_channel_id)
            print(subscribe_channel_name)

            if subscribe_channel_name == None:
                return Response({"error": "subscribe_channel_name을 찾지 못했습니다."}, status=status.HTTP_400_BAD_REQUEST)
            
            Subscribe.objects.create(user_id=user_id, subscribe_channel_id=subscribe_channel_id, subscribe_channel_name=subscribe_channel_name)

            return Response({"구독되었습니다."}, status=status.HTTP_201_CREATED)
        return Response({"error": "user_id 또는 subscribe_channel_id가 제공되지 않았습니다."}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_channel_id(self, channel_url):
        # YouTube 동영상 URL에서 video_id를 추출하는 정규 표현식
        pattern = re.compile(r"(?<=@)[a-zA-Z0-9_-]+")
        match = pattern.search(channel_url)

        if match:
            subscribe_channel_id = match.group(0)
            return subscribe_channel_id
        else:
            return None
        
    def get_channel_name(self, subscribe_channel_id):
        for i in range(len(keys)):
            print(i)
            try:
                # YouTube API를 사용하여 채널 정보 가져오기
                DEVELOPER_KEY = keys[i] # 본인의 YouTube API 키로 변경
                YOUTUBE_API_SERVICE_NAME = "youtube"
                YOUTUBE_API_VERSION = "v3"
                youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)
                response = youtube.channels().list(part="snippet", id=subscribe_channel_id).execute()
                print(response)
                if "items" in response and response["items"]:
                    subscribe_channel_name = response["items"][0]["snippet"]["title"]
                    return subscribe_channel_name
                else:
                    return None
            except Exception as e:
                print(f"Error getting channel name: {e}")
                continue
        return None


class SubscribeCancelAPIView(APIView):   
    @swagger_auto_schema(operation_summary="구독 취소", query_serializer=SubscribeCancelSerializer, responses={"200":MessageResponseSerializer})
    def delete(self, request, subscribe_channel):
        user_id = request.query_params.get('user_id', None)
        try:
            subscription = Subscribe.objects.get(user_id=user_id, subscribe_channel=subscribe_channel, deleted_at__isnull=True)
            subscription.deleted_at = timezone.now()
            subscription.save()
            return Response({"message": "구독이 성공적으로 해지되었습니다."}, status=status.HTTP_200_OK)
        except Subscribe.DoesNotExist:
            return Response({"error": "구독 정보를 찾지 못했습니다"}, status=status.HTTP_404_NOT_FOUND)
        
class SubscribeListAPIView(APIView):
    @swagger_auto_schema(operation_summary="구독 목록", query_serializer=UserIdParameterSerializer, responses={"200":SubscribeListSerializer})
    def get(self, request):
        user_id = request.query_params.get('user_id', None)

        # 유저가 있는지부터 확인

        subscribe_channels = Subscribe.objects.filter(user_id=user_id)
        if not subscribe_channels.exists():
            return Response({"message": "해당되는 정보가 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        for channel in subscribe_channels:
            print(channel.subscribe_channel)
        serializer = SubscribeListSerializer(data=subscribe_channels, many=True)
        serializer.is_valid()

        DEVELOPER_KEY1 = os.environ.get("DEVELOPER_KEY1")
        DEVELOPER_KEY2 = os.environ.get("DEVELOPER_KEY2")
        keys = [DEVELOPER_KEY1, DEVELOPER_KEY2]
        
        response = []
        for data in serializer.data:
            channel_name = data['subscribe_channel']
            print(channel_name)
            for i in range(len(keys)):
                try:
                    # 유튜브 API 클라이언트 생성
                    DEVELOPER_KEY = keys[i] # 본인의 YouTube API 키로 변경
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

                    response.append({
                        'youtube_channel': channel_name,
                        'channel_image_url': channel_image_url
                    })
                    break

                except Exception as e:
                    print(f"Error: {e}")
                    if(i != len(keys)-1):
                        continue
                    response.append({
                        'youtube_channel': channel_name,
                        'channel_image_url': None
                    })
        
        
        return Response({"subscribe_channels":response}, status=status.HTTP_200_OK)
        