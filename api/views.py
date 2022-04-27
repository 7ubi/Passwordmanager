from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import *
from .serializer import *


# Create your views here.
class PasswordView(generics.ListAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer


class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')

            user: User = User(
                username=username,
                email=email,
                password=password,
            )

            user.save()

            return Response(CreateUserSerializer(user).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)
