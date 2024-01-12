from django.urls import path
from .views import KeywordSearchView, CategorySearchAPIView, ChannelSearchView

urlpatterns = [
    path('keyword/<str:keyword>', KeywordSearchView.as_view()),
    path('category/<str:category>', CategorySearchAPIView.as_view()),
    path('channel/<str:channel>', ChannelSearchView.as_view()),
]