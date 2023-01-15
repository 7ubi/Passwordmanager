from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from api.serializer import *


class ManagedPasswordUser(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        managed_passwords_user = ManagedPassword.objects.filter(creator=request.user)

        return Response(list(managed_passwords_user.values('id', 'username', 'title', 'website', 'managed_password'))
                        , status=status.HTTP_302_FOUND)
