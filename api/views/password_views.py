from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from api.serializer import *


class PasswordView(generics.ListAPIView):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer


class CreatePasswordView(APIView):
    serializer_class = CreatePasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            title = request.data.get('title')
            password = request.data.get('password')
            username = request.data.get('username')
            website = request.data.get('website')

            newPassword: Password = Password(
                title=title,
                password=password,
                username=username,
                website=website
            )

            newPassword.save()
            return Response(CreatePasswordSerializer(newPassword).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

