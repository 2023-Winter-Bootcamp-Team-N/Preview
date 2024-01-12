from django.urls import path
from .views import (
    SummaryAPIView,
    MainPageCategoryAPIView,
    SummaryDeleteAPIView,
)

urlpatterns = [
    path('', SummaryAPIView.as_view()),
    path('<int:summary_id>', SummaryDeleteAPIView.as_view()),
    path('maincategory', MainPageCategoryAPIView.as_view()),
]
