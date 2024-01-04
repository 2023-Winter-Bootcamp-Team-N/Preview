from django.urls import path

from .views import SubcribeAPIView, UserAPIView

urlpatterns = [
    path('subscribe', SubcribeAPIView.as_view()),
    path('signin', UserAPIView.as_view()),
]