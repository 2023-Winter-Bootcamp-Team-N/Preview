from django.apps import AppConfig
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from summary.cron import update_summary


class SummaryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'summary'

    def ready(self):
        # 스케줄러 초기화
        sched = BackgroundScheduler()
        # Django 앱이 시작될 때 스케줄러 시작
        sched.start()

        # 스케줄러에 작업 추가
        sched.add_job(
            update_summary,
            trigger=CronTrigger(hour=0, minute=0),
            id='daily_job',
            name='매일 00:00 작업',
            max_instances=1,
            replace_existing=True,
        )