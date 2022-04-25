from rest_framework import serializers
from .models import *

class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Password
        fields = ('')