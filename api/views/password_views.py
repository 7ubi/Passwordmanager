import random

from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from api.serializer import *
import string


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


class GeneratePassword(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, **kwargs):
        possible = string.ascii_lowercase

        isUpper = request.data.get('isUpper')
        isNumber = request.data.get('isNumber')
        isSymbol = request.data.get('isSymbol')

        if isUpper:
            possible += string.ascii_uppercase

        if isNumber:
            possible += string.digits

        if isSymbol:
            possible += '!#$%&()*+,-./:;<=>?@[\]^_`{|}~'

        length = int(request.data.get('length'))

        while True:
            correct = True

            password = ''.join(random.sample(possible, length))

            if isUpper and correct:
                correct = any([char in password for char in string.ascii_uppercase])

            if isNumber and correct:
                correct = any([char in password for char in string.digits])

            if isSymbol and correct:
                correct = any([char in password for char in '!#$%&()*+,-./:;<=>?@[\]^_`{|}~'])

            if correct:
                break

        return Response(password, status=status.HTTP_200_OK)
