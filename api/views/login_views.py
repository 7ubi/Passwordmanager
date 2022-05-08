from django.contrib.auth import authenticate, login, logout

from django.shortcuts import render, redirect
from rest_framework.decorators import api_view

from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.response import Response
from api.serializer import *


# Create your views here.
class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    @staticmethod
    def create_user(request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        user: User = User(
            username=username,
            email=email,
        )
        user.set_password(password)

        user.save()

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            self.create_user(request)

            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def UsernameExistsView(request):
    username = request.data.get('username')

    exits = User.objects.filter(username=username).exists()

    username_exits = ""
    if exits:
        username_exits = "Username does already exist! Pick another username"

    return Response(data={
        "username_exits": username_exits
    })


@api_view(["POST"])
def LoginUserView(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        login(request, user)

        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)


def logoutView(request):
    logout(request)
    return redirect('/login')
