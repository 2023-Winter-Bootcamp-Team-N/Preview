from celery import shared_task


from celery import Celery
import subprocess
from pytube import YouTube
import os
import uuid

app = Celery('nTeamProject.tasks', broker= 'amqp://admin:mypass@rabbit:5672')

# YouTube 동영상에서 이미지 추출 작업

@shared_task
def extract_image_from_video(video_url, start_times):

    # 고유한 파일명을 생성하기 위해 uuid 사용
    unique_filename = str(uuid.uuid4())
    video_filename = f'{unique_filename}.mp4'
    
    video_path = os.path.join(os.getcwd(), video_filename)

    try:
        yt = YouTube(video_url)
        video = yt.streams.filter(file_extension='mp4').first()
        video.download(filename=video_filename)

        results = []
        for start_time in start_times:
            image_filename = f'{unique_filename}_{start_time.replace(":", "-")}.jpeg'
            image_path = os.path.join(os.getcwd(), image_filename)

            # ffmpeg를 사용하여 각각의 시작 시간에서 이미지 추출
            command = f'ffmpeg -ss {start_time} -i {video_path} -frames:v 1 {image_path}'
            subprocess.call(command, shell=True)

            results.append(f'Image extracted at {start_time}, saved to {image_path}')

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





