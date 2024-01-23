from django.urls import path
from .views import SubscribeAPIView, SubscribeCancelAPIView

urlpatterns = [
    path('', SubscribeAPIView.as_view()),
    path('<str:subscribe_channel>', SubscribeCancelAPIView.as_view()),
]
