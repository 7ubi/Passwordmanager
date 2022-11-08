import string

from django.test import TestCase
from django.contrib.auth.models import User
from django.core.cache import cache
from rest_framework.test import APIClient


class PasswordGenerationClientTestCase(TestCase):
    def setUp(self):
        # Given
        self.client = APIClient()

        # Given
        self.user = User.objects.create_user('max', 'max@mustermann.com', 'maxmustermann')

    def test_generate_password(self):
        cache.clear()
        # Given
        self.client.login(username='max', password='maxmustermann')
        length = 12

        # Given
        request = {
            'isUpper': True,
            'isNumber': True,
            'isSymbol': True,
            'length': length
        }

        # When
        response = self.client.post('/api/generatePassword', request)

        # Then
        self.assertEqual(response.status_code, 200)

        # Given
        password = response.content.decode("utf-8")
        password = password[1:len(password) - 1]
        passwordLen = len(password)

        # Then
        self.assertEqual(passwordLen, length)
        self.assertEqual(any([char in password for char in string.ascii_uppercase]), True)
        self.assertEqual(any([char in password for char in string.digits]), True)
        self.assertEqual(any([char in password for char in '!#$%&()*+,-./:;<=>?@[]_{}']), True)
