from django.urls import path

from .views import SubscribeAPIView, SubscribeCancelAPIView

urlpatterns = [
    path('subscribe', SubscribeAPIView.as_view()),
    path('unscribe', SubscribeCancelAPIView.as_view()),
]
