from django.urls import path

from .views import SubscribeAPIView, SubscribeCancelAPIView, MembersAPIView

urlpatterns = [
    path('subscribe', SubscribeAPIView.as_view()),
    path('unscribe', SubscribeCancelAPIView.as_view()),
    path('signin', MembersAPIView.as_view()),
]
