from rest_framework import serializers
from api.models import *


class EditPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagedPassword
        fields = ('id', 'website', 'title', 'username', 'managed_password')
