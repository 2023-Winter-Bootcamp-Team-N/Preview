from celery import shared_task
import subprocess
from pytube import YouTube
import os
import uuid
from .s3 import get_file_url

from .serializers import (
    SummarySaveSerializer, 
    CategorySaveSerializer, 
    SummaryByTimeSaveSerializer,
    )
from .models import User
from langchain.document_loaders import YoutubeLoader
# YouTube 동영상에서 이미지 추출 작업

# @shared_task
def extract_image_from_video(video_url, start_times):
    # 고유한 파일명을 생성하기 위해 uuid 사용
    unique_filename = str(uuid.uuid4())
    print(unique_filename)
    video_filename = f'{unique_filename}.mp4'
    print(video_filename)
    
    video_path = os.path.join(os.getcwd(), video_filename)
    print(video_path)

    try:
        yt = YouTube(video_url)
        video = yt.streams.filter(file_extension='mp4').first()
        video.download(filename=video_filename)

        results = []
        for start_time in start_times:
            print(start_time)
            image_filename = f'{unique_filename}_{start_time.replace(":", "-")}.jpg'
            # image_filename = f'{unique_filename}.jpg'
            print(image_filename)
            image_path = os.path.join(os.getcwd(), image_filename)
            print(image_path)

            # ffmpeg를 사용하여 각각의 시작 시간에서 이미지 추출
            command = f'ffmpeg -ss {start_time} -i {video_path} -frames:v 1 {image_path}'
            # command = f'ffmpeg -ss {start_time} -i {video_path} -update 1 -q:v 1 {image_path}'
            print(command)
            subprocess.call(command, shell=True)

            with open(image_path, 'rb') as image_file:
                image_url = get_file_url(image_file)

            print(image_url)
            results.append(image_url)
            if os.path.exists(image_path):
                os.remove(image_path)
            # results.append(f'Image extracted at {start_time}, saved to {image_path}')
        print(results)
        # 동영상 파일 정리
        if os.path.exists(video_path):
            os.remove(video_path)

        return results

    except Exception as e:
        if os.path.exists(video_path):
            os.remove(video_path)
        return str(e)

# 예시 사용 방법
# extract_images_from_video.delay('https://www.youtube.com/watch?v=5sZ5a_mJIMI', ['00:00:00', '00:01:00', '00:02:00'])


# parent_folder_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

#         # 이미지 파일의 경로
# image_file_path = os.path.join(parent_folder_path, 'media', '열정.jpg')

# # 이미지 S3 업로드
# with open(image_file_path, 'rb') as image_file:
#     url = get_file_url(image_file)

# # 이미지 삭제
# os.remove(image_file_path)
        
@shared_task
def save(summary_data, category_list, summary_by_times):
    user_id = summary_data.get('user_id')
    youtube_url = summary_data.get('youtube_url')
    # User 모델에서 user_id가 존재하는지 확인
    if not User.objects.filter(id=user_id).exists():
        return {"error": "유저가 존재하지 않습니다."}
    
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
        return response


    meta_data = result[0].metadata
    summary_data['youtube_title'] = meta_data['title']
    summary_data['youtube_channel'] = meta_data['author']
    summary_data['youtube_thumbnail'] = meta_data['thumbnail_url']
    
    # 요약본 저장
    summary_serializer = SummarySaveSerializer(data=summary_data)
    if summary_serializer.is_valid():
        summary = summary_serializer.save()
    else:
        return {"error": "유효하지 않은 요약본"}
    
    
    # 카테고리 저장
    base_category = ['요리', '게임', '과학', '경제', '여행', '미술', '스포츠', '사회', '건강', '동물', '코미디', '교육', '연예', '음악', '기타']

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
        else:
            return {"error": "유효하지 않은 카테고리"}
        
    # 시간대별 요약
    print(summary_by_times)
    start_times = []
    for data in summary_by_times:
        start_times.append(data['start_time'])
    print(start_times)
    
    image_urls = extract_image_from_video(youtube_url, start_times)
    print(image_urls)
    for i in range(len(summary_by_times)):
        print(i)
        summary_by_times[i]['summary_id'] = summary.id
        summary_by_times[i]['image_url'] = image_urls[i]
        summary_by_time_serializer = SummaryByTimeSaveSerializer(data=summary_by_times[i])
        if summary_by_time_serializer.is_valid():
            summary_by_time_serializer.save()
        else:
            return {"error": "유효하지 않은 시간대별 요약"}
        
    response = {"message": "success!"}
    return response