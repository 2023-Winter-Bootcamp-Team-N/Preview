from django.urls import path
from .views import (
    SummaryAPIView,
    MainPageCategoryAPIView,
    SummaryDeleteAPIView,
)
from summary import views

urlpatterns = [
    path('', SummaryAPIView.as_view()),
    path('<int:summary_id>', SummaryDeleteAPIView.as_view()),
    path('maincategory', MainPageCategoryAPIView.as_view()),
]


urlpatterns = [
    path('task', views.call_method),
    path('task/<task_id>', views.get_status),
    path('task/result/<task_id>', views.task_result),
]