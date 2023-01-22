from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from api.models import *


class DeletePasswordView(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, **kwargs):
        passwordId = request.data.get('id')
        password = ManagedPassword.objects.filter(id=passwordId)
        if password.exists():
            password.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
