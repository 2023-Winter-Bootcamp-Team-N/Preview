from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nTeamProject.settings')

app = Celery('nTeamProject')
app.config_from_object('django.conf:settings', namespace='CELERY')
# 등록된 장고 앱 설정에서 task 불러오기
app.autodiscover_tasks()