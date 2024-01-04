FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1

# Python 로그가 버퍼링 없이 출력
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

# RUN apt-get update
## Copy all src files
COPY . .

RUN pip install -r requirements.txt

## Run the application on the port 8080
EXPOSE 8000

# CMD ["bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]