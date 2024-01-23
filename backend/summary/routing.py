from django.urls import re_path

from .consumer import Consumer

websocket_urlpatterns = [
    re_path(r"ws/preview/$", Consumer.as_asgi()),
]