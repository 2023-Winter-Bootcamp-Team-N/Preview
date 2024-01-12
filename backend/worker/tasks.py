import time
from celery import Celery
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

app = Celery('tasks',
             broker='amqp://admin:mypass@rabbit:5672',
             backend='rpc://')


@app.task
def calculator(x, y):
    logger.info('Got Request - Starting work ')
    result = x + y
    time.sleep(4)
    logger.info('Work Finished ')
    return result