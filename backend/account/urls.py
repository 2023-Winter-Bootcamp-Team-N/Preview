from django.urls import path

from .views import SubscribesAPIView

urlpatterns = [
    path('subscribe/', SubscribesAPIView.as_view()),
]