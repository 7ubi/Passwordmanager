from django.test import TestCase
from django.contrib.auth.models import User
from api.models import ManagedPassword
from rest_framework.test import APIClient


class PasswordmanagerConfig(TestCase):
    def setUp(self):
        # Given
        self.client = APIClient()

        # Given
        self.user = User.objects.create_user('max', 'max@mustermann.com', 'maxmustermann')

        # Given
        ManagedPassword.objects.create(
            creator=self.user,
            title='title',
            managed_password='password',
            username='username',
            website='website'
        )
