from django.urls import path

from .views import SubscribesAPIView
from .views import MembersAPIView

urlpatterns = [
    path('subscribe/', SubscribesAPIView.as_view()),
]

urlpatterns = [
    path('signin/', MembersAPIView.as_view()),
]