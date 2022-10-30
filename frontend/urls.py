from django.urls import path
from .views import *

urlpatterns = [
    path('', indexLoginRequired),
    path('login/', indexLogin),
    path('signup/', indexLogin),
]