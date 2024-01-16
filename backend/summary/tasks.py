from celery import shared_task


from celery import Celery
import subprocess
from pytube import YouTube
import os
import uuid
from .s3 import get_file_url

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