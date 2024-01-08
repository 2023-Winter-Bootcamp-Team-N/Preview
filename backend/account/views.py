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

        text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(chunk_size=3000, chunk_overlap=700)
        docs = text_splitter.split_documents(result)
        print(docs)

        llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo-1106")
        chain = load_summarize_chain(llm, chain_type="map_reduce", verbose=True)
        content = chain.run(docs)
        print(content)
        # content ="The speaker introduces the package LLM for NLP analysis, which simplifies tasks such as sentiment analysis, summarization, and translation. They discuss the advantages of using PsycheLM for text classification analysis and the potential of GPT models for sentiment analysis and text summarization. The text also highlights the use of GPT prompt templates for NLP analysis and translation tasks, and the practical application of NLP analysis using the scikit-learn library."
        auth_key = os.environ.get('DEEPL_API_KEY')
        translator = deepl.Translator(auth_key)

        translate = translator.translate_text(content, target_lang="KO")
        openai.api_key = os.environ.get("OPENAI_API_KEY")
        model_name = 'gpt-3.5-turbo'
        system_prompt = 'I want you to act as category selector!'
        prompt = f'''
        There are a total of 15 categories: 요리, 게임, 과학, 경제, 여행, 미술, 스포츠, 사회, 건강, 동물, 코미디, 교육, 연예, 음악 등. Based on the text, please select at least 1 and up to 2 categories in korean from the categories presented.
        Text: {translate}

        Please print only in the format below
        카테고리:
        '''
        print(prompt)
        # Start summarizing using OpenAI
        response = openai.ChatCompletion.create(
            model=model_name,
            messages=[
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': prompt}
            ],
            temperature=0
        )
        print("res")
        print(response)
        print()
        result_string = response['choices'][0]['message']['content']
        print(result_string)

        categories_part = result_string.split("카테고리: ")[1]

        # 각각의 카테고리를 분리하여 배열에 저장
        category_list = categories_part.split(", ")
        categories = []
        for category in category_list:
            categories.append({"category": category})
        
    

        summary = {"title" : result[0].metadata['title'],
                   "channel" : result[0].metadata['author'],
                   "url" : url,
                   "thumbnail" : result[0].metadata['thumbnail_url'],
                   "content" : content
                   }
        
        response_data ={"summary" : summary,
                        "categories" : categories}

        return Response(response_data, status=status.HTTP_200_OK)
        # return Response({"message": "ok"})