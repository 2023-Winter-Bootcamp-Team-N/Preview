from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import SummarySaveSerializer, SummaryByTimeSaveSerializer, CategorySaveSerializer
from django.utils import timezone
from summary.models import Summary, Summary_By_Time, Category
from subscribe.models import Subscribe

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from langchain_community.document_loaders import YoutubeLoader
import dotenv
import openai
import os
from youtube_transcript_api import YouTubeTranscriptApi
import math

dotenv.load_dotenv()

# YouTube API 관련 설정
API_KEY = 'AIzaSyAH9EFr8tBFFIlVTxQ29MbztIF0qutSKNg'  # 본인의 YouTube API 키로 대체
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def update_summary():
    # 매일 00:00에 실행되는 작업
    now = timezone.now()

    # 모든 사용자들의 구독 채널을 불러오기
    subscriptions = Subscribe.objects.values('subscribe_channel').distinct()

    for subscribe in subscriptions:
        subscribe_channel = subscribe['subscribe_channel']

        # 구독 채널에 새로운 영상이 올라왔는지 확인
        try:
            youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=API_KEY)
            # 채널 이름을 사용하여 채널 ID 가져오기
            search_response = youtube.search().list(
                q=subscribe_channel,
                type='channel',
                part='id'
            ).execute()
        except HttpError as e:
            print(f'YouTube API 오류: {e}')
            continue
        
        channel_id = None
        for result in search_response.get('items', []):
            if result.get('id', {}).get('kind') == 'youtube#channel':
                channel_id = result['id']['channelId']
                break


        if channel_id:
            # 채널 ID를 사용하여 최신 비디오 검색
            video_response = youtube.search().list(
                channelId=channel_id,
                type='video',
                part='id',
                order='date',
                maxResults=1
            ).execute()
        else: 
            continue

        for video_result in video_response.get('items', []):
            video_id = video_result['id']['videoId']
            video_url = f'https://www.youtube.com/watch?v={video_id}'

            loader = YoutubeLoader.from_youtube_url(
                    str(video_url),
                    add_video_info=True,
                    language=["ko"],
                    translation="ko")
            result = loader.load()

            meta_data = result[0].metadata
            lang_code = 'ko'  # 한국어로 설정
            video_id = meta_data['source'] #7분

            transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=[lang_code])

            video_length = transcript[-1]['start']

            # 구간 나누기
            if(video_length < 240): # 3분 대 영상까지는 1개
                section_num = 1
                section_range = video_length
            elif(video_length < 540): # 8분대 영상까지는 2개
                section_num = 2
                section_range = int(video_length / section_num)
            elif(video_length < 960): # 15분대 영상까지는 3개
                section_num = 3
                section_range = int(video_length / section_num)
            elif(video_length <= 1200): #20분대 영상까지는 4개
                section_num = 4
                section_range = int(video_length / section_num)
            else: # 그 이상은 5분 단위로 나눈다.
                section_range = 350
                section_num = int(video_length / section_range)

            sections = [[] for _ in range(section_num)]
            section_time = section_range
            index = 0
            summary_by_times = [{} for _ in range(section_num)]
            summary_by_times[index]["start_time"] = "00:00"

            for entry in transcript:
                if(entry['start'] <= section_time):
                    if '[' not in entry['text'] and ']' not in entry['text']:
                        sections[index].append(entry['text'])
                
                if(entry['start'] > section_time):
                    section_time += section_range
                    index += 1

                    if(index >= section_num): break
                    
                    minutes, seconds = divmod(entry['start'], 60)
                    seconds = math.floor(seconds)
                    formatted_time = f"{int(minutes):02d}:{int(seconds):02d}"
                    summary_by_times[index]["start_time"] = formatted_time

                    if '[' not in entry['text'] and ']' not in entry['text']:
                        sections[index].append(entry['text'])

            for i in range(len(sections)):
                sections[i] = "".join(sections[i])

            openai.api_key = os.environ.get("OPENAI_API_KEY")
            client = openai.chat.completions.create

            model_name = 'gpt-3.5-turbo'

            system_prompt = [
                            'I want you to act as a Life Coach that can create good summaries!',
                            'Pick out only the important points and summarize them as briefly and concisely as possible.',
                            'Your answer must be 3 lines or less and must be in Korean.',
                            'I want you to select categories!',
                            'There are a total of 15 categories: 요리, 게임, 과학, 경제, 여행, 미술, 스포츠, 사회, 건강, 동물, 코미디, 교육, 연예, 음악, 기타. Based on the summary, you must select at least 1 and up to 2 categories from the categories presented. do not exlplan. just select.',
                            ]

            # 시간별 요약
            index = 0
            summaries = []
            for section in sections:
                section = str(section)
                if(len(section) < 300): continue
                section_summary_prompt = f'''
                        Summarize the following text in korean.
                        Text: {section}
                        Include an BULLET POINTS if possible
                        Please select only the 3 to 4 most important contents.
                        '''

                response1 = client(model=model_name,
                messages=[
                    {'role': 'system', 'content': system_prompt[0]},
                    {'role': 'assistant', 'content': system_prompt[1]},
                    {'role': 'assistant', 'content': system_prompt[2]},
                    {'role': 'user', 'content': section_summary_prompt}
                ],
                temperature=0)
                
                summary = response1.choices[0].message.content
                summary_by_times[index]["content"] = summary
                index += 1
                summaries.append(summary)
                

            # 전체 간단 요약
            summary_collections = str(summaries)
            all_summary_prompt1 =f'''
                        Please select only the 3 to 5 most important contents.
                        Text: {summary_collections}
                        '''
            response2 = client(model=model_name,
            messages=[
                {'role': 'system', 'content': system_prompt[0]},
                {'role': 'assistant', 'content': system_prompt[1]},
                {'role': 'assistant', 'content': system_prompt[2]},
                {'role': 'user', 'content': all_summary_prompt1}
            ],
            temperature=0)

            simple = response2.choices[0].message.content

            # 카테고리 분류
            category_prompt = f'''
                        Text: {simple}
                        ex)카테고리: 게임, 교육
                        '''

            response3 = client(model=model_name,
            messages=[
                {'role': 'system', 'content': system_prompt[3]},
                {'role': 'assistant', 'content': system_prompt[4]},
                {'role': 'user', 'content': category_prompt}
            ],
            temperature=0)

            category_list = response3.choices[0].message.content

            result = category_list.split(": ")[1].split(",")

            base_category = ['요리', '게임', '과학', '경제', '여행', '미술', '스포츠', '사회', '건강', '동물', '코미디', '교육', '연예', '음악', '기타']

            categories = []
            for cateogry in result:
                category = cateogry.strip()
                if category not in base_category:
                    continue
                categories.append({"category":cateogry.strip()})

            if (len(categories) == 0): categories.append({"category":"기타"})


            summary = {"title" : meta_data['title'],
                        "channel" : meta_data['author'],
                        "url" : video_url,
                        "thumbnail" : meta_data['thumbnail_url'],
                        "content" : simple
                        }

            response_data = {"summary" : summary,
                            "summary_by_times" : summary_by_times,
                            "categories" : categories}

            print(response_data)

            subscribe_users = Subscribe.objects.filter(subscribe_channel=subscribe_channel)
            for user in subscribe_users:
                user_id = user.user_id

                existing_summary = Summary.objects.filter(user_id=user_id, youtube_url=video_url).exists()
                if existing_summary:
                    print(f"이미 존재하는 요약본입니다.")
                    continue

                summary['user_id'] = user_id
                summary_serializer = SummarySaveSerializer(data=response_data['summary'])
                if summary_serializer.is_valid():
                    summary_instance = summary_serializer.save()

                    for summary_by_time in summary_by_times:
                        summary_id = summary_instance.id
                        summary_by_time['summary_id'] = summary_id
                        summary_by_time_serializer = SummaryByTimeSaveSerializer(data=response_data['summary_by_time'])
                        if summary_by_time_serializer.is_valid():
                            summary_by_time_serializer.save()

                    for category in categories:
                        category['summary_id'] = summary_id
                        category_serializer = CategorySaveSerializer(data=category)

                        if category_serializer.is_valid():
                            category_serializer.save()

            return Response({"message": "요약본 저장을 성공했습니다."})

    