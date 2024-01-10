from __future__ import absolute_import, unicode_literals
import datetime
from celery import shared_task



# test 용 함수
@shared_task
def printTime():
    print("Testtime: ", datetime.now())