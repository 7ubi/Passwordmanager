from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from api.serializer.createUserSerializer import *


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
