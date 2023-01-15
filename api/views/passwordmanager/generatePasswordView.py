import random

from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
import string


class GeneratePasswordView(APIView):
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
            possible += '!#$%&()*+,-./:;<=>?@[]_{}'

        length = int(request.data.get('length'))

        while True:
            correct = True

            password = ''.join(random.sample(possible, length))

            if isUpper and correct:
                correct = any([char in password for char in string.ascii_uppercase])

            if isNumber and correct:
                correct = any([char in password for char in string.digits])

            if isSymbol and correct:
                correct = any([char in password for char in '!#$%&()*+,-./:;<=>?@[]_{}'])

            if correct:
                break

        return Response(password, status=status.HTTP_200_OK)