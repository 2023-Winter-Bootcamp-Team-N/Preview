import random

from django.http import HttpResponse
from .celery import app as celery_app


def call_method(request):
    r = celery_app.send_task('tasks.calculator', kwargs={'x': random.randrange(0, 10), 'y': random.randrange(0, 10)})
    return HttpResponse(r.id)


def get_status(request, task_id):
    status = celery_app.AsyncResult(task_id, app=celery_app)
    return HttpResponse("Status " + str(status.state))


def task_result(request, task_id):
    result = celery_app.AsyncResult(task_id).result
    return HttpResponse("Result " + str(result))