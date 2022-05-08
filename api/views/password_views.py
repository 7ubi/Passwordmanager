import json

from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from api.serializer import *


class PasswordView(generics.ListAPIView):
    queryset = ManagedPassword.objects.all()
    serializer_class = PasswordSerializer


class GetManagedPasswordUser(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        managed_passwords_user = ManagedPassword.objects.filter(creator=request.user)

        return Response(list(managed_passwords_user.values('username', 'title', 'website', 'managed_password'))
                        , status=status.HTTP_302_FOUND)


class CreatePasswordView(APIView):
    serializer_class = CreatePasswordSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def create_managed_password(request):
        title = request.data.get('title')
        password = request.data.get('managed_password')
        username = request.data.get('username')
        website = request.data.get('website')

        managed_password: ManagedPassword = ManagedPassword(
            creator=request.user,
            title=title,
            managed_password=password,
            username=username,
            website=website
        )

        managed_password.save()
        return managed_password

    def post(self, request, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            managed_password = self.create_managed_password(request)

            return Response(CreatePasswordSerializer(managed_password).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)
