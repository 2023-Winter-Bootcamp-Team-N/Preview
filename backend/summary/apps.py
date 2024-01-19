from django.apps import AppConfig

class SummaryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'summary'

    def ready(self):
        from apscheduler.schedulers.background import BackgroundScheduler
        from apscheduler.triggers.interval import IntervalTrigger
        from summary.cron import update_summary
        # 스케줄러 초기화
        sched = BackgroundScheduler()
        # Django 앱이 시작될 때 스케줄러 시작
        sched.start()

        # 스케줄러에 작업 추가
        sched.add_job(
            update_summary,
            trigger=IntervalTrigger(minutes=1),
            id='daily_job',
            name='2분마다 작업',
            max_instances=1,
            replace_existing=True,
)