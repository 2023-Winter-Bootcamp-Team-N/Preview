from __future__ import absolute_import, unicode_literals
import os
import django
from celery import Celery

# 기본 장고파일 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nTeamProject.settings')
django.setup()
app = Celery('nTeamProject.tasks')

# 시간대 설정 (선택 사항)
app.conf.timezone = 'Asia/Seoul'

app.conf.update(
    {
        "broker_url": "amqp://rabbitmq:5672",
        "result_backend": "rpc://",
        "accept_content": ["json"],
        "task_serializer": "json",
        "result_serializer": "json",
        "task_time_limit": 64,
        "task_max_retries": 0,
        "result_expires": 3600,
        # "worker_pool": "threads",
    }
)

# 작업 스케줄 설정
app.conf.beat_schedule = {
    'print-time-every-15-seconds': {
        'task': 'your_module.printTime',  # 여기서 'your_module'은 printTime 함수가 정의된 모듈을 나타냅니다.
        'schedule': 15.0,  # 15초마다 실행하도록 설정
    },
}

app.config_from_object('nTeamProject')

app.autodiscover_tasks()
__all__ = ["app"]