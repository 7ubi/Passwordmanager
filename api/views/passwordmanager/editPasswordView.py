from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from api.serializer import *


class EditPasswordView(APIView):
    serializer_class = EditPasswordSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def editPassword(request):
        password_id = request.data.get('id')
        title = request.data.get('title')
        password = request.data.get('managed_password')
        username = request.data.get('username')
        website = request.data.get('website')

        try:
            managed_password = ManagedPassword.objects.get(id=password_id)
        except:
            return None

        managed_password.title = title
        managed_password.managed_password = password
        managed_password.username = username
        managed_password.website = website

        managed_password.save()
        return managed_password

    def post(self, request, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            managed_password = self.editPassword(request)

            if managed_password is None:
                return Response(status=status.HTTP_404_NOT_FOUND)

            return Response(CreatePasswordSerializer(managed_password).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)