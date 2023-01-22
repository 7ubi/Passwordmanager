from api.models import ManagedPassword
from django.core.cache import cache
from .config.passwordmanagerConfig import PasswordmanagerConfig


class ManagedPasswordClientTestCase(PasswordmanagerConfig):
    def test_get_password_user(self):
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
