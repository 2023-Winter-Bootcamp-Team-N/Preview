from django.urls import path
from .views import MembersAPIView, LoginAPIView


urlpatterns = [
    path('signup', MembersAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
]

