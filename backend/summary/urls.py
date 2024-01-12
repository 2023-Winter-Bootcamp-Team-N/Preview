from django.urls import path
from .views import SummaryAPIView, KeywordSearchView, CategorySearchAPIView, MainPageCategoryAPIView, CategoryChartAPIView, SubscribeChartAPIView, SummaryDeleteAPIView

urlpatterns = [
    path('', SummaryAPIView.as_view()),
    path('<int:summary_id>', SummaryDeleteAPIView.as_view()),
    path('maincategory', MainPageCategoryAPIView.as_view()),
    path('search/<str:keyword>', KeywordSearchView.as_view()),
    path('search/<str:category>', CategorySearchAPIView.as_view()),
    path('chart/category', CategoryChartAPIView.as_view()),
    path('chart/channel', SubscribeChartAPIView.as_view()),
]
