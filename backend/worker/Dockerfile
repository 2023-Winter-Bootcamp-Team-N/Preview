FROM python:3.11-slim

COPY requirements.txt /
RUN pip install -r /requirements.txt

ADD . /worker
WORKDIR /worker

ENTRYPOINT celery -A tasks worker --loglevel=info