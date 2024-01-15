from celery import shared_task


@shared_task
def calculator(x, y):
    return x + y