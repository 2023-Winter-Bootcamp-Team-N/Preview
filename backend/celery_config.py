from __future__ import absolute_import, unicode_literals
import os
import django
from celery import Celery

# 기본 장고파일 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nTeamProject.settings')
django.setup()
app = Celery('nTeamProject')
app.conf.update(
    {
        "broker_url": "amqp://rabbitmq:5672",
        "result_backend": "redis://redis:6379",
        "accept_content": ["json"],
        "task_serializer": "json",
        "result_serializer": "json",
        "task_time_limit": 64,
        "task_max_retries": 0,
        "result_expires": 3600,
        # "worker_pool": "threads",
    }
)
# #등록된 장고 앱 설정에서 task 불러오기
# app.autodiscover_tasks()
__all__ = ["app"]