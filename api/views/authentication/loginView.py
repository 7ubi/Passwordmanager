from django.contrib.auth import authenticate, login, logout

from django.shortcuts import redirect
from rest_framework.decorators import api_view

from rest_framework import status
from rest_framework.response import Response


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
    return redirect('/authentication')
