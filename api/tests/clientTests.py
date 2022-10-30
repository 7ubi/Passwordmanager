from django.test import TestCase
from django.contrib.auth.models import User
from api.models import ManagedPassword
from django.core.cache import cache
from rest_framework.test import APIClient


class SimpleTest(TestCase):
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

    def test_details(self):
        cache.clear()
        # When
        self.client.login(username='max', password='maxmustermann')
        response = self.client.get('/api/passwordUser/')

        # Then
        self.assertEqual(response.status_code, 302)

        # Given
        managedPassword = response.data[0]

        # Then
        self.assertEqual(managedPassword['title'], 'title')
        self.assertEqual(managedPassword['managed_password'], 'password')
        self.assertEqual(managedPassword['username'], 'username')
        self.assertEqual(managedPassword['website'], 'website')
