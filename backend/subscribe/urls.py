from django.urls import path
from .views import SubscribeAPIView

urlpatterns = [
    path('', SubscribeAPIView.as_view()),
]
