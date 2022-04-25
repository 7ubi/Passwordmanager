from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import generics, status

from .models import *
from .serializer import *


# Create your views here.
class PasswordView(generics.ListAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer
