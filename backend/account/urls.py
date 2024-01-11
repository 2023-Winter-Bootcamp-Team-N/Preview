from django.urls import path

from .views import SubscribeAPIView, SubscribeCancelAPIView, SummarySaveAPIView, MembersAPIView, MaincategoryAPIView

from .views import (
    SubscribeAPIView, 
    SubscribeCancelAPIView, 
    SummarySaveAPIView, 
    MembersAPIView,
    MaincategoryAPIView,
    CategoryListAPIView,
    ChartAPIView,
    SearchView,
    SummaryDeleteAPIView,
    SubscribeChartAPIView
)

urlpatterns = [
    path('subscribe', SubscribeAPIView.as_view()),
    path('unscribe', SubscribeCancelAPIView.as_view()),
    path('summarysave', SummarySaveAPIView.as_view()),
    path('signin', MembersAPIView.as_view()),
    path('maincategory', MaincategoryAPIView.as_view()),
    path('category/<str:category>/', CategoryListAPIView.as_view(), name='category'),
    path('chart', ChartAPIView.as_view(), name='chart-api'),
    path('search/<str:keyword>', SearchView.as_view(), name='search'),
    path('summaryremoval/<int:summary_id>', SummaryDeleteAPIView.as_view()),
    path('subscribechart', SubscribeChartAPIView.as_view(), name='subscribechart-api'),
]

