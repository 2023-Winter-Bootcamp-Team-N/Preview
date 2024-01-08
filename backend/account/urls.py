from django.urls import path

from .views import SubscribeAPIView, SubscribeCancelAPIView, SummarySaveAPIView, MembersAPIView, SearchView, ChartAPIView

urlpatterns = [
    path('subscribe', SubscribeAPIView.as_view()),
    path('unscribe', SubscribeCancelAPIView.as_view()),
    path('summarysave', SummarySaveAPIView.as_view()),
    path('signin', MembersAPIView.as_view()),
    path('chart', ChartAPIView.as_view(), name='chart-api')
    path('search/<str:keyword>/', SearchView.as_view(), name='search'),
]
