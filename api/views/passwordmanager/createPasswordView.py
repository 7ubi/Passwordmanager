from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions
from api.serializer import CreatePasswordSerializer
from api.models import *


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

            if managed_password is None:
                return Response(status=status.HTTP_404_NOT_FOUND)

            return Response(CreatePasswordSerializer(managed_password).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)