from django.urls import path
from .views import *

urlpatterns = [
    path('password', PasswordView.as_view()),
]