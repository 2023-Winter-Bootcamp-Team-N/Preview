from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from django.utils import timezone
from summary.models import Summary
from subscribe.models import Subscribe

# YouTube API 관련 설정
API_KEY = 'AIzaSyAH9EFr8tBFFIlVTxQ29MbztIF0qutSKNg'  # 본인의 YouTube API 키로 대체
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def update_summary():
    # 매일 00:00에 실행되는 작업
    now = timezone.now()

    # 모든 사용자들의 구독 채널을 불러오기
    subscriptions = Subscribe.objects.distinct('subscribe_channel').select_related('user_id', 'subscribe_channel')

    for subscribe in subscriptions:
        user_id = subscribe.user_id
        subscribe_channel = subscribe.subscribe_channel

        # 구독 채널에 새로운 영상이 올라왔는지 확인
        try:
            youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=API_KEY)
            response = youtube.search().list(
                q=f"{subscribe_channel} 새로운 영상",
                type='video',
                part='id',
                order='date',
            ).execute()

            for item in response.get('items', []):
                video_id = item['id']['videoId']
                # 새로운 영상이 확인 되었다면 영상의 URL을 출력
                video_url = f'https://www.youtube.com/watch?v={video_id}'
                print(f"새로운 영상 발견 사용자 ID: {user_id}, 채널: {subscribe_channel}, URL: {video_url}")

                summary = Summary.objects.create(user_id=user_id, youtube_url=video_url)
                summary.save()

        except HttpError as e:
                print(f'YouTube API 오류: {e}')