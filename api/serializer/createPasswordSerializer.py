from rest_framework import serializers
from api.models import *


class CreatePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagedPassword
        fields = ('website', 'title', 'username', 'managed_password')
