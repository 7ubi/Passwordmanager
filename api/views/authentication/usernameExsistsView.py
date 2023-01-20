from rest_framework.decorators import api_view

from rest_framework.response import Response
from api.serializer.CreateUserSerializer import *


@api_view(["POST"])
def UsernameExistsView(request):
    username = request.data.get('username')

    exits = User.objects.filter(username=username).exists()

    username_exits = ""
    if exits:
        username_exits = "Username does already exist! Pick another username"

    return Response(data={
        "username_exits": username_exits
    })