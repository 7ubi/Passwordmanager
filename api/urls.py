from django.urls import path
from .views import *

urlpatterns = [
    path('password', PasswordView.as_view()),
    path('createUser', CreateUserView.as_view())
]