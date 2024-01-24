from django.urls import path
from .views import SubscribeAPIView, SubscribeCancelAPIView, SubscribeListAPIView

urlpatterns = [
    path('', SubscribeAPIView.as_view()),
    path('<str:subscribe_channel_name>', SubscribeCancelAPIView.as_view()),
    path('list/', SubscribeListAPIView.as_view())
]
