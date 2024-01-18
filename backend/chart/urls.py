from django.urls import path
from .views import (
    CategoryChartAPIView,
    SubscribeChartAPIView,
)

urlpatterns = [
    path('category', CategoryChartAPIView.as_view()),
    path('channel', SubscribeChartAPIView.as_view()),
]
