from django.urls import path
from account import views

from .views import (
    SubscribeAPIView, 
    SubscribeCancelAPIView, 
    SummarySaveAPIView, 
    MembersAPIView, 
    SearchView, 
    ChartAPIView,
    CategoryListAPIView
)

urlpatterns = [
    path('subscribe', SubscribeAPIView.as_view()),
    path('unscribe', SubscribeCancelAPIView.as_view()),
    path('summarysave', SummarySaveAPIView.as_view()),
    path('signin', MembersAPIView.as_view()),
    path('category/<str:category>/', CategoryListAPIView.as_view(), name='category'),
    path('chart', ChartAPIView.as_view(), name='chart-api'),
    path('search/<str:keyword>/', SearchView.as_view(), name='search'),
]

