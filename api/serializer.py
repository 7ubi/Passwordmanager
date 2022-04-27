from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Password
        fields = ('')


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password')
