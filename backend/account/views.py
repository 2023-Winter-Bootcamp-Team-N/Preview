from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404

from .models import Subscribe, User, Summary, Summary_By_Time, Category

from .serializers import SubscribeSerializer, SubscribeCancelSerializer, UserSerializer
from .serializers import SummarySaveSerializer, CategorySaveSerializer, SummaryByTimeSaveSerializer
from .swagger_serializer import MessageResponseSerializer, SummaryRequestSerializer

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from langchain.document_loaders import YoutubeLoader
from langchain.chat_models import ChatOpenAI
from langchain.chains.summarize import load_summarize_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
import dotenv
import openai
import deepl
import os
from youtube_transcript_api import YouTubeTranscriptApi
import math

dotenv.load_dotenv()

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
    def post(self, request):
        summary_data = request.data.get('summary')
        user_id = summary_data.get('user_id')
        # User 모델에서 user_id가 존재하는지 확인
        if not User.objects.filter(id=user_id).exists():
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
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

class SummaryAPIView(APIView):
    @swagger_auto_schema(tags=['영상 요약'], request_body=SummaryRequestSerializer, responses={"201":MessageResponseSerializer})
    def post(self, request):
        url = request.data.get('url')

        loader = YoutubeLoader.from_youtube_url(
                str(url),
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
        summary_by_times = [[] for _ in range(section_num)]
        summary_by_times[index].append({"start_time": "00:00"})

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
                summary_by_times[index].append({"start_time":formatted_time})

                if '[' not in entry['text'] and ']' not in entry['text']:
                    sections[index].append(entry['text'])

        for i in range(len(sections)):
            sections[i] = "".join(sections[i])
        
        openai.api_key = os.environ.get("OPENAI_API_KEY")

        model_name = 'gpt-3.5-turbo'

        system_prompt = [
                        'I want you to act as a Life Coach that can create good summaries!',
                        'Pick out only the important points and summarize them as briefly and concisely as possible.',
                        'Your answer must be 3 lines or less and must be in Korean.',
                        'I want you to select categories!',
                        'There are a total of 15 categories: 요리, 게임, 과학, 경제, 여행, 미술, 스포츠, 사회, 건강, 동물, 코미디, 교육, 연예, 음악, 기타. Based on the summary, please select at least 1 and up to 2 categories from the categories presented. do not exlplan. just select.'
                        ]

        # 시간별 요약
        summaries = []
        for section in sections:
            section = str(section)
            if(index >= len(sections)): break
            if(len(section) < 300): continue
            section_summary_prompt = f'''
                    Summarize the following text in korean.
                    Text: {section}
                    Include an BULLET POINTS if possible
                    Please select only the 3 to 4 most important contents.
                    '''

            response1 = openai.ChatCompletion.create(
                model=model_name,
                messages=[
                    {'role': 'system', 'content': system_prompt[0]},
                    {'role': 'assistant', 'content': system_prompt[1]},
                    {'role': 'assistant', 'content': system_prompt[2]},
                    {'role': 'user', 'content': section_summary_prompt}
                ],
                temperature=0,
            )
            print("Summary:")
            summary = response1['choices'][0]['message']['content']
            summary_by_times[index].append({"content": summary})
            index += 1
            summaries.append(summary)
            print(summary)

        # 전체 간단 요약
        summary_collections = str(summaries)
        all_summary_prompt1 =f'''
                    Please select only the 3 to 5 most important contents.
                    Text: {summary_collections}
                    '''
        response2 = openai.ChatCompletion.create(
            model=model_name,
            messages=[
                {'role': 'system', 'content': system_prompt[0]},
                {'role': 'assistant', 'content': system_prompt[1]},
                {'role': 'assistant', 'content': system_prompt[2]},
                {'role': 'user', 'content': all_summary_prompt1}
            ],
            temperature=0,
        )

        print()
        print("간단요약:")
        simple = response2['choices'][0]['message']['content']
        print(simple)


        # 카테고리 분류
        category_prompt = f'''
                    Text: {simple}
                    ex)카테고리: 게임, 교육
                    '''

        response3 = openai.ChatCompletion.create(
            model=model_name,
            messages=[
                {'role': 'system', 'content': system_prompt[3]},
                {'role': 'assistant', 'content': system_prompt[4]},
                {'role': 'user', 'content': category_prompt}
            ],
            temperature=0,
        )

        print("카테고리:")
        category_list = response3['choices'][0]['message']['content']
        print(category_list)

        result = category_list.split(": ")[1].split(",")

        categories = []
        # 결과 출력
        print(result)
        for cateogry in result:
            categories.append({"category":cateogry.strip()})

        print(categories)

        summary = {"title" : result[0].metadata['title'],
                   "channel" : result[0].metadata['author'],
                   "url" : url,
                   "thumbnail" : result[0].metadata['thumbnail_url'],
                   "content" : simple
                   }
        
        response_data ={"summary" : summary,
                        "summary_by_times" : summary_by_times,
                        "categories" : categories}

        return Response(response_data, status=status.HTTP_200_OK)
        # return Response({"message": "ok"})