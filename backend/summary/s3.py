import os
import boto3
from dotenv import load_dotenv
import uuid
from django.conf import settings

def get_file_url(file):
    load_dotenv()
    # AWS SDK 클라이언트 생성:
    s3_client = boto3.client(
        's3',
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )
    
    file_key = "capture_image/" + str(uuid.uuid4()) + ".jpg"

    # 파일을 S3 버킷에 업로드
    s3_client.put_object(Body=file, Bucket=os.environ.get("AWS_STORAGE_BUCKET_NAME"), Key=file_key)
    # 업로드된 파일의 URL을 구성
    url = settings.FILE_URL + "/" + file_key

    # URL 문자열에서 공백을 "_"로 대체
    url = url.replace(" ", "_")
    
    return url