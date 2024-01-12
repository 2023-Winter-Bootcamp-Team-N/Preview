from django.urls import path
from .views import MembersAPIView

urlpatterns = [
    path('signin', MembersAPIView.as_view()),
]

