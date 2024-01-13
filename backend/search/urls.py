from django.urls import path
from .views import KeywordSearchView, CategorySearchAPIView, ChannelSearchView

urlpatterns = [
    path('keyword', KeywordSearchView.as_view()),
    path('category', CategorySearchAPIView.as_view()),
    path('channel', ChannelSearchView.as_view()),
]