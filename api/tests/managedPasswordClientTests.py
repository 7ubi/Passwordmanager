from django.test import TestCase
from django.contrib.auth.models import User
from api.models import ManagedPassword
from django.core.cache import cache
from rest_framework.test import APIClient


class ManagedPasswordClientTestCase(TestCase):
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

    def test_get_password_user(self):
        cache.clear()
        # When
        self.client.login(username='max', password='maxmustermann')
        response = self.client.get('/api/passwordUser')

        # Then
        self.assertEqual(response.status_code, 302)

        # Given
        managedPassword = response.data[0]

        # Then
        self.assertEqual(managedPassword['title'], 'title')
        self.assertEqual(managedPassword['managed_password'], 'password')
        self.assertEqual(managedPassword['username'], 'username')
        self.assertEqual(managedPassword['website'], 'website')

    def test_create_password_user(self):
        cache.clear()
        # Given
        self.client.login(username='max', password='maxmustermann')

        # Given
        newManagedPassword = {
            'title': 'title2',
            'username': 'username2',
            'managed_password': 'password2',
            'website': 'website2'
        }

        # When
        response = self.client.post('/api/createPassword', newManagedPassword)

        # Then
        self.assertEqual(response.status_code, 201)

        # Given
        managedPassword = ManagedPassword.objects.get(title='title2', creator=self.user)

        # Then
        self.assertEqual(managedPassword.title, newManagedPassword['title'])
        self.assertEqual(managedPassword.username, newManagedPassword['username'])
        self.assertEqual(managedPassword.managed_password, newManagedPassword['managed_password'])
        self.assertEqual(managedPassword.website, newManagedPassword['website'])

    def test_delete_password(self):
        cache.clear()

        # Given
        lengthBefore = len(ManagedPassword.objects.filter(creator=self.user))

        # When
        self.client.login(username='max', password='maxmustermann')
        passwordId = {
            'id': ManagedPassword.objects.get(creator=self.user).id
        }
        response = self.client.post('/api/deletePassword', passwordId)

        # Then
        self.assertEqual(response.status_code, 200)

        # Then
        lengthAfter = len(ManagedPassword.objects.filter(creator=self.user))
        self.assertEqual(lengthBefore - 1, lengthAfter)

    def test_not_delete_password(self):
        cache.clear()

        # Given
        lengthBefore = len(ManagedPassword.objects.filter(creator=self.user))

        # When
        self.client.login(username='max', password='maxmustermann')
        passwordId = {
            'id': ManagedPassword.objects.get(creator=self.user).id + 1
        }
        response = self.client.post('/api/deletePassword', passwordId)

        # Then
        self.assertEqual(response.status_code, 404)

        # Then
        lengthAfter = len(ManagedPassword.objects.filter(creator=self.user))
        self.assertEqual(lengthBefore, lengthAfter)

